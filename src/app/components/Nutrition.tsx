import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import InputBox from "./InputBox";
import { saveCalories, fetchUserCalories } from "../../firebase/firestore";
import { RootState } from "@/store";
import { addCalories, removeCalories, setNutritionData } from "@/store/nutritionSlice";

const Nutrition: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const nutritionData = useSelector((state: RootState) => state.nutrition);
  const dispatch = useDispatch();

  const [selectedDay, setSelectedDay] = useState<string>("Monday");
  const [calories, setCalories] = useState<string>("");

  useEffect(() => {
    const fetchNutritionData = async () => {
      if (user) {
        const data = await fetchUserCalories(user.uid);
        if (data) {
          dispatch(setNutritionData(data));
        }
      }
    };
    fetchNutritionData();
  }, [user, dispatch]);

  const handleAddCalories = async () => {
    if (selectedDay && calories.trim()) {
      dispatch(addCalories({ day: selectedDay, calories: calories.trim() }));
      if (user) {
        await saveCalories(user.uid, selectedDay, calories.trim());
      }
      setCalories("");
    }
  };

  const handleRemoveCalories = (calorie: string) => {
    dispatch(removeCalories({ day: selectedDay, calories: calorie }));
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold">Calories for {selectedDay}</h3>

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
        label="Enter Calories"
        placeholder="e.g., 500"
        value={calories}
        onChange={setCalories}
      />

      <button
        onClick={handleAddCalories}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
      >
        Add Calories
      </button>

      <div className="mt-6 border">
        <h4 className="text-lg font-bold">Calories for {selectedDay}</h4>
        {nutritionData[selectedDay]?.length > 0 ? (
          <ul className="list-disc list-inside mt-4">
            {nutritionData[selectedDay].map((calorie, index) => (
              <li key={index} className="flex items-center justify-between">
                <span>{calorie} kcal</span>
                <button
                  onClick={() => handleRemoveCalories(calorie)}
                  className="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-400"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No calories logged for {selectedDay}.</p>
        )}
      </div>

      <div className="mt-6 border">
        <h4 className="text-lg font-bold">Calories for the Week</h4>
        {Object.keys(nutritionData).map((day) => (
          <div key={day}>
            <h5 className="text-md font-semibold">{day}</h5>
            {nutritionData[day]?.length > 0 ? (
              <ul className="list-disc list-inside mt-2">
                {nutritionData[day].map((calorie, index) => (
                  <li key={index}>{calorie} kcal</li>
                ))}
              </ul>
            ) : (
              <p>No calories logged for {day}.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nutrition;
