import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCalories, removeCalories, setNutritionData } from "../../store/nutritionSlice";
import { saveCalorieEntry, fetchCalorieEntries, removeCalorieEntry } from "../../firebase/firestore";
import { RootState } from "../../store/index";

const Nutrition = () => {
  const dispatch = useDispatch();
  const nutritionData = useSelector((state: RootState) => state.nutrition);
  const [calories, setCalories] = useState("");
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
      <div className="day-selector">
        <label htmlFor="day">Select Day: </label>
        <select
          id="day"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        >
          {Object.keys(nutritionData).map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>

      <div className="input-calories">
        <input
          type="text"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          placeholder="Enter calories"
        />
        <button onClick={() => handleAddCalories("eaten")}>Add Eaten Calories</button>
        <button onClick={() => handleAddCalories("burned")}>Add Burned Calories</button>
      </div>

      <div className="mt-6 border">
        <h4 className="text-lg font-bold">Eaten Calories for {selectedDay}</h4>
        {nutritionData[selectedDay]?.eaten.length > 0 ? (
          <ul className="list-disc list-inside mt-4">
            {nutritionData[selectedDay].eaten.map((calorie, index) => (
              <li key={index} className="flex items-center justify-between">
                <span>{calorie} kcal</span>
                <button
                  onClick={() => handleRemoveCalories(calorie, "eaten")}
                  className="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-400"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No calories eaten logged for {selectedDay}.</p>
        )}
      </div>

      <div className="mt-6 border">
        <h4 className="text-lg font-bold">Burned Calories for {selectedDay}</h4>
        {nutritionData[selectedDay]?.burned.length > 0 ? (
          <ul className="list-disc list-inside mt-4">
            {nutritionData[selectedDay].burned.map((calorie, index) => (
              <li key={index} className="flex items-center justify-between">
                <span>{calorie} kcal</span>
                <button
                  onClick={() => handleRemoveCalories(calorie, "burned")}
                  className="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-400"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No calories burned logged for {selectedDay}.</p>
        )}
      </div>
    </div>
  );
};

export default Nutrition;
