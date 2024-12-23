import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { addWorkout, removeWorkout, setWorkouts } from "@/store/workoutsSlice";
import { fetchUserWorkouts, saveWorkout, removeWorkoutFromFirestore } from "../../firebase/firestore";
import { daysOfWeek } from "../utils/days"; 
import InputBox from "../components/InputBox";
import DaySelector from "../components/DaySelector";
import Button from "../components/Button";
import Card from "./Card";

const Planner: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>("Monday");
  const [newWorkout, setNewWorkout] = useState<string>("");
  const [sets, setSets] = useState<number>(1);
  const [reps, setReps] = useState<number>(10);
  const [weight, setWeight] = useState<number>(0);

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const workouts = useSelector((state: RootState) => state.workouts);

  useEffect(() => {
    const loadWorkouts = async () => {
      if (user) {
        const fetchedWorkouts = await fetchUserWorkouts(user.uid);
        if (fetchedWorkouts) {
          dispatch(setWorkouts(fetchedWorkouts));
        }
      }
    };

    loadWorkouts();
  }, [user, dispatch]);

  const addWorkoutHandler = async () => {
    if (selectedDay && newWorkout.trim() && sets > 0 && reps > 0) {
      const workoutDetails = `${newWorkout.trim()} - Sets: ${sets}, Reps: ${reps}, Weight: ${weight} kg`;
      dispatch(addWorkout({ day: selectedDay, workout: workoutDetails }));

      if (user) {
        await saveWorkout(user.uid, selectedDay, workoutDetails);
      }

      setNewWorkout("");
      setSets(1);
      setReps(10);
      setWeight(0);
    }
  };

  const removeWorkoutHandler = async (day: string, workout: string) => {
    if (!user) return;

    try {
      await removeWorkoutFromFirestore(user.uid, day, workout);
      dispatch(removeWorkout({ day, workout }));
    } catch (error) {
      console.error("Failed to remove workout:", error);
    }
  };

  const renderCardForDay = (day: string, workouts: string[]) => {
    const workoutList = workouts.length > 0 ? workouts.join(", ") : "No workouts for today";
    return (
      <Card
        key={day}
        title={`${day} Workouts`}
        description={workoutList}
        tabId={`card-${day}`}
        actionButton={{
          label: "Remove All",
          onClick: () => {
            workouts.forEach((workout) => removeWorkoutHandler(day, workout));
          },
        }}
      />
    );
  };

  return (
    <div className="planner-container">
      <h3 className="text-xl font-bold">Workout Planner</h3>

      <DaySelector selectedDay={selectedDay} onChange={setSelectedDay} days={daysOfWeek} />

      <InputBox label="Add Workout" placeholder="e.g., Squats" value={newWorkout} onChange={setNewWorkout} />
      <InputBox label="Sets" placeholder="e.g., 3" value={sets.toString()} type="number" onChange={(value) => setSets(Number(value))} />
      <InputBox label="Reps" placeholder="e.g., 12" value={reps.toString()} type="number" onChange={(value) => setReps(Number(value))} />
      <InputBox label="Weight (kg)" placeholder="e.g., 50" value={weight.toString()} type="number" onChange={(value) => setWeight(Number(value))} />

      <Button label="Add Workout" onClick={addWorkoutHandler} className="bg-blue-600 mt-4" />

      <div className="mt-6">
        <h4 className="text-lg font-bold">Workouts for {selectedDay}</h4>
        <div className="mt-4">
          {renderCardForDay(selectedDay, workouts[selectedDay] || [])}
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-lg font-bold">Workouts for the Week</h4>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {daysOfWeek.map((day) =>
            renderCardForDay(day, workouts[day] || [])
          )}
        </div>
      </div>
    </div>
  );
};

export default Planner;
