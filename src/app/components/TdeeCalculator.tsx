'use client';
import { useState } from 'react';
import InputBox from './InputBox';
import Button from './Button';
import Card from './Card';

const TdeeCalculator = () => {
  const [age, setAge] = useState<number>(25);
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(175);
  const [gender, setGender] = useState<string>('male');
  const [activityLevel, setActivityLevel] = useState<number>(1.2);
  const [tdee, setTdee] = useState<number | null>(null);
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmr, setBmr] = useState<number | null>(null);
  const [macros, setMacros] = useState<{ protein: number; carbs: number; fat: number } | null>(null);

  const calculateTdee = () => {
    const bmrValue =
      gender === 'male'
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;

    const tdeeValue = bmrValue * activityLevel;
    const bmiValue = weight / ((height / 100) * (height / 100));

    const protein = (tdeeValue * 0.3) / 4;
    const carbs = (tdeeValue * 0.4) / 4;
    const fat = (tdeeValue * 0.3) / 9;

    setBmr(bmrValue);
    setTdee(tdeeValue);
    setBmi(bmiValue);
    setMacros({ protein, carbs, fat });
  };

  return (
    <Card
      title="TDEE & Calorie Calculator"
      description="Calculate your Total Daily Energy Expenditure and macronutrient breakdown."
      className="p-6 w-full max-w-md text-center text-sm"
    >
      <InputBox label="Age" placeholder="Enter your age" value={age.toString()} onChange={(val) => setAge(Number(val))} type="number" />
      <InputBox label="Weight (kg)" placeholder="Enter your weight" value={weight.toString()} onChange={(val) => setWeight(Number(val))} type="number" />
      <InputBox label="Height (cm)" placeholder="Enter your height" value={height.toString()} onChange={(val) => setHeight(Number(val))} type="number" />

      <div className="mb-4">
        <label className="block mb-2">Gender</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full p-2 border rounded">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Activity Level</label>
        <select value={activityLevel} onChange={(e) => setActivityLevel(Number(e.target.value))} className="w-full p-2 border rounded">
          <option value={1.2}>Sedentary (little or no exercise)</option>
          <option value={1.375}>Lightly active (light exercise 1-3 days/week)</option>
          <option value={1.55}>Moderately active (moderate exercise 3-5 days/week)</option>
          <option value={1.725}>Very active (hard exercise 6-7 days a week)</option>
          <option value={1.9}>Super active (very hard exercise or a physical job)</option>
        </select>
      </div>

      <Button label="Calculate" onClick={calculateTdee} />

      {tdee && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-2">Your Results</h3>
          <p><strong>BMR (Basal Metabolic Rate):</strong> {bmr?.toFixed(2)} kcal/day</p>
          <p><strong>TDEE (Total Daily Energy Expenditure):</strong> {tdee?.toFixed(2)} kcal/day</p>
          <p><strong>BMI (Body Mass Index):</strong> {bmi?.toFixed(2)}</p>
          <div className="mt-4">
            <h4 className="text-lg font-semibold">Macronutrients</h4>
            <p><strong>Protein:</strong> {macros?.protein.toFixed(2)} grams</p>
            <p><strong>Carbs:</strong> {macros?.carbs.toFixed(2)} grams</p>
            <p><strong>Fat:</strong> {macros?.fat.toFixed(2)} grams</p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default TdeeCalculator;