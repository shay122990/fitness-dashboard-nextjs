"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { clearUser } from "../../store/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { googleSignIn } from "../../firebase/auth";
import Image from "next/image";
import Button from "../components/Button";
import { useRouter } from "next/navigation";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      await googleSignIn(dispatch);
      router.push("/");
    } catch (error) {
      console.error("Sign-In failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div
      className="relative flex justify-center  h-full px-6 pb-4 pt-20 rounded bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/profile-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-gray-950 bg-opacity-70"></div>
      <div className="relative flex flex-col bg-white shadow-md rounded-lg p-4 text-center justify-center items-center w-full h-80 bg-gradient-to-br from-gray-900 to-blue-700">
        <h1 className="text-2xl font-bold text-center mb-4">Your Profile</h1>
        {user ? (
          <>
            <div className="text-white">
              <Image
                src={user.photoURL || "/default-profile.png"}
                alt={user.name || "Profile Picture"}
                className="w-24 h-24 rounded-full mx-auto border-2 border-gray-300 mb-4"
                width={96}
                height={96}
              />
              <p className="mb-2">
                <span className="font-semibold">Name:</span> {user.name}
              </p>
              <p className="mb-2 text-sm break-words">
                <span className="font-semibold">Email:</span> {user.email}
              </p>
            </div>
            <Button
              label="Log Out"
              onClick={handleLogout}
              className="w-52 bg-red-500"
            />
          </>
        ) : (
          <Button
            label={loading ? "Signing in..." : "Sign in with Google"}
            onClick={handleSignIn}
            disabled={loading}
            className="w-52 bg-green-500"
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
