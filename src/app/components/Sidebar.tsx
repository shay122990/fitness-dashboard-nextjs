"use client";

import { useState } from "react";
import Image from "next/image";
import todayLogo from "../../../public/today-logo.png";
import Dashboard from "./Dashboard";
import Planner from "./Planner";
import Nutrition from "./Nutrition";
import Insights from "./Insights";
import Profile from "./Profile";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "planner":
        return <Planner />;
      case "nutrition":
        return <Nutrition />;
      case "insights":
        return <Insights />;
      case "profile":
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-row gap-2 lg:gap-10 justify-center w-full border">
      <div className="top-0 left-0 w-24 sm:w-24 md:w-48 lg:w-60 p-2 pt-10 bg-gray-800 text-white h-full">
        <Image src={todayLogo} width={120} height={120} alt="logo image"  className="rounded-full" priority/>

        <ul className="space-y-6 mt-4">
          <li>
            <button
              className="w-full text-left hover:text-blue-500 break-words"
              onClick={() => handleTabClick("dashboard")}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              className="w-full text-left hover:text-blue-500 break-words"
              onClick={() => handleTabClick("planner")}
            >
              Workout Planner
            </button>
          </li>
          <li>
            <button
              className="w-full text-left hover:text-blue-500 break-words"
              onClick={() => handleTabClick("nutrition")}
            >
              Nutrition Tracker
            </button>
          </li>
          <li>
            <button
              className="w-full text-left hover:text-blue-500 break-words"
              onClick={() => handleTabClick("insights")}
            >
              Progress Insights
            </button>
          </li>
          <li>
            <button
              className="w-full text-left hover:text-blue-500 break-words"
              onClick={() => handleTabClick("profile")}
            >
              Your Profile
            </button>
          </li>
        </ul>
      </div>

      <div className="flex-1 p-8 h-100 border bg-gray-700">
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default Sidebar;
