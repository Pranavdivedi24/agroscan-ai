import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">About The Project</h1>
        <p className="mt-4 text-xl text-gray-500">
          Transforming precision agriculture with AI-driven drone monitoring.
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-emerald-800 mb-4">Problem Statement</h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <p className="text-gray-600 text-lg leading-relaxed">
                Traditional crop monitoring methods are labor-intensive, time-consuming, and often reactive rather than proactive. 
                Farmers struggle to identify diseases or nutrient deficiencies until visible damage has occurred across large fields, 
                leading to reduced yields and excessive use of chemicals.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-emerald-800 mb-4">Our Objective</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-100">
              <h3 className="text-lg font-semibold text-emerald-900 mb-2">Early Detection</h3>
              <p className="text-emerald-800">
                Identify stress indicators and diseases at early stages using high-resolution drone imagery.
              </p>
            </div>
            <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-100">
              <h3 className="text-lg font-semibold text-emerald-900 mb-2">Resource Optimization</h3>
              <p className="text-emerald-800">
                Enable precise application of water, fertilizers, and pesticides, reducing cost and environmental impact.
              </p>
            </div>
            <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-100">
              <h3 className="text-lg font-semibold text-emerald-900 mb-2">Scalability</h3>
              <p className="text-emerald-800">
                Process large datasets from vast agricultural lands efficiently using cloud-based AI.
              </p>
            </div>
            <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-100">
              <h3 className="text-lg font-semibold text-emerald-900 mb-2">Actionable Insights</h3>
              <p className="text-emerald-800">
                Provide clear, data-driven recommendations that farmers can implement immediately.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-emerald-800 mb-4">Significance</h2>
          <div className="bg-white shadow sm:rounded-lg border border-gray-200 px-4 py-5 sm:p-6">
             <p className="text-gray-600 text-lg leading-relaxed">
               By integrating Unmanned Aerial Vehicles (UAVs) with Generative AI, this system bridges the gap between data collection and decision-making. 
               It democratizes access to advanced agronomy tools, empowering farmers to increase food security and sustainability in an ever-changing climate.
             </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
