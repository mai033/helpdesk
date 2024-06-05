import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-6 sm:py-12">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-10">Help Desk</h1>
      <div className="space-x-6">
        <Link to="/submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300">
          Submit Ticket
        </Link>
        <Link to="/admin" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300">
          Admin Panel
        </Link>
      </div>
    </div>
  );
};

export default App;
