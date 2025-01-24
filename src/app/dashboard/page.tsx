"use client";
import Card from "../components/Card";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="min-h-screen p-6">
      <Image
        src="/today-logo.png"
        width={100}
        height={100}
        alt="App Logo"
        className="w-20 mx-auto mb-4 animate-fadeIn rounded-full"
      />
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-lg text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 break-words">
          {user ? `Welcome back ${user.name}` : "Welcome to Your Fitness Hub!"}
        </h1>
        <p className="text-lg">
          {user ? "Let's plan your next workout." : "Plan. Track. Achieve. All in one place."}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Workout Planner"
          description="Plan and track your workouts to stay on track with your fitness goals."
          tabId="workout-planner" 
          textColor="text-white"
        />
        <Card
          title="Nutrition Tracker"
          description="Track your meals and calories to maintain a balanced diet."
          tabId="nutrition-tracker" 
          textColor="text-white"
        />
        <Card
          title="Insights"
          description="View your progress, workout statistics, and overall fitness trends."
          tabId="progress-insights" 
          textColor="text-white"
        />
        <Card
          title="Profile"
          description="Update your personal information and view your fitness profile."
          tabId="profile" 
          textColor="text-white"
        />
      </div>
    </div>
  );
};

export default Dashboard;
