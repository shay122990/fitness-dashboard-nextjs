import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCalories, removeCalories, setNutritionData } from "../../store/nutritionSlice";
import { saveCalorieEntry, fetchCalorieEntries, removeCalorieEntry } from "../../firebase/firestore";
import { RootState } from "../../store/index";
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
      <InputBox label="Calories" placeholder="Enter calories" value={calories} onChange={setCalories} />
      <div className="flex gap-2 mt-2">
        <Button label="Add Eaten Calories" onClick={() => handleAddCalories("eaten")} className="bg-green-500" />
        <Button label="Add Burned Calories" onClick={() => handleAddCalories("burned")} className="bg-red-500" />
      </div>
      {nutritionData[selectedDay]?.eaten.map((calorie, index) => (
        <Card
          key={index}
          title={`Eaten Calories`}
          description={calorie}
          tabId={`eaten-${index}`}
          actionButton={{
            label: "Remove",
            onClick: () => handleRemoveCalories(calorie, "eaten"),
          }}
        />
      ))}
      {nutritionData[selectedDay]?.burned.map((calorie, index) => (
        <Card
          key={index}
          title={`Burned Calories`}
          description={calorie}
          tabId={`burned-${index}`}
          actionButton={{
            label: "Remove",
            onClick: () => handleRemoveCalories(calorie, "burned"),
          }}
        />
      ))}
    </div>
  );
};

export default Nutrition;




  


