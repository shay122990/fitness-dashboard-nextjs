export interface NutritionState {
  [key: string]: {
    eaten: string[];
    burned: string[];
  };
}