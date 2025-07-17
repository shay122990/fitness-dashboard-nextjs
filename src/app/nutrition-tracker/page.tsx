"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import {
  addCalories,
  clearCalories,
  setNutritionData,
  updateCalories,
  removeCalories,
} from "../../store/nutritionSlice";
import {
  saveCalorieEntry,
  updateCaloriesInFirestore,
  fetchCalorieEntries,
  clearCaloriesFromFirestore,
  removeCalorieEntry,
} from "../../firebase/firestore";
import { RootState } from "../../store/store";
import { daysOfWeek } from "../utils/days";
import InputBox from "../components/InputBox";
import DaySelector from "../components/DaySelector";
import Button from "../components/Button";
import Card from "../components/Card";
import AuthCheck from "../components/AuthCheck";
import Modal from "../components/Modal";

const Nutrition = () => {
  const dispatch = useDispatch();
  const nutritionData = useSelector((state: RootState) => state.nutrition);
  const [eatenCalories, setEatenCalories] = useState<string>("");
  const [burnedCalories, setBurnedCalories] = useState<string>("");
  const [editingEntry, setEditingEntry] = useState<{
    type: "eaten" | "burned";
    oldCalories: string;
  } | null>(null);
  const [selectedDay, setSelectedDay] = useState<string>("Monday");
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user?.uid || null);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const loadCalories = async () => {
      if (userId) {
        const fetchedCalories = await fetchCalorieEntries(userId);
        if (fetchedCalories) {
          dispatch(setNutritionData(fetchedCalories));
        }
      }
    };
    loadCalories();
  }, [userId, dispatch]);

  const handleAddOrUpdateCalories = async (
    type: "eaten" | "burned",
    value: string
  ) => {
    if (selectedDay && value.trim() && userId) {
      const calorieValue = value.trim();

      if (editingEntry && editingEntry.type === type) {
        dispatch(
          updateCalories({
            day: selectedDay,
            oldCalories: editingEntry.oldCalories,
            newCalories: calorieValue,
            type,
          })
        );

        try {
          await updateCaloriesInFirestore(
            userId,
            selectedDay,
            editingEntry.oldCalories,
            calorieValue,
            type
          );
        } catch (error) {
          console.error("Failed to update calorie entry:", error);
        }

        setEditingEntry(null);
      } else {
        dispatch(
          addCalories({ day: selectedDay, calories: calorieValue, type })
        );

        try {
          await saveCalorieEntry(userId, selectedDay, calorieValue, type);
        } catch (error) {
          console.error("Failed to save calorie entry:", error);
        }
      }

      if (type === "eaten") {
        setEatenCalories("");
      } else {
        setBurnedCalories("");
      }
    } else {
      setIsModalVisible(true);
    }
  };

  const startEditingEntry = (type: "eaten" | "burned", oldCalories: string) => {
    setEditingEntry({ type, oldCalories });

    if (type === "eaten") {
      setEatenCalories(oldCalories);
    } else {
      setBurnedCalories(oldCalories);
    }
  };

  const handleClearCalories = async (day: string) => {
    if (userId) {
      try {
        await clearCaloriesFromFirestore(userId, day);
        dispatch(clearCalories({ day }));
        console.log(`Calories cleared for ${day}`);
      } catch (error) {
        console.error("Failed to clear calories from Firestore:", error);
      }
    }
  };

  const handleRemoveCalorie = async (
    day: string,
    calories: string,
    type: "eaten" | "burned"
  ) => {
    if (!userId) return;

    try {
      await removeCalorieEntry(userId, day, calories, type);
      dispatch(removeCalories({ day, calories, type }));
    } catch (error) {
      console.error("Failed to remove calorie entry:", error);
    }
  };

  const renderSelectedDayCard = (
    day: string,
    data: { eaten: string[]; burned: string[] }
  ) => {
    const renderEntries = (entries: string[], type: "eaten" | "burned") => (
      <div className="space-y-2">
        {entries.length > 0 ? (
          entries.map((entry, index) => (
            <div
              key={`${entry}-${index}`}
              className="flex justify-between items-center bg-gray-800 p-2 rounded-md"
            >
              <span className="text-white">{entry} kcal</span>
              <div className="flex gap-2">
                <Button
                  className="text-blue-400"
                  onClick={() => startEditingEntry(type, entry)}
                  label="Edit"
                />
                <Button
                  className="text-red-300"
                  onClick={() => handleRemoveCalorie(day, entry, type)}
                  label="Remove"
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">None</p>
        )}
      </div>
    );

    return (
      <Card
        key={day}
        title={`${day} Entries`}
        className="rounded-lg max-h-96 overflow-y-auto custom-scrollbar"
        description={
          <div className="space-y-4">
            <div>
              <span className="text-green-300 font-semibold">
                Eaten Calories
              </span>
              {renderEntries(data.eaten, "eaten")}
            </div>
            <div>
              <span className="text-red-300 font-semibold">
                Burned Calories
              </span>
              {renderEntries(data.burned, "burned")}
            </div>
          </div>
        }
        textColor="text-white"
      >
        <Button
          label="Clear All"
          onClick={() => handleClearCalories(day)}
          className="bg-gradient-to-br from-gray-950  to-gray-800 text-red-500 shadow-sm shadow-red-500/50"
        />
      </Card>
    );
  };

  const renderWeekCards = () => {
    return Object.entries(nutritionData).map(([day, data]) => (
      <Card
        key={day}
        title={`${day} Entries`}
        className="rounded-lg max-h-96 overflow-y-auto custom-scrollbar"
        description={
          <div className="space-y-4">
            <div>
              <span className="text-green-300 font-semibold">
                Eaten Calories
              </span>
              <div className="space-y-2">
                {data.eaten.length > 0 ? (
                  data.eaten.map((entry, index) => (
                    <div
                      key={`eaten-${index}-${entry}`}
                      className="flex justify-between items-center bg-gray-800 p-2 rounded-md"
                    >
                      <span className="text-white">{entry} kcal</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">None</p>
                )}
              </div>
            </div>
            <div>
              <span className="text-red-300 font-semibold">
                Burned Calories
              </span>
              <div className="space-y-2">
                {data.burned.length > 0 ? (
                  data.burned.map((entry, index) => (
                    <div
                      key={`eaten-${index}-${entry}`}
                      className="flex justify-between items-center bg-gray-800 p-2 rounded-md"
                    >
                      <span className="text-white">{entry} kcal</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">None</p>
                )}
              </div>
            </div>
          </div>
        }
        textColor="text-white"
      />
    ));
  };
  const totalEaten = Object.values(nutritionData)
    .flatMap((entry) => entry.eaten)
    .reduce((acc, curr) => acc + parseInt(curr), 0);

  const totalBurned = Object.values(nutritionData)
    .flatMap((entry) => entry.burned)
    .reduce((acc, curr) => acc + parseInt(curr), 0);

  const netCalories = totalEaten - totalBurned;

  return (
    <AuthCheck
      authLoading={authLoading}
      userId={userId}
      loading={false}
      onRedirect={() => (window.location.href = "/profile")}
      message="Sign in to track your calories"
    >
      <div className="mb-24 p-4 bg-black bg-opacity-30 rounded">
        <div className="mb-3 bg-transparent-20 backdrop-blur-md rounded text-center p-4 shadow-lg">
          <h1 className="text-xl font-bold uppercase text-green-400 drop-shadow-md">
            Nutrition Tracker
          </h1>
          <h2 className="drop-shadow-sm">
            Keep track of your daily calorie intake or calories burned through
            workout.
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row justify-between gap-5">
          <div className="lg:w-2/4">
            <DaySelector
              selectedDay={selectedDay}
              onChange={setSelectedDay}
              days={daysOfWeek}
            />

            <InputBox
              label="Calories Eaten"
              placeholder={
                editingEntry?.type === "eaten"
                  ? "Update eaten calories"
                  : "Enter eaten calories"
              }
              value={eatenCalories}
              onChange={setEatenCalories}
            />
            <Button
              label={
                editingEntry?.type === "eaten"
                  ? "Update Eaten Calories"
                  : "Add Eaten Calories"
              }
              onClick={() => handleAddOrUpdateCalories("eaten", eatenCalories)}
              className="mt-2 mb-4 bg-gradient-to-br from-gray-950  to-gray-800 text-green-400 shadow-md shadow-green-900/50"
            />

            <InputBox
              label="Calories Burned"
              placeholder={
                editingEntry?.type === "burned"
                  ? "Update burned calories"
                  : "Enter burned calories"
              }
              value={burnedCalories}
              onChange={setBurnedCalories}
            />
            <Button
              label={
                editingEntry?.type === "burned"
                  ? "Update Burned Calories"
                  : "Add Burned Calories"
              }
              onClick={() =>
                handleAddOrUpdateCalories("burned", burnedCalories)
              }
              className="mt-2 bg-gradient-to-br from-gray-950  to-gray-800 text-orange-500 shadow-md shadow-orange-500/50"
            />
          </div>

          <div className="w-full lg:w-1/2">
            <h3 className="text-green-400 uppercase bg-gray-900 text-center p-6 rounded mb-2">
              Entries for {selectedDay}
            </h3>
            <div>
              {nutritionData[selectedDay] &&
                renderSelectedDayCard(selectedDay, nutritionData[selectedDay])}
            </div>
          </div>
        </div>

        <h3 className="mt-2 text-green-400 uppercase bg-gray-900 text-center p-6 rounded mb-2">
          Entries for the Week
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {renderWeekCards()}
        </div>
      </div>
      <div className="mt-6 bg-gray-900 p-6 rounded shadow-lg text-center">
        <h3 className="text-xl font-bold text-white mb-4">Weekly Summary</h3>
        <div className="flex flex-col sm:flex-row justify-around text-white gap-4">
          <div className="text-green-400 font-semibold">
            Total Eaten: {totalEaten} kcal
          </div>
          <div className="text-red-400 font-semibold">
            Total Burned: {totalBurned} kcal
          </div>
          <div className="text-yellow-400 font-semibold">
            Net Calories: {netCalories} kcal
          </div>
        </div>
      </div>

      <Modal
        message="Please enter a valid calorie number."
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </AuthCheck>
  );
};

export default Nutrition;
