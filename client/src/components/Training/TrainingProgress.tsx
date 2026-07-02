import "./TrainingProgress.css";
import useFetch from "../../hooks/useFetch";
import { type TrainingType } from "../../types/training";
import calculateProgress from "../../utils/calculateProgress";

type TrainingProgressProps = {
  dogId: string;
};

function TrainingProgress({ dogId }: TrainingProgressProps) {
  const api = `http://localhost:5001/dogs/${dogId}/training`;
  const { data } = useFetch<TrainingType[]>(api);
  if (!data) return <div className="loader"></div>;

  const progress = calculateProgress(data);

  const inProgressEx = data.filter((ex) => ex.status === "in-progress").length;

  return (
    <>
      <p>Training</p>

      <p>{progress}%</p>
      <p>{inProgressEx} in progress</p>
    </>
  );
}

export default TrainingProgress;
