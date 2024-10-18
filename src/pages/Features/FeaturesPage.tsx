import React from 'react';
import Header from '../../components/Home/Header';
import Footer from '../../components/Home/Footer';

const features = [
  {
    title: 'Salary Gap Reports',
    description: 'Automated, confidential, real-time reporting.',
    icon: 'https://picsum.photos/50', // Replace with a relevant icon
  },
  {
    title: 'Pay Analysis Tools',
    description: 'Comprehensive salary data benchmarking.',
    icon: 'https://picsum.photos/51', // Replace with a relevant icon
  },
  {
    title: 'Real-time Monitoring',
    description: 'Track salary changes and ensure equity.',
    icon: 'https://picsum.photos/52', // Replace with a relevant icon
  },
  {
    title: 'Legal Compliance Tools',
    description: 'Ensuring pay practices meet legal standards.',
    icon: 'https://picsum.photos/53', // Replace with a relevant icon
  },
];

const FeaturesPage: React.FC = () => {
  return (
    <>
      {/* Header Section */}
      <Header/>

      {/* Main Content */}
      <main className="mt-10 py-16 px-6 bg-white text-gray-800">
        <section className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Explore Our Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <img src={feature.icon} alt={`${feature.title} icon`} className="w-16 h-16 mb-4" />
                <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                <p className="text-lg text-gray-600 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Button */}
        <div className="mt-16 text-center">
          <a
            href="#request-demo"
            className="bg-[#019529] text-white px-6 py-3 rounded-md hover:bg-[#017a22] transition duration-300"
          >
            Request a Demo
          </a>
        </div>
      </main>
      <Footer/>
    </>
  );
};

export default FeaturesPage;
