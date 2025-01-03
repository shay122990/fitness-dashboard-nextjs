import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { addWorkout, removeWorkout, updateWorkout, setWorkouts } from "@/store/workoutsSlice";
import { fetchUserWorkouts, saveWorkout, removeWorkoutFromFirestore, updateWorkoutInFirestore } from "../../firebase/firestore";
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
  const [editingWorkout, setEditingWorkout] = useState<string | null>(null);

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

  const addOrUpdateWorkoutHandler = async () => {
    if (selectedDay && newWorkout.trim() && sets > 0 && reps > 0) {
      const workoutDetails = `${newWorkout.trim()} - Sets: ${sets}, Reps: ${reps}, Weight: ${weight} kg`;

      if (editingWorkout) {
        dispatch(
          updateWorkout({
            day: selectedDay,
            oldWorkout: editingWorkout,
            newWorkout: workoutDetails,
          })
        );

        if (user) {
          await updateWorkoutInFirestore(user.uid, selectedDay, editingWorkout, workoutDetails);
        }

        setEditingWorkout(null);
      } else {
        // Add new workout
        dispatch(addWorkout({ day: selectedDay, workout: workoutDetails }));

        if (user) {
          await saveWorkout(user.uid, selectedDay, workoutDetails);
        }
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

  const startEditingWorkout = (workout: string) => {
    setEditingWorkout(workout);
    const [name, details] = workout.split(" - ");
    setNewWorkout(name);
    const [setsStr, repsStr, weightStr] = details
      .replace("Sets: ", "")
      .replace("Reps: ", "")
      .replace("Weight: ", "")
      .split(", ");
    setSets(parseInt(setsStr));
    setReps(parseInt(repsStr));
    setWeight(parseInt(weightStr.replace(" kg", "")));
  };

  const renderCardForDay = (day: string, workouts: string[], showActions: boolean = false) => (
    <Card
      key={day}
      title={`${day} Workouts`}
      description={
        workouts.length > 0
          ? workouts.map((workout) => (
              <div key={workout} className="flex justify-between items-center">
                <span>{workout}</span>
                {showActions && (
                  <div>
                    <button
                      className="text-blue-500 mr-2"
                      onClick={() => startEditingWorkout(workout)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => removeWorkoutHandler(day, workout)}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ))
          : "No workouts for today"
      }
      tabId={`tab-${day}`}
    />
  );

  return (
    <div className="planner-container">
      <h3 className="text-xl font-bold">Workout Planner</h3>

      <DaySelector selectedDay={selectedDay} onChange={setSelectedDay} days={daysOfWeek} />

      <InputBox label="Workout Name" placeholder="e.g., Squats" value={newWorkout} onChange={setNewWorkout} />
      <InputBox label="Sets" placeholder="e.g., 3" value={sets.toString()} type="number" onChange={(value) => setSets(Number(value))} />
      <InputBox label="Reps" placeholder="e.g., 12" value={reps.toString()} type="number" onChange={(value) => setReps(Number(value))} />
      <InputBox label="Weight (kg)" placeholder="e.g., 50" value={weight.toString()} type="number" onChange={(value) => setWeight(Number(value))} />

      <Button label={editingWorkout ? "Update Workout" : "Add Workout"} onClick={addOrUpdateWorkoutHandler} className="bg-blue-600 mt-4" />

      <div className="mt-6">
        <h4 className="text-lg font-bold">Workouts for {selectedDay}</h4>
        <div className="mt-4">{renderCardForDay(selectedDay, workouts[selectedDay] || [], true)}</div>
      </div>

      <div className="mt-6">
        <h4 className="text-lg font-bold">Workouts for the Week</h4>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {daysOfWeek.map((day) => renderCardForDay(day, workouts[day] || []))}
        </div>
      </div>
    </div>
  );
};

export default Planner;