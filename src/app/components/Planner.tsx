import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { addWorkout, removeWorkout, setWorkouts } from "@/store/workoutsSlice";
import { fetchUserWorkouts, saveWorkout } from "../../firebase/firestore";
import InputBox from "./InputBox";

interface WorkoutDetail {
  workout: string;
  sets: number;
  reps: number;
  weight: number;
}

const Planner: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>("Monday");
  const [newWorkout, setNewWorkout] = useState<string>("");
  const [sets, setSets] = useState<number>(0);
  const [reps, setReps] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null); 

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const workouts = useSelector((state: RootState) => state.workouts);

  useEffect(() => {
    const loadWorkouts = async () => {
      if (user) {
        try {
          setLoading(true);
          const fetchedWorkouts = await fetchUserWorkouts(user.uid);
          if (fetchedWorkouts) {
            dispatch(setWorkouts(fetchedWorkouts));
          }
        } catch (error) {
          console.error("Failed to load workouts:", error);
          setError("Failed to load workouts.");
        } finally {
          setLoading(false);
        }
      }
    };
    loadWorkouts();
  }, [user, dispatch]);

  const addWorkoutHandler = async () => {
    if (newWorkout.trim() && sets > 0 && reps > 0 && weight > 0) {
      const workoutDetail: WorkoutDetail = {
        workout: newWorkout.trim(),
        sets,
        reps,
        weight,
      };

      const existingWorkout = workouts[selectedDay]?.some(
        (workout) => workout.workout === workoutDetail.workout
      );
      if (existingWorkout) {
        setError("This workout is already added for today.");
        return;
      }

      try {
        setLoading(true);
        dispatch(addWorkout({ day: selectedDay, workout: workoutDetail }));
        if (user) {
          await saveWorkout(user.uid, selectedDay, workoutDetail);
        }
        setNewWorkout("");
        setSets(0);
        setReps(0);
        setWeight(0);
      } catch (error) {
        setError("Failed to add workout.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please fill in all workout details.");
    }
  };

  const removeWorkoutHandler = (workout: string) => {
    dispatch(removeWorkout({ day: selectedDay, workout }));
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold">Workouts for {selectedDay}</h3>
      <select
        value={selectedDay}
        onChange={(e) => setSelectedDay(e.target.value)}
        className="p-2 border rounded bg-gray-800 text-white"
      >
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>

      <InputBox
        label="Add Workout"
        placeholder="e.g., Squats"
        value={newWorkout}
        onChange={setNewWorkout}
      />

      <div className="mt-2">
        <InputBox
          label="Sets"
          type="number"
          value={sets.toString()}
          onChange={(value) => setSets(Number(value))}
          placeholder="e.g., 3"
        />
      </div>

      <div className="mt-2">
        <InputBox
          label="Reps"
          type="number"
          value={reps.toString()}
          onChange={(value) => setReps(Number(value))}
          placeholder="e.g., 10"
        />
      </div>

      <div className="mt-2">
        <InputBox
          label="Weight (kg)"
          type="number"
          value={weight.toString()}
          onChange={(value) => setWeight(Number(value))}
          placeholder="e.g., 50"
        />
      </div>

      <button
        onClick={addWorkoutHandler}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Workout"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>} 

      <div className="mt-6 border">
        <h4 className="text-lg font-bold">Workouts for {selectedDay}</h4>
        {workouts[selectedDay]?.length > 0 ? (
          <ul className="list-disc list-inside mt-4">
            {workouts[selectedDay].map((workout, index) => (
              <li key={index} className="list-disc list-inside">
                <span>{workout.workout} - {workout.sets} sets x {workout.reps} reps - {workout.weight}kg</span>
                <button
                  onClick={() => removeWorkoutHandler(workout.workout)}
                  className="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-400"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No workouts planned for {selectedDay}.</p>
        )}
      </div>

      <div className="mt-6 border">
        <h4 className="text-lg font-bold">Workouts for the Week</h4>
        {Object.keys(workouts).map((day) => (
          <div key={day}>
            <h5 className="text-md font-semibold">{day}</h5>
            {workouts[day]?.length > 0 ? (
              <ul className="list-disc list-inside mt-2">
                {workouts[day].map((workout, index) => (
                  <li key={index}>
                    {workout.workout} - {workout.sets} sets x {workout.reps} reps - {workout.weight}kg
                  </li>
                ))}
              </ul>
            ) : (
              <p>No workouts planned for {day}.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Planner;
