import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setopenDialog] = useState(false);

  useEffect(() => {
    console.log(user);
  }, []);

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
      })
      .catch((error) => {
        console.error(
          "Error fetching user profile:",
          error.response?.data || error.message || error
        );
      });
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <img src="../public/logo.svg" alt="logo" className="w-30" />
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full">
                + Create Trip
              </Button>
            </a>
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full">
                My Trips
              </Button>
            </a>

            <Popover>
              <PopoverTrigger>
                <img
                  className="w-[35px] h-[35px]"
                  src="https://cdn-icons-png.flaticon.com/512/10337/10337609.png"
                  alt="user"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  LogOut
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setopenDialog(true)}>Sign In</Button>
        )}
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
};

export default Header;
