"use client";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    if (user) {
      setActiveTab("dashboard");
    }
  }, [user]);

  const tabs = [
    { id: "dashboard", label: "Dashboard", component: <Dashboard setActiveTab={setActiveTab} /> },
    { id: "planner", label: "Workout Planner", component: <Planner setActiveTab={setActiveTab} /> },
    { id: "nutrition", label: "Nutrition Tracker", component: <Nutrition setActiveTab={setActiveTab} /> },
    { id: "insights", label: "Progress Insights", component: <Insights setActiveTab={setActiveTab} /> },
    { id: "profile", label: "Your Profile", component: <Profile setActiveTab={setActiveTab} /> },
  ];

  const renderActiveTab = () => {
    const activeTabData = tabs.find((tab) => tab.id === activeTab);
    return activeTabData ? activeTabData.component : <Dashboard setActiveTab={setActiveTab} />;
  };

  return (
    <div className="flex flex-row gap-2 lg:gap-6 justify-center w-full">
      <div
        className="fixed top-0 left-0 h-screen w-24 sm:w-32 md:w-48 lg:w-60 pt-12 text-white p-4 flex flex-col items-center"
        style={{
          background: 'linear-gradient(229deg, rgba(10,4,255,1) 1%, rgba(0,19,60,1) 91%)',
        }}
      >
        <Image
          src={user?.photoURL || "/today-logo.png"}
          width={120}
          height={120}
          alt="Profile Logo"
          className="rounded-full"
          priority
        />

        <ul className="space-y-10 mt-10">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                className={`w-full text-left break-words text-sm lg:uppercase border p-2 ${
                  activeTab === tab.id ? "bg-blue-700" : ""
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="ml-24 sm:ml-32 md:ml-48 lg:ml-60 p-8 flex-1 h-screen overflow-y-auto bg-gray-900"
        style={{ background: 'radial-gradient(circle, rgba(10,4,255,1) 1%, rgba(0,19,60,1) 71%)' }}
      >
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default Sidebar;
