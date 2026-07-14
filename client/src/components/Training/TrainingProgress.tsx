import "./TrainingProgress.css";
import useFetch from "../../hooks/useFetch";
import { type TrainingType } from "../../types/training";
import calculateProgress from "../../utils/calculateProgress";
import { Dumbbell } from "lucide-react";

type TrainingProgressProps = {
  dogId: string;
};

function TrainingProgress({ dogId }: TrainingProgressProps) {
  const api = `${import.meta.env.VITE_API_URL}/dogs/${dogId}/training`;
  const { data } = useFetch<TrainingType[]>(api);
  if (!data) return <div className="loader"></div>;

  const progress = calculateProgress(data);

  const inProgressEx = data.filter((ex) => ex.status === "in-progress").length;

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <Dumbbell size={18} color=" #4a5a2f" />
        <h4>Training:</h4>
      </div>

      <p>{progress}%</p>
      <p>{inProgressEx} in progress</p>
    </div>
  );
}

export default TrainingProgress;
