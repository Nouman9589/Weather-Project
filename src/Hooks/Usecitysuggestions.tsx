import { useState, useEffect } from "react";

// Custom Hook to fetch city suggestions from the GeoDB API
const useCitySuggestions = (query: string) => {
  const [citySuggestions, setCitySuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCitySuggestions = async (query: string) => {
    if (!query) return; // Prevent fetching when input is empty

    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}&limit=5`;

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '2fb2aa5e65msh166c6a1d5de2870p1aff36jsn2b1301349194', // Replace with your actual API key
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
      }
    };

    try {
      setLoading(true);
      setError(null); // Reset previous error
      const response = await fetch(url, options);
      const result = await response.json();
      
      if (result.data) {
        setCitySuggestions(result.data); // Set suggestions if available
      } else {
        setCitySuggestions([]); // No data found
      }
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
      setError("Failed to fetch city suggestions");
      setCitySuggestions([]); // Clear suggestions on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCitySuggestions(query);
  }, [query]);

  return { citySuggestions, loading, error };
};

export default useCitySuggestions;
