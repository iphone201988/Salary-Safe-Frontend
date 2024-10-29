import React, { useState } from 'react';
import Header from '../../../components/Home/Header';
import Footer from '../../../components/Home/Footer';
import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Salary Matching',
    description: 'Candidates confidentially submit their salary expectations, while employers provide their salary ranges. The platform matches these inputs based on mutual alignment, promoting a fair and transparent salary negotiation process.',
    icon: 'https://picsum.photos/50', // Replace with a relevant icon
  },
  {
    title: 'Data-Driven Salary Analysis',
    description: 'Analyzes the company&#39;s internal salary data including calculating median and average salaries and comparing them against market benchmarks. We then generate a fair salary recommendation for both parties based on data and analytics.',
    icon: 'https://picsum.photos/51', // Replace with a relevant icon
  },
  {
    title: 'Advanced Technology',
    description: 'Using cloud technologies, our platform securely stores and processes large-scale data to ensure that salary information is handled securely. We integrate blockchain technology to provide transparent and immutable records of salary benchmarks and recommendations, ensuring that any data is secure, auditable, and tamper-proof.',
    icon: 'https://picsum.photos/52', // Replace with a relevant icon
  },
  {
    title: 'Compliance and Reporting',
    description: 'Automated compliance checks and detailed reporting tracking salary trends, diversity pay gaps, and other key metrics, aligning with industry regulations such as equal pay, anti-discrimination laws, and transparency standards.',
    icon: 'https://picsum.photos/53', // Replace with a relevant icon
  },
];

const FeaturesPage: React.FC = () => {
  // Track loading states for each feature icon
  const [loaded, setLoaded] = useState(new Array(features.length).fill(false));

  const handleImageLoad = (index: number) => {
    setLoaded(prevState => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
  };

  return (
    <>
      {/* Header Section */}
      <Header />

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
                <div className="relative w-16 h-16 mb-4">
                  {!loaded[index] && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="loader"></div>
                    </div>
                  )}
                  <img
                    src={feature.icon}
                    alt={`${feature.title} icon`}
                    className={`w-full h-full rounded transition-opacity duration-300 ${loaded[index] ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => handleImageLoad(index)}
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                <p className="text-lg text-gray-600 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Button */}
        <div className="mt-16 text-center">
          <Link
            to="/request-demo"
            className="bg-[#019529] text-white px-6 py-3 rounded-md hover:bg-[#017a22] transition duration-300"
          >
            Request a Demo
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FeaturesPage;
