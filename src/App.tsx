import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes";
// import Navbar from "./Components/Navbar";
import WeatherProvider from "./Context/WeatherContext";
import { AuthProvider } from "./Context/AuthContext";
import "./App.css";

const App = () => {
  return (
    <AuthProvider> {/* Wrap your app with AuthProvider */}
      <WeatherProvider>
        <Router>
          <div className="flex bg-gray-800 text-white w-full m-0 h-full min-h-screen">
            {/* <Navbar /> */}
            <div className="ml-28 w-full">
              <AppRoutes />
            </div>
          </div>
        </Router>
      </WeatherProvider>
    </AuthProvider>
  );
};

export default App;
