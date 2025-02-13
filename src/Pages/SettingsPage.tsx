import { useState } from "react";

const SettingsPage = () => {
  const [temperatureUnit, setTemperatureUnit] = useState("Celsius");
  const [windSpeedUnit, setWindSpeedUnit] = useState("km/h");
  const [pressureUnit, setPressureUnit] = useState("hPa");
  const [precipitationUnit, setPrecipitationUnit] = useState("Millimeters");
  const [distanceUnit, setDistanceUnit] = useState("Kilometers");

  return (
    <div className="flex flex-col lg:flex-row bg-gradient-to-b from-gray-800 to-gray-900 text-white p-6 min-h-screen">
      {/* Left Section: Units */}
      <div className="lg:w-2/3 w-full p-4 space-y-6">
        <h1 className="text-4xl font-extrabold mb-6 text-center lg:text-left bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Settings
        </h1>
        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-700/50 transition-all duration-300">
          <h2 className="text-2xl font-bold mb-6 border-b border-gray-700/50 pb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Units
          </h2>
          <div className="space-y-8">
            {/* Unit Toggle Sections */}
            {[
              { label: "Temperature", unit: temperatureUnit, options: ["Celsius", "Fahrenheit"], setUnit: setTemperatureUnit },
              { label: "Wind Speed", unit: windSpeedUnit, options: ["km/h", "m/s", "Knots"], setUnit: setWindSpeedUnit },
              { label: "Pressure", unit: pressureUnit, options: ["hPa", "Inches", "mm"], setUnit: setPressureUnit },
              { label: "Precipitation", unit: precipitationUnit, options: ["Millimeters", "Inches"], setUnit: setPrecipitationUnit },
              { label: "Distance", unit: distanceUnit, options: ["Kilometers", "Miles"], setUnit: setDistanceUnit },
            ].map(({ label, unit, options, setUnit }, index) => (
              <div key={index} className="flex flex-col items-center lg:items-start space-y-3">
                <label className="text-xl font-semibold text-gray-300">{label}</label>
                <div className="relative w-full">
                  <div className="w-full h-12 bg-gray-700/30 rounded-xl p-1">
                    <div className="relative h-full flex">
                      {options.map((option) => (
                        <button
                          key={option}
                          onClick={() => setUnit(option)}
                          className="relative flex-1 flex items-center justify-center text-sm font-medium z-10"
                        >
                          <span className={`transition-colors duration-200 ${
                            unit === option ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                          }`}>
                            {option}
                          </span>
                        </button>
                      ))}
                      <div
                        className="absolute top-0 h-full bg-blue-600 rounded-lg transition-all duration-300 shadow-lg"
                        style={{
                          width: `${100 / options.length}%`,
                          left: `${(options.indexOf(unit) * 100) / options.length}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section: Placeholder */}
      <div className="lg:w-1/3 w-full p-4">
        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-700/50 flex items-center justify-center h-full transition-all duration-300 hover:shadow-2xl">
          <p className="text-lg text-gray-400 text-center">
            Additional settings or a summary panel can go here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;