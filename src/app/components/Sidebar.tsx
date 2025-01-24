"use client";

import { usePathname } from "next/navigation"; 
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Sidebar = () => {
  const pathname = usePathname();  
  const user = useSelector((state: RootState) => state.auth.user); 

  const isActive = (path: string) => (pathname === path ? "bg-blue-700" : "");

  return (
    <div className="h-full px-2 lg:px-4 mt-10 flex flex-col items-center text-white">
      <Image
        src={user?.photoURL || "/today-logo.png"} 
        width={120}
        height={120}
        alt="Profile Logo"
        className="rounded-full"
        priority
      />
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
                className={`block w-full text-center lg:uppercase text-sm border rounded-sm p-1 lg:p-3 ${isActive(path)}`}
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
