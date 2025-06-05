import React, { useEffect } from "react";
import PlaceImage from "../../service/GlobalApi";

const InfoSection = ({ trip }) => {
  return (
    <div>
      <PlaceImage
        place={trip?.userSelection?.location}
        className="h-[340px] w-full object-cover rounded-xl"
        defaultImage="https://www.fabhotels.com/blog/wp-content/uploads/2018/08/1400x600-6.jpg"
      />

      <div>
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md ">
              📅 {trip.userSelection?.noOfDays} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💰 {trip.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              👥 No. of traveler/s: {trip.userSelection?.traveller}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
