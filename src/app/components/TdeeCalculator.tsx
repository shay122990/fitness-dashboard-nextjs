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
    <div className="flex flex-col md:flex-row items-stretch w-full rounded-lg overflow-hidden gap-6 text-white shadow-lg">
      <Card className="p-6 w-full flex-1 text-sm  rounded-lg shadow-md" title="TDEE & Calorie Calculator" description="Calculate your Total Daily Energy Expenditure and macronutrient breakdown.">
        <InputBox label="Age" placeholder="Enter your age" value={age.toString()} onChange={(val) => setAge(Number(val))} type="number" />
        <InputBox label="Weight (kg)" placeholder="Enter your weight" value={weight.toString()} onChange={(val) => setWeight(Number(val))} type="number" />
        <InputBox label="Height (cm)" placeholder="Enter your height" value={height.toString()} onChange={(val) => setHeight(Number(val))} type="number" />

        <div className="mb-4">
          <label className="block mb-2">Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full p-2 border border-green-500 rounded bg-gray-700">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Activity Level</label>
          <select value={activityLevel} onChange={(e) => setActivityLevel(Number(e.target.value))} className="w-full p-2 border rounded bg-gray-700 border-green-500">
            <option value={1.2}>Sedentary (little or no exercise)</option>
            <option value={1.375}>Lightly active (light exercise 1-3 days/week)</option>
            <option value={1.55}>Moderately active (moderate exercise 3-5 days/week)</option>
            <option value={1.725}>Very active (hard exercise 6-7 days a week)</option>
            <option value={1.9}>Super active (very hard exercise or a physical job)</option>
          </select>
        </div>
        <Button label="Calculate" onClick={calculateTdee} className="bg-gradient-to-br from-gray-950  to-gray-800 text-green-400  shadow-md shadow-green-400/50 mt-4 rounded-lg"/>
      </Card>

      {tdee && (
        <Card className="p-6 w-full flex-1 text-sm  rounded-lg shadow-md justify-center items-center text-center" title="Your Results" description="Your calculated BMR, TDEE, BMI, and macronutrients.">
          <div className="text-center">
            <p className="text-lg font-semibold">BMR (Basal Metabolic Rate)</p>
            <p className="text-xl font-bold text-green-400">{bmr?.toFixed(2)} kcal/day</p>
            <p className="text-lg font-semibold mt-2">TDEE (Total Daily Energy Expenditure)</p>
            <p className="text-xl font-bold text-blue-400">{tdee?.toFixed(2)} kcal/day</p>
            <p className="text-lg font-semibold mt-2">BMI (Body Mass Index)</p>
            <p className="text-xl font-bold text-yellow-400">{bmi?.toFixed(2)}</p>
          </div>
          <div className="mt-6">
            <h4 className="text-lg font-semibold border-b border-gray-600 pb-2">Macronutrients</h4>
            <p className="mt-2"><strong>Protein:</strong> <span className="text-red-400">{macros?.protein.toFixed(2)}</span> grams</p>
            <p><strong>Carbs:</strong> <span className="text-blue-400">{macros?.carbs.toFixed(2)}</span> grams</p>
            <p><strong>Fat:</strong> <span className="text-yellow-400">{macros?.fat.toFixed(2)}</span> grams</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default TdeeCalculator;
