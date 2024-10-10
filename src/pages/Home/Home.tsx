const HomePage = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="max-w-max space-y-4">
        <h1 className="text-6xl">Welcome to Salary-Safe</h1>
        <p className="text-xl">
          Your trusted platform for transparent and fair salary management
        </p>
        <div className="flex justify-around items-center">
          <a href="/signup-company" className="text-white">
            <button className="btn-primary">Register Your Company</button>
          </a>
          <a href="/signup-employee" className="text-white">
            <button className="btn-primary">Register as employee</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
