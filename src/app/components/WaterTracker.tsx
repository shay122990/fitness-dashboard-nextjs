"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setUser, updateWaterIntake, resetWaterIntake } from "@/store/waterSlice";
import { auth, db } from "@/firebase/firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Button from "./Button";
import Card from "./Card";

const WaterTracker = () => {
  const goal = 8;
  const dispatch = useDispatch();
  const cups = useSelector((state: RootState) => state.water.cups);
  const userId = useSelector((state: RootState) => state.water.userId);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setUser(user.uid));

        const userDocRef = doc(db, "waterIntake", user.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          dispatch(updateWaterIntake(docSnap.data().cups || 0));
        } else {
          await setDoc(userDocRef, { cups: 0 });
          dispatch(updateWaterIntake(0));
        }
      } else {
        dispatch(setUser(null));
        dispatch(updateWaterIntake(0));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const addCup = async () => {
    if (cups < goal && userId) {
      const newCups = cups + 1;
      dispatch(updateWaterIntake(newCups));
      await setDoc(doc(db, "waterIntake", userId), { cups: newCups });
    }
  };

  const resetWater = async () => {
    if (userId) {
      dispatch(resetWaterIntake());
      await setDoc(doc(db, "waterIntake", userId), { cups: 0 });
    }
  };

  return (
    <Card 
      title="Water Tracker" 
      description="Track your daily water intake and reach your goal." 
      className="p-6 text-white text-center rounded-lg shadow-md"
    >
      {userId ? (
        <>
          <p className="text-lg mb-2">{cups} / {goal} cups</p>
          <div className="flex gap-2 justify-center mb-4">
            {[...Array(goal)].map((_, i) => (
              <motion.div
                key={i}
                className={`w-8 h-8 rounded-full border-2 ${i < cups ? "bg-blue-500 border-blue-500" : "border-gray-500"}`}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={addCup} 
              label="+ Add Cup"
              className="bg-gradient-to-br from-gray-950 to-gray-800 text-green-400 shadow-md shadow-green-400/50"
            />
            <Button 
              onClick={resetWater} 
              label="Reset"
              className="bg-gradient-to-br from-gray-950 to-gray-800 text-red-500 shadow-md shadow-green-400/50"
            />
          </div>
        </>
      ) : (
        <p className="text-red-400">Please log in to track your water intake.</p>
      )}
    </Card>
  );
};

export default WaterTracker;
