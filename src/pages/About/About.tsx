import { Link } from "react-router-dom";
import Footer from "../../components/Home/Footer";
import Header from "../../components/Home/Header";
import { useState } from "react";
// import NavBar from "../../components/Navbar/Navbar";

const AboutPage = () => {
  const [teamImageLoaded, setTeamImageLoaded] = useState(false);
  const [chartImageLoaded, setChartImageLoaded] = useState(false);
  return (
    // <div className="flex flex-col min-h-screen overflow-hidden">
    //   <NavBar />
    //   <div className="flex-grow flex flex-col justify-center items-center space-y-4 ">
    //     <h2 className="text-8xl font-bold">About Us</h2>
    //     <p className="text-xl w-[40rem] text-center">
    //       Salary-Safe was built to solve the biggest challenges in salary
    //       negotiations. We believe that transparent compensation practices build
    //       stronger relationships between employees and employers.
    //     </p>
    //   </div>
    // </div>
    // <>
    //   {/* Header Section */}
    //   <Header />

    //   {/* Main Content */}
    //   <main className="mt-10">
    //     <section className="min-h-screen bg-white text-gray-800 py-20 px-6 text-center">
    //       {/* Headline */}
    //       <h1 className="text-4xl font-bold mb-8">
    //         Our Mission: Promoting Fairness and Transparency in Compensation
    //       </h1>

    //       {/* Mission and Vision Text */}
    //       <p className="text-lg mb-8 max-w-4xl mx-auto">
    //         Salary-Safe is committed to ensuring that companies promote fairness
    //         and transparency in compensation. Our platform helps organizations
    //         address the critical issue of gender pay gaps, providing data-driven
    //         insights and real-time tools to track and close salary disparities.
    //         We believe that equitable pay is key to building a better, more
    //         inclusive workforce.
    //       </p>

    //       {/* Optional Visuals */}
    //       <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-8 my-10">
    //         {/* Example of team photo or visual */}
    //         <img
    //           src="https://picsum.photos/200"
    //           alt="Team"
    //           className="w-full sm:w-1/3 rounded-lg shadow-lg"
    //         />
    //         {/* Example of data visualization */}
    //         <img
    //           src="https://picsum.photos/201"
    //           alt="Salary Gap Chart"
    //           className="w-full sm:w-1/3 rounded-lg shadow-lg"
    //         />
    //       </div>

    //       {/* CTA Buttons */}
    //       <div className="mt-10">
    //         <Link
    //           to="/request-demo"
    //           className="bg-[#019529] text-white px-6 py-3 rounded-md mr-4 hover:bg-[#017a22]"
    //         >
    //           Request a Demo
    //         </Link>
    //         {/* <a href="#contact" className="border border-[#019529] text-[#019529] px-6 py-3 rounded-md hover:bg-[#019529] hover:text-white">
    //         Contact Us
    //       </a> */}
    //       </div>
    //     </section>
    //   </main>

    //   {/* Footer Section */}
    //   <Footer />
    // </>
    <>
      {/* Header Section */}
      <Header />

      {/* Main Content */}
      <main className="mt-10">
        <section className="min-h-screen bg-white text-gray-800 py-20 px-6 text-center">
          {/* Headline */}
          <h1 className="text-4xl font-bold mb-8">
            Our Mission: Promoting Fairness and Transparency in Compensation
          </h1>

          {/* Mission and Vision Text */}
          <p className="text-lg mb-8 max-w-4xl mx-auto">
            Salary-Safe is committed to ensuring that companies promote fairness
            and transparency in compensation. Our platform helps organizations
            address the critical issue of gender pay gaps, providing data-driven
            insights and real-time tools to track and close salary disparities.
            We believe that equitable pay is key to building a better, more
            inclusive workforce.
          </p>

          {/* Optional Visuals */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-8 my-10">
            {/* Team Photo or Visual */}
            <div className="relative w-full sm:w-1/3">
              {!teamImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="loader"></div>
                </div>
              )}
              <img
                src="https://picsum.photos/200"
                alt="Team"
                className={`w-full rounded-lg shadow-lg transition-opacity duration-500 ${teamImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setTeamImageLoaded(true)}
              />
            </div>

            {/* Data Visualization */}
            <div className="relative w-full sm:w-1/3">
              {!chartImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="loader"></div>
                </div>
              )}
              <img
                src="https://picsum.photos/201"
                alt="Salary Gap Chart"
                className={`w-full rounded-lg shadow-lg transition-opacity duration-500 ${chartImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setChartImageLoaded(true)}
              />
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10">
            <Link
              to="/request-demo"
              className="bg-[#019529] text-white px-6 py-3 rounded-md mr-4 hover:bg-[#017a22]"
            >
              Request a Demo
            </Link>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <Footer />
    </>
  );
};

export default AboutPage;
