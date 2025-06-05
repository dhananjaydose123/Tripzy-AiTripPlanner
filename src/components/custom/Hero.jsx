import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-col items-center mt-0 mx-56 gap-9">
      <h1 className="font-extrabold text-[42px] text-center mt-10">
        <span className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
          Discover Your Next Adventure with AI:
        </span>
        <br />
        Personalised Itineries At Your Fingertips
      </h1>
      <p className="text-xl text-gray-500 text-center">
        "From hidden gems to iconic landmarks, our AI builds your perfect
        getaway with smart suggestions, live updates, and day-by-day plans. The
        world is big — let’s explore it your way."
      </p>
      <Link to={"/create-trip"}>
        <Button>Get Started, It's Free</Button>
      </Link>
      <img src="/AiTripDashboard.png" alt="/" className="" />
    </div>
  );
};

export default Hero;
