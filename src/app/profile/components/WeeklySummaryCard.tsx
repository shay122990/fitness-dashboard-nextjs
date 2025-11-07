"use client";
import React, { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/firebase-config";
import {
  fetchUserWorkouts,
  fetchCalorieEntries,
} from "../../../firebase/firestore";
import AuthCheck from "../../components/AuthCheck";

type DayKey = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
const DAYS: DayKey[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Skeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <div className="h-4 w-32 animate-pulse rounded bg-white/10 mb-3" />
      <div className="h-8 w-24 animate-pulse rounded bg-white/10" />
    </div>
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <div className="h-4 w-40 animate-pulse rounded bg-white/10 mb-3" />
      <div className="h-8 w-32 animate-pulse rounded bg-white/10" />
    </div>
  </div>
);

const Stat = ({
  label,
  value,
  sublabel,
}: {
  label: string;
  value: string;
  sublabel?: string;
}) => (
  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
    <p className="text-sm text-white/70">{label}</p>
    <p className="mt-1 text-3xl font-semibold tracking-tight">{value}</p>
    {sublabel ? <p className="mt-1 text-xs text-white/50">{sublabel}</p> : null}
  </div>
);

const WeeklySummaryCard: React.FC = () => {
  const [authLoading, setAuthLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const [workoutsByDay, setWorkoutsByDay] = useState<
    Partial<Record<DayKey, unknown[]>>
  >({});
  const [caloriesByDay, setCaloriesByDay] = useState<
    Partial<
      Record<
        DayKey,
        {
          eaten?: (number | string)[];
          burned?: (number | string)[];
        }
      >
    >
  >({});

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
        setWorkoutsByDay({});
        setCaloriesByDay({});
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const [uw, uc] = await Promise.all([
          fetchUserWorkouts(userId),
          fetchCalorieEntries(userId),
        ]);

        const normWorkouts: Partial<Record<DayKey, unknown[]>> = {};
        const normCalories: Partial<
          Record<
            DayKey,
            { eaten?: (number | string)[]; burned?: (number | string)[] }
          >
        > = {};

        DAYS.forEach((d) => {
          const w = (uw?.[d] as unknown[]) || [];
          const c =
            (uc?.[d] as {
              eaten?: (number | string)[];
              burned?: (number | string)[];
            }) || {};
          normWorkouts[d] = w;
          normCalories[d] = {
            eaten: Array.isArray(c.eaten) ? c.eaten : [],
            burned: Array.isArray(c.burned) ? c.burned : [],
          };
        });

        setWorkoutsByDay(normWorkouts);
        setCaloriesByDay(normCalories);
      } catch (e) {
        console.error("WeeklySummaryCard load error:", e);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [userId]);

  const { daysWorkedOut, totalCaloriesEaten } = useMemo(() => {
    const daysWorked = DAYS.reduce((acc, d) => {
      const sessions = workoutsByDay[d]?.length ?? 0;
      return acc + (sessions > 0 ? 1 : 0);
    }, 0);

    const caloriesTotal = DAYS.reduce((acc: number, d) => {
      const eatenArr = caloriesByDay[d]?.eaten ?? [];
      const sum = eatenArr.reduce((s: number, v): number => {
        const num = typeof v === "number" ? v : parseInt(String(v), 10) || 0;
        return s + num;
      }, 0);
      return acc + sum;
    }, 0);

    return { daysWorkedOut: daysWorked, totalCaloriesEaten: caloriesTotal };
  }, [workoutsByDay, caloriesByDay]);

  return (
    <AuthCheck
      authLoading={authLoading}
      userId={userId}
      loading={loading}
      onRedirect={() => (window.location.href = "/profile")}
      message="Sign in to view your weekly summary."
    >
      <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-4">
        <h2 className="mb-3 text-lg font-semibold">This Week</h2>

        {loading ? (
          <Skeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Stat
              label="Days Worked Out"
              value={`${daysWorkedOut} / 7`}
              sublabel="Mon–Sun"
            />
            <Stat
              label="Calories Eaten"
              value={`${totalCaloriesEaten.toLocaleString()} kcal`}
              sublabel="Weekly total"
            />
          </div>
        )}
      </div>
    </AuthCheck>
  );
};

export default WeeklySummaryCard;
