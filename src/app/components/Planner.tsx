import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { addWorkout, removeWorkout, setWorkouts } from "@/store/workoutsSlice";
import { fetchUserWorkouts, saveWorkout } from "../../firebase/firestore";
import InputBox from "./InputBox";

const Planner: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>("Monday");
  const [newWorkout, setNewWorkout] = useState<string>("");
  const [sets, setSets] = useState<number>(1);
  const [reps, setReps] = useState<number>(10);

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
      const workoutDetails = `${newWorkout.trim()} - Sets: ${sets}, Reps: ${reps}`;
      dispatch(addWorkout({ day: selectedDay, workout: workoutDetails }));

      if (user) {
        await saveWorkout(user.uid, selectedDay, workoutDetails);
      }

      setNewWorkout("");
      setSets(1);  
      setReps(10);
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
        <label htmlFor="sets" className="block text-sm font-semibold">Sets</label>
        <input
          type="number"
          id="sets"
          value={sets}
          onChange={(e) => setSets(Number(e.target.value))}
          min="1"
          className="w-16 p-2 border rounded bg-gray-800 text-white"
        />
      </div>

      <div className="mt-2">
        <label htmlFor="reps" className="block text-sm font-semibold">Reps</label>
        <input
          type="number"
          id="reps"
          value={reps}
          onChange={(e) => setReps(Number(e.target.value))}
          min="1"
          className="w-16 p-2 border rounded bg-gray-800 text-white"
        />
      </div>

      <button
        onClick={addWorkoutHandler}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
      >
        Add Workout
      </button>

      <div className="mt-6 border">
        <h4 className="text-lg font-bold">Workouts for {selectedDay}</h4>
        {workouts[selectedDay]?.length > 0 ? (
          <ul className="list-disc list-inside mt-4">
            {workouts[selectedDay].map((workout, index) => (
              <li key={index} className="list-disc list-inside">
                <span>{workout}</span>
                <button
                  onClick={() => removeWorkoutHandler(workout)}
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
                  <li key={index}>{workout}</li>
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
