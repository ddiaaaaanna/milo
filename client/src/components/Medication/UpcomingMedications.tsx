import "./UpcomingMedications.css";
import useFetch from "../../hooks/useFetch";
import { type Medication } from "../../types/medication";
import { Pill } from "lucide-react";

type UpcomingMedicationProps = {
  dogId: string;
};

function UpcomingMedications({ dogId }: UpcomingMedicationProps) {
  const api = `http://localhost:5001/dogs/${dogId}/medication`;
  const { data } = useFetch<Medication[]>(api);
  if (!data) return <div className="loader"></div>;

  const today = Number(new Date());

  const medicationsDue = data.filter(
    (med) =>
      (med.endDate && Number(new Date(med.endDate)) >= today) || med.ongoing,
  );

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <Pill size={18} color=" #4a5a2f" />
        <h4>Medications due: </h4>
      </div>

      {medicationsDue.length === 0 && <p>No medications yet</p>}

      {medicationsDue.length > 0 &&
        medicationsDue.map((med) => (
          <div key={med._id}>
            <p>{med.name}</p>
            <p>{med.dose}</p>
            <p>{med.frequency}</p>
            <p>
              {med.startDate
                ? new Date(med.startDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Unknown"}
            </p>
          </div>
        ))}
    </div>
  );
}

export default UpcomingMedications;
