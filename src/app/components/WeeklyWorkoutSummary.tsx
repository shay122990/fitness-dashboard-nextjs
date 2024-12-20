import { WeeklyWorkoutSummaryProps } from "../types/workoutTypes";

const WeeklyWorkoutSummary: React.FC<WeeklyWorkoutSummaryProps> = ({ workouts }) => (
  <div className="mt-6 border p-4">
    <h4 className="text-lg font-bold">Weekly Summary</h4>
    {Object.keys(workouts).map((day) => (
      <div key={day} className="mt-2">
        <h5 className="text-md font-semibold">{day}</h5>
        {workouts[day]?.length ? (
          <ul className="list-disc list-inside mt-2">
            {workouts[day].map((workout, index) => (
              <li key={index}>
                {workout.workout} - {workout.sets} sets x {workout.reps} reps @ {workout.weight}kg
              </li>
            ))}
          </ul>
        ) : (
          <p>No workouts planned for {day}.</p>
        )}
      </div>
    ))}
  </div>
);

export default WeeklyWorkoutSummary;
