export interface WorkoutDetail {
    workout: string;
    sets: number;
    reps: number;
    weight: number;
}
  
export interface WeeklyWorkoutSummaryProps {
    workouts: Record<string, WorkoutDetail[]>;
}
  
export interface WorkoutListProps {
    day: string;
    workouts: WorkoutDetail[];
    onRemoveWorkout: (workout: string) => void;
}
  