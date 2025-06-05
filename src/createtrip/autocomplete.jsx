import { useEffect, useState } from "react";

const LocationAutocomplete = ({ selectProps }) => {
  const { inputValue, onchange } = selectProps;
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!inputValue || inputValue.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(
          `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${inputValue}&key=AlzaSylGmD5PuBaI6UvzjJ4QRvIIQxWdNoO18zs`
        );
        const data = await res.json();
        setSuggestions(data.predictions || []);
        setShowDropdown(true);
      } catch (err) {
        console.error("Error fetching autocomplete:", err);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300); // debounce
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  const handleSelect = (description) => {
    onchange(description); // send selected value back to parent
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full mx-auto mt-8">
      <input
        type="text"
        value={inputValue}
        placeholder="Enter a location"
        onChange={(e) => onchange(e.target.value)}
        onFocus={() => inputValue && setShowDropdown(true)}
        className="w-full px-5 py-3 text-base border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
      />
      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-b-xl shadow-md mt-1 max-h-64 overflow-y-auto">
          {suggestions.map((item) => (
            <li
              key={item.place_id}
              onClick={() => handleSelect(item.description)}
              onMouseDown={(e) => e.preventDefault()} // prevent blur
              className="px-5 py-3 cursor-pointer hover:bg-gray-100 transition"
            >
              {item.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationAutocomplete;
