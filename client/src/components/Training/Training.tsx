import "./Training.css";
import useFetch from "../../hooks/useFetch";
import { type TrainingType } from "../../types/training";
import { useState } from "react";
import ExerciseForm from "./ExerciseForm";
import ExerciseEditor from "./ExerciseEditor";

type TrainingProps = {
  dogId: string;
};

function Training({ dogId }: TrainingProps) {
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editExercise, setEditExercise] = useState<TrainingType | null>(null);

  const api = `http://localhost:5001/dogs/${dogId}/training`;
  const { data, setData } = useFetch<TrainingType[]>(api);
  if (!data) return <div className="loader"></div>;

  function statusBar() {
    if (!data) return <div className="loader"></div>;
    const totalExercises = data.length;
    const masteredExercises = data.filter(
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

  function deleteExercise(exerciseId: string) {
    if (!data) return <div className="loader"></div>;
    const currentExercise = data;

    if (window.confirm("Delete this exercise?")) {
      fetch(`http://localhost:5001/training/${exerciseId}`, {
        method: "DELETE",
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
    <>
      <p>training</p>

      <p>Progress: {statusBar()}%</p>

      {data &&
        data.map((ex) => (
          <div key={ex._id}>
            <p>{ex.exerciseName}</p>
            <p>{ex.difficulty}</p>
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
        ))}

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
      >
        + Add custom exercise
      </button>
    </>
  );
}

export default Training;
