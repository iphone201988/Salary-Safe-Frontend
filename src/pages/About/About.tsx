import NavBar from "../../components/Navbar/Navbar";

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <NavBar />
      <div className="flex-grow flex flex-col justify-center items-center space-y-4 ">
        <h2 className="text-8xl font-bold">About Us</h2>
        <p className="text-xl w-[40rem] text-center">
          Salary-Safe was built to solve the biggest challenges in salary
          negotiations. We believe that transparent compensation practices build
          stronger relationships between employees and employers.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
