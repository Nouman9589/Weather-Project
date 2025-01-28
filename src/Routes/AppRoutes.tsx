
import { Routes, Route } from "react-router-dom";
import Getstarted from "../Pages/Getstarted";
import WeatherPage from "../Pages/WeatherPage";
import CitiesPage from "../Pages/CitiesPage";
import MapsPage from "../Pages/MapsPage";
import SettingsPage from "../Pages/SettingsPage";
import Navbar from "../Components/Navbar";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Getstarted />} />
      <Route path="/weather" element={<><Navbar/><WeatherPage /></>} />
      <Route path="/cities" element={<><Navbar /><CitiesPage /></>} />
      <Route path="/maps" element={<><Navbar /><MapsPage /></>} />
      <Route path="/settings" element={<><Navbar /><SettingsPage /></>} />
    </Routes>
  );
};

export default AppRoutes;
