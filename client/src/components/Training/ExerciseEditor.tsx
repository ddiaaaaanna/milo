import { NotebookPen } from "lucide-react";
import "../../styles/FormStyles.css";
import type { TrainingType } from "../../types/training";
import { useState, type SyntheticEvent } from "react";

type ExerciseEditorProps = {
  setShowEditForm: (value: boolean) => void;
  editExercise: TrainingType | null;
  setEditExercise: (value: TrainingType | null) => void;
  handleEditExercise: (updatedEx: TrainingType) => void;
};

type ExerciseObject = {
  exerciseName: string;
  difficulty: string;
  description: string;
  status: string;
};

function ExerciseEditor({
  setShowEditForm,
  editExercise,
  setEditExercise,
  handleEditExercise,
}: ExerciseEditorProps) {
  const currentExercise = {
    exerciseName: editExercise?.exerciseName || "",
    difficulty: editExercise?.difficulty || "",
    description: editExercise?.description || "",
    status: editExercise?.status || "",
  };

  const [editedTraining, setEditedTraining] =
    useState<ExerciseObject>(currentExercise);

  const [savedEntry, setSavedEntry] = useState(false);

  function updateTraining(e: SyntheticEvent) {
    e.preventDefault();
    const token = localStorage.getItem("token") || "";

    const api = `${import.meta.env.VITE_API_URL}/training/${editExercise?._id}`;
    fetch(api, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        ...editedTraining,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        (setSavedEntry(true), handleEditExercise(result));
      });

    setEditExercise(null);
  }

  function resetForms() {
    setShowEditForm(false);
    setEditExercise(null);
    setSavedEntry(false);
  }

  return (
    <div className="form-container">
      <div className="form-modal">
        {savedEntry && (
          <div className="form-saved">
            <p>Your exercise was edited</p>
            <button onClick={resetForms}>See Training</button>
          </div>
        )}

        {!savedEntry && (
          <>
            <div className="form-header">
              <div className="form-header-info">
                <NotebookPen />
                <div className="form-header-txt">
                  <p>{editedTraining.difficulty}</p>
                  <p>{editedTraining.exerciseName}</p>
                </div>
              </div>

              <button type="button" onClick={resetForms}>
                x
              </button>
            </div>

            <form onSubmit={updateTraining} className="form-content">
              <div className="form-scroll">
                <p>Status</p>

                <div>
                  <button
                    type="button"
                    onClick={() =>
                      setEditedTraining({
                        ...editedTraining,
                        status: "not-started",
                      })
                    }
                  >
                    Not Started
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setEditedTraining({
                        ...editedTraining,
                        status: "in-progress",
                      })
                    }
                  >
                    In Progress
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setEditedTraining({
                        ...editedTraining,
                        status: "mastered",
                      })
                    }
                  >
                    Mastered
                  </button>
                </div>

                <label htmlFor="edit-exercise-description">
                  Description / goal{" "}
                </label>
                <textarea
                  id="edit-exercise-description"
                  value={editedTraining.description}
                  onChange={(e) =>
                    setEditedTraining({
                      ...editedTraining,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </div>

              <div className="button-container">
                <button type="button" onClick={resetForms}>
                  Cancel
                </button>
                <button type="submit">Save changes</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default ExerciseEditor;
