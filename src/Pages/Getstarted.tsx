import umbrella from "../assets/umbrella.jpg";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";


const Getstarted = () => {
  const { user, signInWithGoogle } = useAuth(); 
  const { logOut } = useAuth(); // Access the logOut function
console.log(user);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-700 to-blue-900 text-white flex items-center justify-center">
      {/* Full-Width and Full-Height Inner Container */}
      <div className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-8 p-8 bg-gray-900 shadow-2xl">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            className="w-80 md:w-96 rounded-2xl border-4 border-blue-500"
            src={umbrella}
            alt="Umbrella"
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-5xl font-extrabold text-blue-300">Breez</h1>
          <p className="text-lg text-gray-300">
            Your personal weather companion
          </p>

          {/* Show Get Started button if the user is authenticated, otherwise show Google Sign-In button */}
          {user ? (
            <Link
              to="/weather"
              className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:-translate-y-1"
            >
              Get Started
            </Link>
          ) : (
            <button
              onClick={signInWithGoogle}
              className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:-translate-y-1"
            >
              Sign in with Google
            </button>
            
          )}
          {/* lougout button */}
          <br />
          {user && (
            <button
              onClick={logOut}
              className="inline-block bg-red-600 hover:bg-red-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:-translate-y-1"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Getstarted;
