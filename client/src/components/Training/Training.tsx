import "./Training.css";
import useFetch from "../../hooks/useFetch";
import { type TrainingType } from "../../types/training";
import { useState } from "react";
import ExerciseForm from "./ExerciseForm";
import ExerciseEditor from "./ExerciseEditor";
import calculateProgress from "../../utils/calculateProgress";
import { Dumbbell } from "lucide-react";

type TrainingProps = {
  dogId: string;
};

function Training({ dogId }: TrainingProps) {
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editExercise, setEditExercise] = useState<TrainingType | null>(null);

  const api = `${import.meta.env.VITE_API_URL}/dogs/${dogId}/training`;
  const { data, setData } = useFetch<TrainingType[]>(api);
  if (!data) return <div className="loader"></div>;

  const progress = calculateProgress(data);

  function deleteExercise(exerciseId: string) {
    if (!data) return <div className="loader"></div>;
    const currentExercise = data;
    const token = localStorage.getItem("token") || "";

    if (window.confirm("Delete this exercise?")) {
      fetch(`${import.meta.env.VITE_API_URL}/training/${exerciseId}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }).then(() => {
        const updated = currentExercise.filter((ex) => ex._id !== exerciseId);
        setData(updated);
      });
    }
  }

  function handleEditExercise(updatedEx: TrainingType) {
    if (!data) return;
    const updatedExercise = data.map((ex) =>
      ex._id === updatedEx._id ? updatedEx : ex,
    );
    setData(updatedExercise);
  }

  function handleExercise(newExercise: TrainingType) {
    if (!data) return;
    setData([...data, newExercise]);
  }

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <Dumbbell />
        <h3>Training</h3>
      </div>

      <p>Progress: {progress}%</p>

      <div className="training-list">
        {data &&
          data.map((ex) => (
            <div key={ex._id} className="training-item">
              <div className="info">
                <p className="name">{ex.exerciseName}</p>
                <p className="difficulty">{ex.difficulty}</p>
              </div>
              <div className="actions">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditForm(true);
                    setEditExercise(ex);
                  }}
                >
                  edit
                </button>
                <button type="button" onClick={() => deleteExercise(ex._id)}>
                  delete
                </button>
              </div>
            </div>
          ))}
      </div>

      {showForm && (
        <ExerciseForm
          dogId={dogId}
          setShowForm={setShowForm}
          handleExercise={handleExercise}
        />
      )}

      {showEditForm && (
        <ExerciseEditor
          setShowEditForm={setShowEditForm}
          editExercise={editExercise}
          setEditExercise={setEditExercise}
          handleEditExercise={handleEditExercise}
        />
      )}

      <button
        type="button"
        onClick={() => {
          setShowForm(true);
          setEditExercise(null);
        }}
        className="card-add-btn"
      >
        + Add custom exercise
      </button>
    </div>
  );
}

export default Training;
