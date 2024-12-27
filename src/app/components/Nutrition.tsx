import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCalories, clearCalories, setNutritionData } from "../../store/nutritionSlice";
import { saveCalorieEntry, fetchCalorieEntries } from "../../firebase/firestore";
import { RootState } from "../../store/index";
import { daysOfWeek } from "../utils/days"; 
import InputBox from "../components/InputBox";
import DaySelector from "../components/DaySelector";
import Button from "../components/Button";
import Card from "../components/Card";

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

  const handleClearCalories = (day: string) => {
    dispatch(clearCalories({ day }));
  };

  const renderCardForDay = (day: string, data: { eaten: string[]; burned: string[] }) => {
    const eatenCalories = data.eaten.join(", ");
    const burnedCalories = data.burned.join(", ");
    return (
      <Card
        key={day}
        title={`${day} Entries`}
        description={`Eaten: ${eatenCalories || "None"} | Burned: ${burnedCalories || "None"}`}
        tabId={`card-${day}`}
        actionButton={{
          label: "Clear All",
          onClick: () => handleClearCalories(day),
        }}
      />
    );
  };

  return (
    <div className="nutrition-container">
      <DaySelector selectedDay={selectedDay} onChange={setSelectedDay} days={daysOfWeek} />
      <InputBox label="Calories" placeholder="Enter calories" value={calories} onChange={setCalories} />
      <div className="flex gap-2 mt-2">
        <Button label="Add Eaten Calories" onClick={() => handleAddCalories("eaten")} className="bg-green-500" />
        <Button label="Add Burned Calories" onClick={() => handleAddCalories("burned")} className="bg-red-500" />
      </div>

      <h2 className="mt-4">Entries for {selectedDay}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {nutritionData[selectedDay] && renderCardForDay(selectedDay, nutritionData[selectedDay])}
      </div>

      <h2 className="mt-6">Entries for the Week</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(nutritionData).map(([day, data]) => renderCardForDay(day, data))}
      </div>
    </div>
  );
};

export default Nutrition;