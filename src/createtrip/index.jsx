import { useEffect, useState } from "react";
import LocationAutocomplete from "./autocomplete";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "../constants/options";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../service/firebaseConfig";
import { useNavigate } from "react-router-dom";

function createTrip() {
  const [inputValue, setInputValue] = useState("");
  const [openDialog, setopenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setformData] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setformData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setopenDialog(true);
      return;
    }
    if (
      (formData?.noOfDays > 5 && !formData?.location) ||
      !formData?.budget ||
      !formData?.traveller
    ) {
      toast("Please fill all details");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveller}", formData?.traveller)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    // console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log(result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);

    const docId = Date.now().toString();
    const user = JSON.parse(localStorage.getItem("user"));
    await setDoc(doc(db, "AiTrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });

    setLoading(false);
    navigate("/view-trip/" + docId);
  };

  const login = useGoogleLogin({
    onSuccess: (res) => GetUserProfile(res),
    onError: (error) => console.error("Login error:", error),
    scope: "profile email",
  });

  const GetUserProfile = (tokenInfo) => {
    const accessToken = tokenInfo?.access_token;
    if (!accessToken) {
      console.error("No access token found.");
      return;
    }

    axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      })
      .then((resp) => {
        console.log("User data received:", resp.data);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setopenDialog(false);
        OnGenerateTrip();
      })
      .catch((error) => {
        console.error(
          "Error fetching user profile:",
          error.response?.data || error.message || error
        );
      });
  };

  return (
    <div className=" sm:px-10 md:px-32 lg:px-56 xl:px-70 px-5  mt-10">
      <h2 className="font-bold text-3xl">
        Tell Us Your Travel Preferences 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic info and our trip planner will automatically
        generate a customized itinerary based on your preferences.
      </p>
      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is destination of choice ?
          </h2>
          <LocationAutocomplete
            selectProps={{
              inputValue,
              onchange: (v) => {
                setInputValue(v);
                handleInputChange("location", v);
              },
            }}
          />
          <div>
            <h2 className="text-xl my-3 font-medium">
              How many days are you planning your trip ?
              <input
                type="number"
                placeholder="Ex. 3"
                className="w-full mt-7 px-5 py-3 text-base border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                onChange={(e) => handleInputChange("noOfDays", e.target.value)}
              />
            </h2>
          </div>

          <div>
            <h2 className="text-xl my-3 font-medium">What is Your budget ?</h2>
            <div className="grid grid-cols-3 gap-5 mt-6 ">
              {SelectBudgetOptions.map((item, index) => (
                <div
                  onClick={() => handleInputChange("budget", item.title)}
                  key={index}
                  className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
                    ${
                      formData?.budget == item.title && "shadow-lg border-black"
                    }
                    `}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <h2 className="text-md text-gray-500">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl my-3 font-medium">
              Who do you plan on travelling with you ?
            </h2>
            <div className="grid grid-cols-3 gap-5 mt-6 ">
              {SelectTravelesList.map((item, index) => (
                <div
                  onClick={() => handleInputChange("traveller", item.people)}
                  key={index}
                  className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
                    ${
                      formData?.traveller == item.people &&
                      "shadow-lg border-black"
                    }
                    `}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <h2 className="text-md text-gray-500">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="my-10 justify-end flex ">
        <Button disabled={loading} onClick={OnGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img
                src="/logo.svg"
                alt="logo"
                width="120px"
                className="items-center"
              />
              <h2 className="font-bold text-lg mt-4">
                Sign In to check out your travel plan
              </h2>
              <p>Sign in to the App with Google authentication securely</p>
              <Button
                onClick={login}
                className="w-full mt-6 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign in With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default createTrip;
