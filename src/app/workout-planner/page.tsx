"use client"

import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import {addWorkout,removeWorkout,updateWorkout,setWorkouts,} from "@/store/workoutsSlice";
import {fetchUserWorkouts,saveWorkout,removeWorkoutFromFirestore,updateWorkoutInFirestore,} from "../../firebase/firestore";
import { daysOfWeek } from "../utils/days";
import InputBox from "../components/InputBox";
import DaySelector from "../components/DaySelector";
import Button from "../components/Button";
import Card from "../components/Card";
import AuthCheck from "../components/AuthCheck";
import { v4 as uuidv4 } from "uuid";
import Modal from "../components/Modal"; 

const Planner = () => {
  const dispatch = useDispatch();
  const workouts = useSelector((state: RootState) => state.workouts);

  const [selectedDay, setSelectedDay] = useState<string>("Monday");
  const [newWorkout, setNewWorkout] = useState<string>("");
  const [sets, setSets] = useState<string>("");
  const [reps, setReps] = useState<string>("8-10");
  const [weight, setWeight] = useState<string | number>("");
  const [editingWorkout, setEditingWorkout] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState(false); 
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userId) {
      const loadWorkouts = async () => {
        try {
          const fetchedWorkouts = await fetchUserWorkouts(userId);
          if (fetchedWorkouts) {
            dispatch(setWorkouts(fetchedWorkouts));
          }
        } catch (error) {
          console.error("Failed to load workouts:", error);
        }
      };

      loadWorkouts();
    }
  }, [userId, dispatch]);

  const addOrUpdateWorkoutHandler = async () => {
    const repsPattern = /^\d+(-\d+)?$/;
    if (!repsPattern.test(reps)) {
      setModalMessage("Please enter reps as a single number (e.g., 8) or a range (e.g., 8-10).");
      setModalVisible(true);
      return;
    }

    const weightPattern = /^(\d+(\.\d+)?(kg|lbs)?)|([a-zA-Z\s]+)$/;
    if (!weightPattern.test(weight.toString())) {
      setModalMessage("Please enter weight as a number (e.g., 10kg, 10) or a text (e.g., pink band).");
      setModalVisible(true);
      return;
    }

    if (selectedDay && newWorkout.trim() && sets.trim()) {
      const workoutDetails = `${newWorkout.trim()} - Sets: ${sets}, Reps: ${reps}, Weight: ${weight}`;
      if (editingWorkout) {
        dispatch(updateWorkout({ day: selectedDay, oldWorkout: editingWorkout, newWorkout: workoutDetails }));
        if (userId) {
          await updateWorkoutInFirestore(userId, selectedDay, editingWorkout, workoutDetails);
        }
        setEditingWorkout(null);
      } else {
        dispatch(addWorkout({ day: selectedDay, workout: workoutDetails }));
        if (userId) {
          await saveWorkout(userId, selectedDay, workoutDetails);
        }
      }
      setNewWorkout("");
      setSets("");
      setReps("8");
      setWeight("");
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
    setSets(setsStr.trim());
    setReps(repsStr.trim());
    setWeight(weightStr.trim());
  };

  const removeWorkoutHandler = async (day: string, workout: string) => {
    if (userId) {
      try {
        await removeWorkoutFromFirestore(userId, day, workout);
        dispatch(removeWorkout({ day, workout }));
      } catch (error) {
        console.error("Failed to remove workout:", error);
      }
    }
  };

  const renderCardForDay = (day: string, workouts: string[], showActions: boolean = false) => (
    <Card
      key={`${day}-${uuidv4()}`}
      title={`${day} Workouts`}
      description={
        workouts.length > 0 ? (
          <ol className="space-y-3">
            {workouts.map((workout, index) => (
              <li
                key={`${day}-${workout}-${index}`}
                className="border border-gray-700 p-3 rounded-md bg-gray-800 shadow-md flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <span className="text-green-400 font-bold">{index + 1}.</span>
                  <span className="text-white">{workout}</span>
                </div>
                {showActions && (
                  <div className="flex gap-2">
                    <Button label="Edit" className="text-blue-200" onClick={() => startEditingWorkout(workout)} />
                    <Button label="Remove" className="text-red-300" onClick={() => removeWorkoutHandler(day, workout)} />
                  </div>
                )}
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-center text-gray-400">No workouts for today</p>
        )
      }
      textColor="text-white"
    />
  );
  

  const closeModal = () => {
    setModalVisible(false);
    setModalMessage(""); 
  };

  return (
    <AuthCheck
      authLoading={authLoading}
      userId={userId}
      loading={false}
      onRedirect={() => (window.location.href = "/profile")}
      message="Sign in to save your workouts."
    >
        <div className="mb-24 p-4 bg-black bg-opacity-30 rounded">
        <div className="mb-3 bg-transparent-20 backdrop-blur-md rounded text-center p-4 shadow-lg">
          <h3 className="text-xl font-bold uppercase text-green-400 drop-shadow-md">
            Workout Planner
          </h3>
          <h4 className="drop-shadow-sm">
            Plan your weekly workout and keep track for progressive overload
          </h4>
        </div>
        <DaySelector selectedDay={selectedDay} onChange={setSelectedDay} days={daysOfWeek} />
        <InputBox label="Workout Name" placeholder="e.g., Squats" value={newWorkout} onChange={setNewWorkout} />
        <InputBox label="Sets" placeholder="e.g., 3" value={sets} type="text" onChange={setSets} />
        <InputBox label="Reps" placeholder="e.g., 8 or 8-10" value={reps} type="text" onChange={setReps} />
        <InputBox label="Weight" placeholder="e.g., 10kg or band" value={weight.toString()} type="text" onChange={setWeight} />
        <Button
          label={editingWorkout ? "Update Workout" : "Add Workout"}
          onClick={addOrUpdateWorkoutHandler}
          className="bg-green-400 mt-4"
        />
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
      
      <Modal message={modalMessage} onClose={closeModal} visible={modalVisible} />
    </AuthCheck>
  );
};

export default Planner;
