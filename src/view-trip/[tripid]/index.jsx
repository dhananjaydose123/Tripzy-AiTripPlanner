import React, { useEffect, useState } from "react";
import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";

const Viewtrip = () => {
  const { tripid } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    tripid && GetTripData();
  }, [tripid]);

  const GetTripData = async () => {
    const docRef = doc(db, "AiTrips", tripid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document: ", docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("No such document");
      toast("No trip found");
    }
  };
  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/* Information Section */}
      <InfoSection trip={trip} />

      {/* Recommended Hotels */}
      <Hotels trip={trip} />
      {/* Daily Plan */}
      <PlacesToVisit trip={trip} />
      {/* Footer */}
      <Footer trip={trip} />
    </div>
  );
};

export default Viewtrip;
