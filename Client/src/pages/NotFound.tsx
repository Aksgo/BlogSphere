import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white px-6 text-center">
      <h1 className="text-6xl font-bold text-amber-600 mb-4">404</h1>
      <h2 className="text-3xl md:text-4xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-lg text-gray-300 mb-6">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-amber-700 hover:bg-amber-800 text-white font-semibold px-6 py-2 rounded-lg transition"
      >
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;
