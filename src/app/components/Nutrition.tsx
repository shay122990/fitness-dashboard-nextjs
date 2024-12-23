import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCalories, removeCalories, setNutritionData } from "../../store/nutritionSlice";
import { saveCalorieEntry, fetchCalorieEntries, removeCalorieEntry } from "../../firebase/firestore";
import { RootState } from "../../store/index";
import InputBox from "../components/InputBox";
import DaySelector from "../components/DaySelector";
import ListWithRemove from "../components/ListWithRemove";

const Nutrition = () => {
  const dispatch = useDispatch();
  const nutritionData = useSelector((state: RootState) => state.nutrition);
  const [calories, setCalories] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("Monday");
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const loadCalories = async () => {
      if (user) {
        const fetchedCalories = await fetchCalorieEntries(user.uid);
        if (fetchedCalories) {
          dispatch(setNutritionData(fetchedCalories));
        }
      }
    };

    loadCalories();
  }, [user, dispatch]);

  const handleAddCalories = async (type: "eaten" | "burned") => {
    if (selectedDay && calories.trim() && user) {
      const calorieValue = calories.trim();
      dispatch(addCalories({ day: selectedDay, calories: calorieValue, type }));
      setCalories("");

      try {
        await saveCalorieEntry(user.uid, selectedDay, calorieValue, type);
      } catch (error) {
        console.error("Failed to save calorie entry:", error);
      }
    }
  };

  const handleRemoveCalories = async (calorie: string, type: "eaten" | "burned") => {
    if (user) {
      dispatch(removeCalories({ day: selectedDay, calories: calorie, type }));

      try {
        await removeCalorieEntry(user.uid, selectedDay, calorie, type);
      } catch (error) {
        console.error("Failed to remove calorie entry:", error);
      }
    }
  };

  return (
    <div className="nutrition-container">
      <DaySelector
        selectedDay={selectedDay}
        onChange={setSelectedDay}
        days={Object.keys(nutritionData)}
      />
      <InputBox
        label="Calories"
        placeholder="Enter calories"
        value={calories}
        onChange={setCalories}
      />
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => handleAddCalories("eaten")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400"
        >
          Add Eaten Calories
        </button>
        <button
          onClick={() => handleAddCalories("burned")}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400"
        >
          Add Burned Calories
        </button>
      </div>
      <ListWithRemove
        title={`Eaten Calories for ${selectedDay}`}
        items={nutritionData[selectedDay]?.eaten || []}
        onRemove={(item) => handleRemoveCalories(item, "eaten")}
      />
      <ListWithRemove
        title={`Burned Calories for ${selectedDay}`}
        items={nutritionData[selectedDay]?.burned || []}
        onRemove={(item) => handleRemoveCalories(item, "burned")}
      />
    </div>
  );
};

export default Nutrition;
