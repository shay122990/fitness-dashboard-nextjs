"use client";

import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { fetchUserWorkouts } from "@/firebase/firestore";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { format } from "date-fns";

export default function WorkoutCalendar() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [workoutDays, setWorkoutDays] = useState<string[]>([]);
  const [value, setValue] = useState<Date | null>(new Date());

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const data = await fetchUserWorkouts(user.uid);
      const days = data ? Object.keys(data) : [];
      setWorkoutDays(days);
    };

    fetchData();
  }, [user]);

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const formatted = format(date, "yyyy-MM-dd");
      if (workoutDays.includes(formatted)) {
        return "bg-green-300 text-black rounded-full font-bold";
      }
    }
    return null;
  };

  return (
    <div className="p-4 w-full max-w-md mx-auto items-center flex flex-col">
      <h2 className="text-xl font-semibold text-center mb-4">
        Workout Calendar
      </h2>
      <Calendar
        onChange={(val) => {
          if (val instanceof Date) {
            setValue(val);
          }
        }}
        value={value}
        tileClassName={tileClassName}
      />
    </div>
  );
}
