import React from 'react';
import { Camera, Server, Brain, MonitorPlay, FileCheck } from 'lucide-react';

const Methodology: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: 'Data Collection',
      description: 'Drones equipped with high-resolution RGB or Multispectral cameras fly over crop fields to capture detailed imagery.',
      icon: <Camera className="h-8 w-8 text-white" />,
    },
    {
      id: 2,
      title: 'Dataset Upload',
      description: 'The captured images are uploaded to our secure platform. The system validates formats and prepares files for processing.',
      icon: <Server className="h-8 w-8 text-white" />,
    },
    {
      id: 3,
      title: 'AI Processing',
      description: 'Google Gemini 2.5 Flash analyzes each image. It detects patterns associated with diseases, pests, and water stress.',
      icon: <Brain className="h-8 w-8 text-white" />,
    },
    {
      id: 4,
      title: 'Analysis & Scoring',
      description: 'The AI generates a health score (0-100) and categorizes the crop condition (Healthy, Warning, Critical) based on visual evidence.',
      icon: <FileCheck className="h-8 w-8 text-white" />,
    },
    {
      id: 5,
      title: 'Visualization',
      description: 'Results are presented in an interactive dashboard with charts, annotated images, and actionable recommendations.',
      icon: <MonitorPlay className="h-8 w-8 text-white" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">System Methodology</h1>
        <p className="mt-4 text-xl text-gray-500">
          A step-by-step breakdown of how AgroScan AI processes your data.
        </p>
      </div>

      <div className="relative">
        {/* Connector Line (Desktop) */}
        <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-emerald-200" />

        <div className="space-y-12 lg:space-y-24">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              <div className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                
                {/* Icon Circle */}
                <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center w-16 h-16 rounded-full bg-emerald-600 border-4 border-white shadow-lg z-10">
                  {step.icon}
                </div>

                {/* Content Block */}
                <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-16' : 'lg:pl-16'}`}>
                   <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                     <div className="flex items-center mb-4 lg:hidden">
                        <div className="p-2 bg-emerald-600 rounded-full mr-4">
                          {React.cloneElement(step.icon as React.ReactElement, { className: 'h-6 w-6 text-white' })}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Step {step.id}</h3>
                     </div>
                     <h3 className="hidden lg:block text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                     <h3 className="lg:hidden text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                     <p className="text-gray-600 leading-relaxed">
                       {step.description}
                     </p>
                   </div>
                </div>

                <div className="hidden lg:block w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Methodology;
