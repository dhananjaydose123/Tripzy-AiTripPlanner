import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PlaceImage from "@/service/GlobalApi";

function UserTripCardItem({ trip }) {
  useEffect(() => {
    trip;
  }, [trip]);

  return (
    <Link to={`/view-trip/${trip?.id}`}>
      <div className="hover:scale-105 transition-all">
        <PlaceImage
          place={trip?.userSelection?.location}
          className="object-cover rounded-xl h-[200px]"
          defaultImage="https://www.holidify.com/images/bgImages/MANALI.jpg"
        />
        <div>
          <h2 className="font-bold text-lg">{trip?.userSelection?.location}</h2>
          <h2 className="text-sm text-gray-500">
            {trip?.userSelection?.noOfDays} Days trip with{" "}
            {trip?.userSelection?.budget} budget.{" "}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
