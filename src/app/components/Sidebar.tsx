"use client"
import { usePathname } from "next/navigation"; 
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Sidebar = () => {
  const pathname = usePathname();  
  const user = useSelector((state: RootState) => state.auth.user); 

  const isActive = (path: string) => pathname === path ? "bg-blue-700" : "";

  return (
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
        <li>
          <Link href="/" className={`w-full text-left break-words text-sm lg:uppercase border p-2 ${isActive("/")}`}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/workout-planner" className={`w-full text-left break-words text-sm lg:uppercase border p-2 ${isActive("/workout-planner")}`}>
            Workout Planner
          </Link>
        </li>
        <li>
          <Link href="/nutrition-tracker" className={`w-full text-left break-words text-sm lg:uppercase border p-2 ${isActive("/nutrition-tracker")}`}>
            Nutrition Tracker
          </Link>
        </li>
        <li>
          <Link href="/progress-insights" className={`w-full text-left break-words text-sm lg:uppercase border p-2 ${isActive("/progress-insights")}`}>
            Insights
          </Link>
        </li>
        <li>
          <Link href="/profile" className={`w-full text-left break-words text-sm lg:uppercase border p-2 ${isActive("/profile")}`}>
            Your Profile
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
