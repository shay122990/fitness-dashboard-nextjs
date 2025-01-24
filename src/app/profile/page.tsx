'use client';

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
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

  const handleSignIn = async () => {
    try {
      await googleSignIn(dispatch);
      router.push("/");  
    } catch (error) {
      console.error("Sign-In failed:", error);
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
    <div className="max-w-sm mx-auto bg-gray-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Your Profile</h2>
      {user ? (
        <>
          <div className="text-gray-700">
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
            className="w-full"
          />
        </>
      ) : (
        <Button
          label="Sign in with Google"
          onClick={handleSignIn}
          className="w-full"
        />
      )}
    </div>
  );
};

export default Profile;
