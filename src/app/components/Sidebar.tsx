"use client";

import { usePathname } from "next/navigation"; 
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Sidebar = () => {
  const pathname = usePathname();  
  const user = useSelector((state: RootState) => state.auth.user); 

  const isActive = (path: string) => (pathname === path ? "bg-blue-950" : "");

  return (
    <div className="h-full px-2 lg:px-4 pt-10 flex flex-col items-center text-white" 
    style={{
      background:
        "linear-gradient(0deg, rgba(3,37,97,1) 0%, rgba(4,11,36,1) 100%)",
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
                className={`block w-full text-left hover:bg-blue-600 lg:uppercase text-sm  rounded p-2 lg:p-3 ${isActive(path)} `}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
