"use client";

import { usePathname } from "next/navigation"; 
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useState } from "react";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";



const Sidebar = () => {
  const pathname = usePathname();  
  const user = useSelector((state: RootState) => state.auth.user); 
  const [isOpen, setIsOpen] = useState(false); 

  const isActive = (path: string) => (pathname === path ? "bg-blue-950" : "");

  return (
    <>
      <button 
        className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-gradient-to-b from-blue-700 to-blue-950 text-white rounded-md"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <RiMenuUnfoldLine size={24} /> : <RiMenuFoldLine size={24} />}
      </button>

      <div 
        className={`fixed lg:static top-0 left-0 h-screen w-[150px] bg-gradient-to-b from-blue-700 to-blue-950 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
        style={{
          background:
            "linear-gradient(0deg, rgba(3,37,97,1) 0%, rgba(4,11,36,1) 100%)",
        }}
      >
        <div className="h-full px-4 pt-16 flex flex-col items-center">
          <Image
            src={user?.photoURL || "/today-logo.png"} 
            width={100}
            height={100}
            alt="Profile Logo"
            className="rounded-full"
            priority
          />
          <hr className="w-full h-[2px] bg-gradient-to-r from-transparent via-white to-transparent border-0" />
          <nav className="w-full mt-10">
            <ul className="space-y-6">
              {[
                { path: "/", label: "Dashboard" },
                { path: "/workout-planner", label: "Planner" },
                { path: "/nutrition-tracker", label: "Nutrition" },
                { path: "/progress-insights", label: "Insights" },
                { path: "/profile", label: "Profile" },
              ].map(({ path, label }) => (
                <li key={path}>
                  <Link
                    href={path}
                    className={`block w-full text-left hover:bg-blue-600 lg:uppercase text-sm rounded p-2 lg:p-3 ${isActive(path)}`}
                    onClick={() => setIsOpen(false)} 
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={() => setIsOpen(false)} 
        ></div>
      )}
    </>
  );
};

export default Sidebar;
