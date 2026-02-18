import React, { useState, useContext } from 'react';
import { Upload as UploadIcon, X, FileImage, CheckCircle, AlertCircle } from 'lucide-react';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';

const Upload: React.FC = () => {
  const { addImages } = useContext(AppContext)!;
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files) as File[];
      // Filter for images
      const imageFiles = filesArray.filter(file => file.type.startsWith('image/'));
      setSelectedFiles(prev => [...prev, ...imageFiles]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    
    setIsUploading(true);
    
    // Simulate upload delay for better UX
    setTimeout(async () => {
      await addImages(selectedFiles);
      setIsUploading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Upload Dataset</h1>
        <p className="mt-2 text-gray-600">
          Upload your drone images for AI analysis. Supported formats: JPG, PNG.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-center w-full">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-emerald-300 border-dashed rounded-lg cursor-pointer bg-emerald-50 hover:bg-emerald-100 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadIcon className="w-12 h-12 mb-4 text-emerald-500" />
              <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 10MB)</p>
            </div>
            <input 
              id="dropzone-file" 
              type="file" 
              className="hidden" 
              multiple 
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {selectedFiles.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Selected Files ({selectedFiles.length})</h3>
            <ul className="divide-y divide-gray-200 border border-gray-200 rounded-md max-h-60 overflow-y-auto">
              {selectedFiles.map((file, index) => (
                <li key={index} className="flex items-center justify-between py-3 pl-3 pr-4 text-sm bg-white">
                  <div className="flex items-center flex-1 w-0">
                    <FileImage className="flex-shrink-0 h-5 w-5 text-gray-400" />
                    <span className="ml-2 flex-1 w-0 truncate text-gray-600">{file.name}</span>
                    <span className="text-gray-400 text-xs ml-2">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <button
                      onClick={() => removeFile(index)}
                      className="font-medium text-red-600 hover:text-red-500 focus:outline-none"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleUpload}
                disabled={isUploading}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none"
              >
                {isUploading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Upload & Add to Dashboard
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {selectedFiles.length === 0 && (
          <div className="mt-4 p-4 bg-blue-50 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 mr-3" />
            <p className="text-sm text-blue-700">
              No files selected. Please choose images from your computer to begin the analysis.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;