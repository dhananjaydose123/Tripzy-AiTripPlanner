import React from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import PlaceImage from "../../service/GlobalApi";

const PlaceCardItem = ({ place }) => {
  return (
    <Link
      to={"https://www.google.com/maps/search/?api=1&query=" + place?.place}
      target="_blank"
    >
      <div className="border flex gap-5  rounded-xl p-3 mt-3 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
        <PlaceImage
          place={place?.place}
          className="h-[140px] w-[140px] object-cover rounded-xl"
          defaultImage="https://www.holidify.com/images/bgImages/MANALI.jpg"
        />
        <div>
          <h2 className="font-bold text-lg">{place.place}</h2>
          <p className="text-sm text-gray-500">{place.details}</p>
          <p className="text-sm mt-1">⭐{place.rating} </p>
          <p className="text-sm mt-1">💵 Price: {place.ticket_pricing}</p>
          {/* <button className="mt-1 ">
            <FaMapLocationDot className="size-5" />
          </button> */}
        </div>
      </div>
    </Link>
  );
};

export default PlaceCardItem;
