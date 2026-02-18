import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, UploadCloud, Cpu, PieChart } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-emerald-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-20"
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
            alt="Drone over field"
          />
          <div className="absolute inset-0 bg-emerald-900 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            AI-Powered Crop Intelligence
          </h1>
          <p className="mt-6 text-xl text-emerald-100 max-w-3xl">
            Revolutionize your agriculture management with autonomous drone imagery analysis. 
            Detect diseases, monitor health, and optimize yields using advanced Generative AI.
          </p>
          <div className="mt-10 max-w-sm sm:flex sm:max-w-none">
            <div className="space-y-4 sm:space-y-0 sm:inline-grid sm:grid-cols-2 sm:gap-5">
              <Link
                to="/upload"
                className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-emerald-900 bg-white hover:bg-emerald-50 sm:px-8"
              >
                Get Started
                <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
              </Link>
              <Link
                to="/methodology"
                className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-800 bg-opacity-60 hover:bg-opacity-70 sm:px-8"
              >
                How it Works
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-emerald-600 tracking-wide uppercase">Capabilities</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              From Image to Insight
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="pt-6">
                <div className="flow-root bg-slate-50 rounded-lg px-6 pb-8 h-full border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-emerald-500 rounded-md shadow-lg">
                        <UploadCloud className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Dataset Management</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Seamlessly upload and organize your drone imagery datasets. Supports high-resolution visuals.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-slate-50 rounded-lg px-6 pb-8 h-full border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-emerald-500 rounded-md shadow-lg">
                        <Cpu className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">AI Analysis</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Powered by Gemini Flash, our system identifies stress factors, pests, and diseases with high accuracy.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-slate-50 rounded-lg px-6 pb-8 h-full border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-emerald-500 rounded-md shadow-lg">
                        <PieChart className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Visual Results</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Get actionable insights through interactive dashboards, health scores, and aggregated reports.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
