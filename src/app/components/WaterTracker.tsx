"use client";

import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { updateWaterIntake, resetWaterIntake } from "@/store/waterSlice";

const WaterTracker = () => {
  const goal = 8; 
  const dispatch = useDispatch();
  const cups = useSelector((state: RootState) => state.water.cups);

  const addCup = () => {
    if (cups < goal) dispatch(updateWaterIntake(cups + 1));
  };

  const resetWater = () => {
    dispatch(resetWaterIntake());
  };

  return (
    <div className="p-6 bg-black bg-opacity-30 rounded-lg text-center text-white">
      <h2 className="text-2xl font-bold mb-4">Water Tracker</h2>
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
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        disabled={cups >= goal}
      >
        + Add Cup
      </button>
      <button onClick={resetWater} className="bg-red-500 text-white px-4 py-2 rounded">
        Reset
      </button>
    </div>
  );
};

export default WaterTracker;
