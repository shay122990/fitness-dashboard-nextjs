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
} from "../../store/nutritionSlice";
import {
  saveCalorieEntry,
  updateCaloriesInFirestore,
  fetchCalorieEntries,
  clearCaloriesFromFirestore,
} from "../../firebase/firestore";
import { RootState } from "../../store/index";
import { daysOfWeek } from "../utils/days";
import InputBox from "../components/InputBox";
import DaySelector from "../components/DaySelector";
import Button from "../components/Button";
import Card from "../components/Card";
import AuthCheck from "../components/AuthCheck";

const Nutrition = () => {
  const dispatch = useDispatch();
  const nutritionData = useSelector((state: RootState) => state.nutrition);
  const [calories, setCalories] = useState<string>("");
  const [editingEntry, setEditingEntry] = useState<{
    type: "eaten" | "burned";
    oldCalories: string;
  } | null>(null);
  const [selectedDay, setSelectedDay] = useState<string>("Monday");
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);

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

  const handleAddOrUpdateCalories = async (type: "eaten" | "burned") => {
    if (selectedDay && calories.trim() && userId) {
      const calorieValue = calories.trim();

      if (editingEntry) {
        dispatch(
          updateCalories({
            day: selectedDay,
            oldCalories: editingEntry.oldCalories,
            newCalories: calorieValue,
            type: editingEntry.type,
          })
        );

        try {
          await updateCaloriesInFirestore(
            userId,
            selectedDay,
            editingEntry.oldCalories,
            calorieValue,
            editingEntry.type
          );
        } catch (error) {
          console.error("Failed to update calorie entry:", error);
        }

        setEditingEntry(null);
      } else {
        dispatch(addCalories({ day: selectedDay, calories: calorieValue, type }));

        try {
          await saveCalorieEntry(userId, selectedDay, calorieValue, type);
        } catch (error) {
          console.error("Failed to save calorie entry:", error);
        }
      }

      setCalories("");
    }
  };

  const startEditingEntry = (type: "eaten" | "burned", oldCalories: string) => {
    setEditingEntry({ type, oldCalories });
    setCalories(oldCalories);
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

  const renderSelectedDayCard = (day: string, data: { eaten: string[]; burned: string[] }) => {
    const renderEntries = (entries: string[], type: "eaten" | "burned") =>
      entries.map((entry) => (
        <div key={entry} className="flex justify-between items-center">
          <span>{entry}</span>
          <Button
            className="text-blue-500 ml-2"
            onClick={() => startEditingEntry(type, entry)}
            label="Edit"
          />
        </div>
      ));

      return (
        <Card
          key={day}
          title={`${day} Entries`}
          description={
            <>
              <div>Eaten: {data.eaten.length > 0 ? renderEntries(data.eaten, "eaten") : "None"}</div>
              <div>Burned: {data.burned.length > 0 ? renderEntries(data.burned, "burned") : "None"}</div>
            </>
          }
          textColor="text-white"
        >
          <Button
            label="Clear All"
            onClick={() => handleClearCalories(day)}
            className="bg-red-400 mt-2"
          />
        </Card>
      );
      
  };

  const renderWeekCards = () => {
    return Object.entries(nutritionData).map(([day, data]) => (
      <Card
        key={day}
        title={`${day} Entries`}
        description={`Eaten: ${data.eaten.join(", ") || "None"} | Burned: ${data.burned.join(", ") || "None"}`}
      />
    ));
  };

  return (
    <AuthCheck
      authLoading={authLoading}
      userId={userId}
      loading={false}
      onRedirect={() => (window.location.href = "/profile")}
      message="Sign in to track your calories"
    >
      <div className="nutrition-container">
        <DaySelector selectedDay={selectedDay} onChange={setSelectedDay} days={daysOfWeek} />
        <InputBox
          label="Calories"
          placeholder={editingEntry ? "Update calories" : "Enter calories"}
          value={calories}
          onChange={setCalories}
        />
        <div className="flex gap-2 mt-2">
          <Button
            label={editingEntry ? "Update Eaten Calories" : "Add Eaten Calories"}
            onClick={() => handleAddOrUpdateCalories("eaten")}
            className="bg-green-400"
          />
          <Button
            label={editingEntry ? "Update Burned Calories" : "Add Burned Calories"}
            onClick={() => handleAddOrUpdateCalories("burned")}
            className="bg-orange-500"
          />
        </div>

        <h2 className="mt-4">Entries for {selectedDay}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nutritionData[selectedDay] && renderSelectedDayCard(selectedDay, nutritionData[selectedDay])}
        </div>

        <h2 className="mt-6">Entries for the Week</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {renderWeekCards()}
        </div>
      </div>
    </AuthCheck>
  );
};

export default Nutrition;