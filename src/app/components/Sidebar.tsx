"use client"
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

  const tabs = [
    { id: "dashboard", label: "Dashboard", component: <Dashboard setActiveTab={setActiveTab} /> },
    { id: "planner", label: "Workout Planner", component: <Planner /> },
    { id: "nutrition", label: "Nutrition Tracker", component: <Nutrition /> },
    { id: "insights", label: "Progress Insights", component: <Insights /> },
    { id: "profile", label: "Your Profile", component: <Profile /> },
  ];

  const renderActiveTab = () => {
    const activeTabData = tabs.find((tab) => tab.id === activeTab);
    return activeTabData ? activeTabData.component : <Dashboard setActiveTab={setActiveTab} />;
  };

  return (
    <div className="flex flex-row gap-2 lg:gap-6 justify-center w-full border">
      <div className="flex items-center flex-col gap-8 top-0 left-0 w-24 sm:w-24 md:w-48 lg:w-60 p-2 pt-10 bg-gray-800 text-white h-full">
        <Image
          src={todayLogo}
          width={120}
          height={120}
          alt="logo image"
          className="rounded-full"
          priority
        />

        <ul className="space-y-10 mt-4">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                className={`w-full text-left break-words text-sm lg:uppercase border p-2 ${
                  activeTab === tab.id ? "bg-gray-700" : ""
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 p-8 h-100 border bg-gray-700">{renderActiveTab()}</div>
    </div>
  );
};

export default Sidebar;
