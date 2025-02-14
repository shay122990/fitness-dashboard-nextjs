"use client";
import { motion } from "framer-motion";
import Card from "../components/Card";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import IntervalTimer from "../components/IntervalTimer";

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="p-6 bg-black bg-opacity-30 rounded h-full">
      <motion.div
        initial={{ opacity: 0, rotate: -45 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 1 }}
        className="w-20 mx-auto mb-4"
      >
        <Image
          src="/today-logo.png"
          width={100}
          height={100}
          alt="App Logo"
          className="rounded-full"
        />
      </motion.div>

      <motion.div
        className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white p-6 rounded-lg text-center mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl font-bold mb-2 break-words "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {user ? `Welcome back ${user.name}` : "Welcome to Your Fitness Hub!"}
        </motion.h1>
        <motion.p
          className="text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          {user
            ? "Let's plan your next workout."
            : "Plan. Track. Achieve. All in one place."}
        </motion.p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <Card
            title="Workout Planner"
            description="Plan and track your workouts to stay on track with your fitness goals."
            tabId="workout-planner"
            textColor="text-white"
            className="flex flex-col justify-between"
          />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <Card
            title="Nutrition Tracker"
            description="Track your meals and calories to maintain a balanced diet."
            tabId="nutrition-tracker"
            textColor="text-white"
            className="flex flex-col justify-between"
          />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <Card
            title="Insights"
            description="View your progress, workout statistics, and overall fitness trends."
            tabId="progress-insights"
            textColor="text-white"
            className="flex flex-col justify-between"
          />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <Card
            title="Profile"
            description="Update your personal information and view your fitness profile."
            tabId="profile"
            textColor="text-white"
            className="flex flex-col justify-between"
          />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <IntervalTimer  />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
