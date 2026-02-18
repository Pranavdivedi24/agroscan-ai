import React, { useContext } from 'react';
import { AppContext } from '../App';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FileText, AlertTriangle } from 'lucide-react';

const Results: React.FC = () => {
  const { dataset } = useContext(AppContext)!;

  const analyzedImages = dataset.filter(img => img.status === 'completed' && img.analysis);

  // Stats Calculation
  const totalAnalyzed = analyzedImages.length;
  const averageHealth = totalAnalyzed > 0 
    ? Math.round(analyzedImages.reduce((acc, curr) => acc + (curr.analysis?.healthScore || 0), 0) / totalAnalyzed) 
    : 0;

  // Data for Pie Chart (Conditions)
  const conditionCounts = analyzedImages.reduce((acc, curr) => {
    const condition = curr.analysis?.condition || 'Unknown';
    acc[condition] = (acc[condition] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.keys(conditionCounts).map(key => ({
    name: key,
    value: conditionCounts[key],
  }));

  const COLORS = {
    'Healthy': '#10B981', // emerald-500
    'Warning': '#F59E0B', // amber-500
    'Critical': '#EF4444', // red-500
    'Unknown': '#9CA3AF'
  };

  // Data for Bar Chart (Common Issues)
  const issueCounts = analyzedImages.reduce((acc, curr) => {
    curr.analysis?.issues.forEach(issue => {
      acc[issue] = (acc[issue] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const barData = Object.keys(issueCounts)
    .map(key => ({ name: key, count: issueCounts[key] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5); // Top 5 issues

  if (totalAnalyzed === 0) {
     return (
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
            <div className="bg-white p-12 rounded-lg shadow-sm border border-gray-200">
                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900">No Results Available</h2>
                <p className="mt-2 text-gray-500">Analyze images in the Dashboard to generate aggregated insights.</p>
            </div>
        </div>
     );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Results & Insights</h1>
        <p className="mt-2 text-gray-600">Aggregated health metrics for your current dataset.</p>
      </div>

      {/* High Level Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Total Analyzed Images</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{totalAnalyzed}</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Average Health Score</dt>
            <dd className={`mt-1 text-3xl font-semibold ${
                averageHealth > 80 ? 'text-green-600' : averageHealth > 50 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {averageHealth}<span className="text-lg text-gray-400">/100</span>
            </dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Critical Alerts</dt>
            <dd className="mt-1 text-3xl font-semibold text-red-600">
              {conditionCounts['Critical'] || 0}
            </dd>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Crop Condition Distribution</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS] || COLORS['Unknown']} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Top Detected Issues</h3>
          <div className="h-80 w-full">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" allowDecimals={false} />
                  <YAxis type="category" dataKey="name" width={100} style={{ fontSize: '12px' }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#059669" radius={[0, 4, 4, 0]} barSize={30} />
                </BarChart>
             </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Critical Items List */}
      {(conditionCounts['Critical'] || 0) > 0 && (
        <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
           <div className="flex items-center mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
              <h3 className="text-lg font-medium text-red-800">Requires Immediate Attention</h3>
           </div>
           <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {analyzedImages.filter(img => img.analysis?.condition === 'Critical').map(img => (
                  <div key={img.id} className="bg-white p-4 rounded shadow-sm border border-red-100 flex items-center space-x-4">
                      <img src={img.url} alt={img.name} className="h-16 w-16 object-cover rounded" />
                      <div>
                          <p className="font-semibold text-gray-900 truncate w-32">{img.name}</p>
                          <p className="text-sm text-red-600">Health: {img.analysis?.healthScore}</p>
                      </div>
                  </div>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};

export default Results;
