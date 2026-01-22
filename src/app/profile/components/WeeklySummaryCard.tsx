"use client";

import React, { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase-config";
import { fetchUserWorkouts, fetchCalorieEntries } from "@/firebase/firestore";
import Card from "../../components/Card";

type ShortDay = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
const SHORT_DAYS: ShortDay[] = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

const fullToShort: Record<string, ShortDay> = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
  Sunday: "Sun",
};

interface CaloriesDayData {
  eaten: (number | string)[];
  burned: (number | string)[];
}

interface CaloriesByFullDay {
  [key: string]: CaloriesDayData;
}

const WeeklySummaryCard: React.FC = () => {
  const [authLoading, setAuthLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const [workoutsByShort, setWorkoutsByShort] = useState<
    Record<ShortDay, number>
  >({
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
    Sun: 0,
  });

  const [caloriesByShort, setCaloriesByShort] = useState<
    Record<ShortDay, { eaten: number[]; burned: number[] }>
  >({
    Mon: { eaten: [], burned: [] },
    Tue: { eaten: [], burned: [] },
    Wed: { eaten: [], burned: [] },
    Thu: { eaten: [], burned: [] },
    Fri: { eaten: [], burned: [] },
    Sat: { eaten: [], burned: [] },
    Sun: { eaten: [], burned: [] },
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const run = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const [uw, uc] = await Promise.all([
          fetchUserWorkouts(userId),
          fetchCalorieEntries(userId),
        ]);

        const wNorm: Record<ShortDay, number> = {
          Mon: 0,
          Tue: 0,
          Wed: 0,
          Thu: 0,
          Fri: 0,
          Sat: 0,
          Sun: 0,
        };
        if (uw && typeof uw === "object") {
          Object.entries(uw).forEach(([fullDay, arr]) => {
            const short = fullToShort[fullDay] ?? (fullDay as ShortDay);
            if (SHORT_DAYS.includes(short) && Array.isArray(arr)) {
              wNorm[short] = arr.length;
            }
          });
        }

        const cNorm: Record<ShortDay, { eaten: number[]; burned: number[] }> = {
          Mon: { eaten: [], burned: [] },
          Tue: { eaten: [], burned: [] },
          Wed: { eaten: [], burned: [] },
          Thu: { eaten: [], burned: [] },
          Fri: { eaten: [], burned: [] },
          Sat: { eaten: [], burned: [] },
          Sun: { eaten: [], burned: [] },
        };

        if (uc && typeof uc === "object") {
          const caloriesObj = uc as CaloriesByFullDay;

          Object.entries(caloriesObj).forEach(([fullDay, data]) => {
            const short = fullToShort[fullDay] ?? (fullDay as ShortDay);
            if (!SHORT_DAYS.includes(short)) return;

            const eatenArr = Array.isArray(data.eaten) ? data.eaten : [];
            const burnedArr = Array.isArray(data.burned) ? data.burned : [];

            cNorm[short] = {
              eaten: eatenArr.map((v) =>
                typeof v === "number" ? v : parseInt(v, 10) || 0,
              ),
              burned: burnedArr.map((v) =>
                typeof v === "number" ? v : parseInt(v, 10) || 0,
              ),
            };
          });
        }

        setWorkoutsByShort(wNorm);
        setCaloriesByShort(cNorm);
      } catch (e) {
        console.error("WeeklySummaryCard load error:", e);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [userId]);

  const USE_BURNED = true;

  const { daysWorkedOut, totalCalories } = useMemo(() => {
    const daysWorked = SHORT_DAYS.reduce(
      (acc, d) => acc + (workoutsByShort[d] > 0 ? 1 : 0),
      0,
    );

    const calTotal = SHORT_DAYS.reduce((acc, d) => {
      const arr = USE_BURNED
        ? caloriesByShort[d].burned
        : caloriesByShort[d].eaten;
      return acc + arr.reduce((s, n) => s + n, 0);
    }, 0);

    return { daysWorkedOut: daysWorked, totalCalories: calTotal };
  }, [workoutsByShort, caloriesByShort]);

  return (
    <Card
      title="Weekly Summary"
      description={
        USE_BURNED
          ? "Workouts and calories burned this week."
          : "Workouts and calories eaten this week."
      }
      className="p-6 text-white text-center rounded-lg shadow-md bg-black/55 max-w-full"
    >
      {authLoading || loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="rounded-lg border border-white/10 bg-black/30 p-4 animate-pulse"
            >
              <div className="h-4 w-24 bg-white/10 rounded mb-2" />
              <div className="h-8 w-16 bg-white/10 rounded" />
            </div>
          ))}
        </div>
      ) : userId ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-lg border border-white/10 bg-gradient-to-br from-gray-950 to-gray-800 p-4">
            <p className="text-sm text-white/70">Days Worked Out</p>
            <p className="mt-1 text-3xl font-semibold tracking-tight">
              {daysWorkedOut} / 7
            </p>
            <p className="mt-1 text-xs text-white/50">Mon–Sun</p>
          </div>

          <div className="rounded-lg border border-white/10 bg-gradient-to-br from-gray-950 to-gray-800 p-4">
            <p className="text-sm text-white/70">
              Calories {USE_BURNED ? "Burned" : "Eaten"}
            </p>
            <p className="mt-1 text-3xl font-semibold tracking-tight">
              {totalCalories.toLocaleString()} kcal
            </p>
            <p className="mt-1 text-xs text-white/50">Weekly total</p>
          </div>
        </div>
      ) : (
        <p className="text-red-400">Please log in to see your summary.</p>
      )}
    </Card>
  );
};

export default WeeklySummaryCard;
