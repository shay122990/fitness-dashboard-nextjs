import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import InputBox from "./InputBox";
import { fetchUserWorkouts } from "../../firebase/firestore";
import { RootState } from "@/store";

const Planner: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>("Monday");
  const [workouts, setWorkouts] = useState<{ [key: string]: string[] }>({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });
  const [newWorkout, setNewWorkout] = useState<string>("");

  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const loadWorkouts = async () => {
      if (user) {
        const fetchedWorkouts = await fetchUserWorkouts(user.uid);
        if (fetchedWorkouts) {
          setWorkouts(fetchedWorkouts);
        }
      }
    };
    loadWorkouts();
  }, [user]);

  const addWorkout = () => {
    if (selectedDay && newWorkout.trim()) {
      setWorkouts((prevWorkouts) => ({
        ...prevWorkouts,
        [selectedDay]: [
          ...(prevWorkouts[selectedDay] || []), 
          newWorkout.trim(),
        ],
      }));
      setNewWorkout("");
    }
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

      <button
        onClick={addWorkout}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
      >
        Add Workout
      </button>

      <div className="mt-6 border">
        <h4 className="text-lg font-bold">Workouts for {selectedDay}</h4>
        {workouts[selectedDay]?.length > 0 ? (
          <ul className="list-disc list-inside mt-4">
            {workouts[selectedDay].map((workout, index) => (
              <li key={index}>{workout}</li>
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
