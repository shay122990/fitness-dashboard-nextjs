"use client";
import { motion } from "framer-motion";
import Card from "../components/Card";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="mb-24 p-6 bg-black bg-opacity-30 w-full rounded">
      <motion.div
        className="relative flex flex-col justify-center items-center align-middle text-white p-6 rounded-lg text-center mb-8 h-auto lg:h-96 overflow-hidden gap-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0">
          <Image
            src="/jellyfish.jpg"
            alt="Background"
            fill
            style={{ objectFit: "cover" }}
            className="opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {!user ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg z-10"
          >
            <Image
              src="/today-logo.png"
              alt="Logo"
              width={96}
              height={96}
              className="rounded-full"
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg z-10"
          >
            <Image
              src={user.photoURL || "/default-profile.png"}
              alt="Profile Picture"
              width={96}
              height={96}
              className="rounded-full"
            />
          </motion.div>
        )}

        <motion.h1
          className="relative lg:text-4xl text-xl font-bold break-words"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {user ? `Welcome back ${user.name}` : "Welcome to Your Fitness Hub!"}
        </motion.h1>

        <motion.p
          className="relative text-lg"
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
        className="grid sm:grid-cols-2 gap-6 items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative col-span-full">
          <Card
            title="Activity Tracker"
            description="Access the following features."
            textColor="text-white text-center"
            className="flex flex-col justify-between rounded-lg"
          >
            <div className="grid grid-cols-2 gap-6 mt-4">
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
                  className="flex flex-col justify-between  rounded-lg text-sm"
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
                  className="flex flex-col justify-between  rounded-lg text-sm"
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
                  className="flex flex-col justify-between  rounded-lg text-sm"
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
                  className="flex flex-col justify-between  rounded-lg text-sm"
                />
              </motion.div>
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
