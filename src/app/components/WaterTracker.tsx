"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setUser, updateWaterIntake, resetWaterIntake } from "@/store/waterSlice";
import { auth,db } from "@/firebase/firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";


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
    <div className="flex flex-col justify-center gap-2 p-6 h-auto bg-black bg-opacity-30 rounded-lg text-center text-white">
      <h2 className="text-2xl font-bold mb-4">Water Tracker</h2>
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
          <button
            onClick={addCup}
            className="bg-blue-500 text-white px-4 py-2 rounded "
            disabled={cups >= goal}
          >
            + Add Cup
          </button>
          <button onClick={resetWater} className="bg-red-500 text-white px-4 py-2 rounded">
            Reset
          </button>
        </>
      ) : (
        <p>Please log in to track your water intake.</p>
      )}
    </div>
  );
};

export default WaterTracker;
