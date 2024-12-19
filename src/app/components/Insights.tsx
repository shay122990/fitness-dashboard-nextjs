import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { fetchUserWorkouts, fetchUserCalories } from "../../firebase/firestore";
import { auth } from "../../firebase/firebase-config";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Insights = () => {
  const [workoutData, setWorkoutData] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  const burnedCaloriesData = useSelector((state: RootState) => {
    return Object.keys(state.nutrition).map((day) => {
      return state.nutrition[day].burned.reduce((acc, curr) => acc + parseInt(curr, 10), 0);
    });
  });

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid);
    } else {
      setUserId(null);
    }
    setAuthLoading(false);
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const userWorkouts = await fetchUserWorkouts(userId);
          const userCalories = await fetchUserCalories(userId);

          if (userWorkouts && userCalories) {
            const workoutChartData = Object.keys(userWorkouts).map(day => userWorkouts[day].length);
            setWorkoutData(workoutChartData);
          }
        } catch (error) {
          console.error("Error fetching data from Firestore:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [userId]);

  if (authLoading) {
    return <div>Checking authentication...</div>;
  }

  if (!userId) {
    return <div>Please sign in to see your progress.</div>;
  }

  if (loading) {
    return <div>Loading your progress...</div>;
  }

  const workoutChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Workouts (sessions)",
        data: workoutData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const caloriesChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Calories Burned (from Redux)",
        data: burnedCaloriesData,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="border border-white p-6">
      <h3 className="text-xl font-bold mb-4">Your Progress</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border p-4 rounded-lg">
          <h4 className="font-semibold">Weekly Workout Progress</h4>
          <Line data={workoutChartData} options={{ responsive: true }} />
        </div>

        <div className="border p-4 rounded-lg">
          <h4 className="font-semibold">Calories Burned Over Time</h4>
          <Line data={caloriesChartData} options={{ responsive: true }} />
        </div>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold">Key Stats</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border p-4 rounded-lg">
            <p className="font-semibold">Total Workouts</p>
            <p>{workoutData.length} Workouts</p>
          </div>

          <div className="border p-4 rounded-lg">
            <p className="font-semibold">Total Calories Burned</p>
            <p>{burnedCaloriesData.reduce((acc, curr) => acc + curr, 0)} kcal</p>
          </div>

          <div className="border p-4 rounded-lg">
            <p className="font-semibold">Consistency</p>
            <p>{workoutData.length}/7 days this week</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
