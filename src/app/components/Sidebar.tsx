"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Image from "next/image";
import Dashboard from "./Dashboard";
import Planner from "./Planner";
import Nutrition from "./Nutrition";
import Insights from "./Insights";
import Profile from "./Profile";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const user = useSelector((state: RootState) => state.auth.user);

  const tabs = [
    { id: "dashboard", label: "Dashboard", component: <Dashboard setActiveTab={setActiveTab} /> },
    { id: "planner", label: "Workout Planner", component: <Planner setActiveTab={setActiveTab}/> },
    { id: "nutrition", label: "Nutrition Tracker", component: <Nutrition setActiveTab={setActiveTab}/> },
    { id: "insights", label: "Progress Insights", component: <Insights setActiveTab={setActiveTab} /> },
    { id: "profile", label: "Your Profile", component: <Profile /> },
  ];

  const renderActiveTab = () => {
    const activeTabData = tabs.find((tab) => tab.id === activeTab);
    return activeTabData ? activeTabData.component : <Dashboard setActiveTab={setActiveTab} />;
  };

  return (
    <div className="flex flex-row gap-2 lg:gap-6 justify-center w-full">
      <div className="fixed top-0 left-0 h-screen w-24 sm:w-32 md:w-48 lg:w-60 pt-20 bg-gray-800 text-white p-4 flex flex-col items-center">
        <Image
          src={user?.photoURL || "/today-logo.png"}
          width={120}
          height={120}
          alt="Profile Logo"
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

      <div className="ml-24 sm:ml-32 md:ml-48 lg:ml-60 p-8 flex-1 h-screen overflow-y-auto bg-gray-900">
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default Sidebar;
