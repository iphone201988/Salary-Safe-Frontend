import React from 'react';

const features = [
  { title: 'Confidential Submissions', description: 'Securely submit your data.' },
  { title: 'Data-Driven Recommendations', description: 'Receive personalized insights.' },
  { title: 'Reducing Wage Gaps', description: 'Take actions to close the wage gap.' }
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-6">How Salary-Safe Works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-6">
        {features.map((feature, index) => (
          <div key={index} className="p-6 bg-white rounded-lg shadow-lg hover:border-[#019529] hover:border-2 transition">
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
