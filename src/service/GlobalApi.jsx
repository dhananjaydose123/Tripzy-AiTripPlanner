import React, { useEffect, useState } from "react";
import axios from "axios";

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

const PlaceImage = ({ place, className, defaultImage }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get("https://api.pexels.com/v1/search", {
          headers: { Authorization: PEXELS_API_KEY },
          params: { query: place, per_page: 1 },
        });

        const url = res.data.photos[0]?.src?.landscape;
        if (url) setImageUrl(url);
        else setHasError(true);
      } catch (err) {
        setHasError(true);
      }
    };

    if (place) {
      setHasError(false);
      fetchImage();
    }
  }, [place]);

  return (
    <img
      src={hasError ? defaultImage : imageUrl || defaultImage}
      alt={place}
      className={className}
      onError={() => setHasError(true)}
    />
  );
};

export default PlaceImage;
