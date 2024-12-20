const WeeklyWorkoutSummary: React.FC<{ workouts: Record<string, WorkoutDetail[]> }> = ({ workouts }) => (
    <div className="mt-6 border">
      <h4 className="text-lg font-bold">Workouts for the Week</h4>
      {Object.keys(workouts).map((day) => (
        <div key={day}>
          <h5 className="text-md font-semibold">{day}</h5>
          {workouts[day]?.length > 0 ? (
            <ul className="list-disc list-inside mt-2">
              {workouts[day].map((workout, index) => (
                <li key={index}>
                  {workout.workout} - {workout.sets} sets x {workout.reps} reps - {workout.weight}kg
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
  