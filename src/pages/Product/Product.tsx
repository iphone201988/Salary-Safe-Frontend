import NavBar from "../../components/Navbar/Navbar";

const ProductPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow flex flex-col justify-center items-center space-y-4 overflow-hidden"> {/* Prevents scrolling */}
        <h2 className="text-8xl font-bold">Our Product</h2>
        <p className="text-xl w-[40rem] text-center">
          Salary-Safe is a data-driven platform that streamlines salary
          negotiations by aligning employer and candidate expectations. With our
          tool, companies provide salary ranges, candidates submit confidential
          salary preferences, and we match them.
        </p>
      </div>
    </div>
  );
};

export default ProductPage;
