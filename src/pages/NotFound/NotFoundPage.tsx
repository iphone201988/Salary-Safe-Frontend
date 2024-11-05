import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen ">
      <h1 className="text-6xl font-bold  mb-4">404</h1>
      <h2 className="text-2xl text-gray-600 mb-4">Page Not Found</h2>
      <p className="text-lg text-gray-500 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="text-blue-500 hover:underline text-xl">
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
