"use client"; 

import { useState } from "react";
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
    <div className="flex min-h-screen">
      <div className="w-64 p-4 bg-gray-800 text-white h-full">
        <ul className="space-y-4">
          <li>
            <button
              className="w-full text-left hover:text-blue-500"
              onClick={() => handleTabClick("dashboard")}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              className="w-full text-left hover:text-blue-500"
              onClick={() => handleTabClick("planner")}
            >
              Workout Planner
            </button>
          </li>
          <li>
            <button
              className="w-full text-left hover:text-blue-500"
              onClick={() => handleTabClick("nutrition")}
            >
              Nutrition Tracker
            </button>
          </li>
          <li>
            <button
              className="w-full text-left hover:text-blue-500"
              onClick={() => handleTabClick("insights")}
            >
              Progress Insights
            </button>
          </li>
          <li>
            <button
              className="w-full text-left hover:text-blue-500"
              onClick={() => handleTabClick("profile")}
            >
              Your Profile
            </button>
          </li>
        </ul>
      </div>
        {renderActiveTab()}
    </div>
  );
};

export default Sidebar;
