import { type TrainingType } from "../types/training";

function calculateProgress(exercises: TrainingType[]) {
  if (!exercises) return 0;
  const totalExercises = exercises.length;
  const masteredExercises = exercises.filter(
    (ex) => ex.status === "mastered",
  ).length;

  let progressPercent;

  if (totalExercises === 0) {
    progressPercent = 0;
  } else {
    progressPercent = Math.round((masteredExercises / totalExercises) * 100);
  }

  return progressPercent;
}

export default calculateProgress;
