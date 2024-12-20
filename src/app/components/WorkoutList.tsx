const WorkoutList: React.FC<{
    day: string;
    workouts: WorkoutDetail[];
    onRemoveWorkout: (workout: string) => void;
  }> = ({ day, workouts, onRemoveWorkout }) => (
    <div className="mt-6 border">
      <h4 className="text-lg font-bold">Workouts for {day}</h4>
      {workouts?.length > 0 ? (
        <ul className="list-disc list-inside mt-4">
          {workouts.map((workout, index) => (
            <li key={index} className="list-disc list-inside">
              <span>{workout.workout} - {workout.sets} sets x {workout.reps} reps - {workout.weight}kg</span>
              <button
                onClick={() => onRemoveWorkout(workout.workout)}
                className="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-400"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No workouts planned for {day}.</p>
      )}
    </div>
  );
  export default WorkoutList;
  