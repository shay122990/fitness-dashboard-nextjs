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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false); 
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
      <div
        className={`fixed lg:relative top-0 left-0 w-64 p-4 pt-20 bg-gray-800 text-white h-full z-50 transition-transform transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
        style={{ transition: "transform 0.3s ease-in-out" }}
      >
        <Image src={todayLogo} width={200} height={200} alt="logo image" />
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

      <button
        className="lg:hidden p-4 absolute top-4 left-4 text-white z-50"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      <div className="flex-1 p-8 sm:ml-8 lg:ml-64">
        <h1 className="text-3xl font-bold">Fitness Planner Overview</h1>
        <p className="mt-4">Choose a section to get started:</p>

        {renderActiveTab()}
      </div>
    </div>
  );
};

export default Sidebar;
