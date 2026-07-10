import "../../styles/FormStyles.css";
import { type TrainingType } from "../../types/training";
import { useState, type SyntheticEvent } from "react";
import { NotebookPen } from "lucide-react";

type ExerciseFormProps = {
  dogId: string;
  setShowForm: (value: boolean) => void;
  handleExercise: (newExercise: TrainingType) => void;
};

type ExerciseObject = {
  exerciseName: string;
  difficulty: string;
  description: string;
  status: string;
};

function ExerciseForm({
  dogId,
  setShowForm,
  handleExercise,
}: ExerciseFormProps) {
  const initialExercise = {
    exerciseName: "",
    difficulty: "",
    description: "",
    status: "not-started",
  };

  const [exercise, setExercise] = useState<ExerciseObject>(initialExercise);
  const [savedExercise, setSavedExercise] = useState(false);
  const token = localStorage.getItem("token") || "";

  function clearForm() {
    setExercise({
      exerciseName: "",
      difficulty: "",
      description: "",
      status: "not-started",
    });
  }

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    const api = `http://localhost:5001/training`;
    fetch(api, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        ...exercise,
        dogId,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        (setSavedExercise(true), handleExercise(result));
      });

    clearForm();
  }

  function handleMoreExercises() {
    clearForm();
    setSavedExercise(false);
  }

  function resetForms() {
    clearForm();
    setShowForm(false);
    setSavedExercise(false);
  }

  return (
    <div className="form-container">
      <div className="form-modal">
        {savedExercise && (
          <div className="form-saved">
            <p>Your exercise was logged</p>
            <button onClick={handleMoreExercises}>Add another exercise</button>
            <button onClick={resetForms}>See Exercises</button>
          </div>
        )}

        {!savedExercise && (
          <>
            <div className="form-header">
              <div className="form-header-info">
                <NotebookPen />
                <div className="form-header-txt">
                  <h1>Add new exercise</h1>
                </div>
              </div>
              <button onClick={resetForms}>x</button>
            </div>

            <form onSubmit={handleSubmit} className="form-content">
              <div className="form-scroll">
                <label htmlFor="exercise-name">Exercise name *</label>
                <input
                  type="text"
                  id="exercise-name"
                  placeholder="e.g. Bark, fetch, wave..."
                  value={exercise.exerciseName}
                  onChange={(e) =>
                    setExercise({ ...exercise, exerciseName: e.target.value })
                  }
                />

                <p>Difficulty</p>

                <div>
                  <button
                    type="button"
                    onClick={() =>
                      setExercise({ ...exercise, difficulty: "easy" })
                    }
                  >
                    Easy
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setExercise({ ...exercise, difficulty: "medium" })
                    }
                  >
                    Medium
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setExercise({ ...exercise, difficulty: "hard" })
                    }
                  >
                    Hard
                  </button>
                </div>

                <label htmlFor="exercise-description">
                  Description / goal{" "}
                </label>
                <textarea
                  id="exercise-description"
                  placeholder="What does success look like? Describe the behavior you're training..."
                  value={exercise.description}
                  onChange={(e) =>
                    setExercise({ ...exercise, description: e.target.value })
                  }
                ></textarea>

                <p>Starting status</p>

                <div>
                  <button
                    type="button"
                    onClick={() =>
                      setExercise({ ...exercise, status: "not-started" })
                    }
                  >
                    Not Started
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setExercise({ ...exercise, status: "in-progress" })
                    }
                  >
                    In Progress
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setExercise({ ...exercise, status: "mastered" })
                    }
                  >
                    Mastered
                  </button>
                </div>
              </div>

              <div className="button-container">
                <button type="button" onClick={resetForms}>
                  Cancel
                </button>
                <button type="submit">+ Add Exercise</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default ExerciseForm;
