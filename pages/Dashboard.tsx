import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { Play, Trash2, Eye, CheckCircle, AlertTriangle, XCircle, Loader2 } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { dataset, analyzeImage, deleteImage } = useContext(AppContext)!;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Filter dataset to show selected image details if modal is open
  const activeDetail = selectedImage ? dataset.find(d => d.id === selectedImage) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center mb-8">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-bold text-gray-900">Analysis Dashboard</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your dataset and run AI analysis on individual drone images.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <div className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-emerald-100 bg-emerald-800 cursor-default">
            Total Images: {dataset.length}
          </div>
        </div>
      </div>

      {dataset.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-lg border border-dashed border-gray-300">
          <h3 className="mt-2 text-sm font-medium text-gray-900">No images</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by uploading a new dataset.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dataset.map((image) => (
            <div key={image.id} className="bg-white overflow-hidden shadow rounded-lg border border-gray-100 flex flex-col">
              <div className="relative h-48 w-full bg-gray-200">
                <img src={image.url} alt={image.name} className="h-full w-full object-cover" />
                <div className="absolute top-2 right-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    image.status === 'completed' ? 'bg-green-100 text-green-800' :
                    image.status === 'analyzing' ? 'bg-blue-100 text-blue-800' :
                    image.status === 'error' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {image.status.charAt(0).toUpperCase() + image.status.slice(1)}
                  </span>
                </div>
              </div>
              <div className="px-4 py-4 flex-1">
                <h3 className="text-lg font-medium text-gray-900 truncate" title={image.name}>{image.name}</h3>
                <p className="text-xs text-gray-500 mt-1">Uploaded: {new Date(image.uploadDate).toLocaleDateString()}</p>
                
                {image.status === 'completed' && image.analysis && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Health Score:</span>
                      <span className={`font-bold ${
                        image.analysis.healthScore > 80 ? 'text-green-600' :
                        image.analysis.healthScore > 50 ? 'text-yellow-600' : 'text-red-600'
                      }`}>{image.analysis.healthScore}/100</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Condition:</span>
                      <span className={`font-medium ${
                        image.analysis.condition === 'Healthy' ? 'text-green-600' :
                        image.analysis.condition === 'Warning' ? 'text-yellow-600' : 'text-red-600'
                      }`}>{image.analysis.condition}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6 flex justify-between items-center border-t border-gray-100">
                {image.status === 'pending' || image.status === 'error' ? (
                  <button
                    onClick={() => analyzeImage(image.id)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none"
                  >
                    <Play className="h-3 w-3 mr-1" /> Analyze
                  </button>
                ) : image.status === 'analyzing' ? (
                  <button disabled className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-emerald-400 cursor-not-allowed">
                    <Loader2 className="h-3 w-3 mr-1 animate-spin" /> Analyzing...
                  </button>
                ) : (
                  <button
                    onClick={() => setSelectedImage(image.id)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-emerald-700 bg-emerald-100 hover:bg-emerald-200 focus:outline-none"
                  >
                    <Eye className="h-3 w-3 mr-1" /> View Report
                  </button>
                )}
                
                <button
                  onClick={() => deleteImage(image.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {activeDetail && activeDetail.analysis && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setSelectedImage(null)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-2xl leading-6 font-bold text-gray-900" id="modal-title">Analysis Report</h3>
                      <button onClick={() => setSelectedImage(null)} className="text-gray-400 hover:text-gray-500">
                        <XCircle className="h-6 w-6" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                         <img src={activeDetail.url} alt="Analyzed Crop" className="w-full h-64 object-cover rounded-lg shadow-sm" />
                         <div className="mt-4 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                           <span className="text-sm font-medium text-gray-500">Overall Health Score</span>
                           <span className={`text-2xl font-bold ${
                              activeDetail.analysis.healthScore > 80 ? 'text-green-600' :
                              activeDetail.analysis.healthScore > 50 ? 'text-yellow-600' : 'text-red-600'
                           }`}>{activeDetail.analysis.healthScore}/100</span>
                         </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Condition</h4>
                          <div className={`mt-1 inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                            activeDetail.analysis.condition === 'Healthy' ? 'bg-green-100 text-green-800' :
                            activeDetail.analysis.condition === 'Warning' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {activeDetail.analysis.condition === 'Healthy' && <CheckCircle className="w-4 h-4 mr-1" />}
                            {activeDetail.analysis.condition === 'Warning' && <AlertTriangle className="w-4 h-4 mr-1" />}
                            {activeDetail.analysis.condition === 'Critical' && <AlertTriangle className="w-4 h-4 mr-1" />}
                            {activeDetail.analysis.condition}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Identified Issues</h4>
                          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                            {activeDetail.analysis.issues.map((issue, i) => (
                              <li key={i}>{issue}</li>
                            ))}
                            {activeDetail.analysis.issues.length === 0 && <li>None detected.</li>}
                          </ul>
                        </div>

                         <div>
                          <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Recommendations</h4>
                          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                            {activeDetail.analysis.recommendations.map((rec, i) => (
                              <li key={i}>{rec}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                      <h4 className="text-sm font-bold text-emerald-800 mb-1">AI Summary</h4>
                      <p className="text-sm text-emerald-700">{activeDetail.analysis.summary}</p>
                    </div>

                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" onClick={() => setSelectedImage(null)} className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
