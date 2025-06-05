import React from "react";
import { Link } from "react-router-dom";
import PlaceImage from "../../service/GlobalApi";
const HotelCardItem = ({ hotel }) => {
  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        hotel?.name +
        "," +
        hotel?.address
      }
      target="_blank"
    >
      <div className="hover:scale-105 transition-all cursor-pointer mt-5 mb-8">
        <PlaceImage
          place={hotel?.name}
          className="h-[200px] w-[350px] object-cover rounded-xl"
          defaultImage="https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/620719916.webp?k=616cefe723433fd501f4fe89c7f415ce49822b10d769c7a725f8e35b39be66af&o="
        />
        <div className="my-2">
          <h2 className="font-medium">{hotel?.name}</h2>
          <h2 className="text-xs text-gray-500">📍{hotel?.address}</h2>
          <h2 className="text-sm">💰 {hotel?.price}</h2>
          <h2 className="text-sm">⭐ {hotel?.rating}</h2>
        </div>
      </div>
    </Link>
  );
};

export default HotelCardItem;
