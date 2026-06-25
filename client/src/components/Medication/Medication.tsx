import "./Medication.css";
import useFetch from "../../hooks/useFetch";
import { type Medication } from "../../types/medication";
import MedicationForm from "./MedicationForm";
import { useState } from "react";

type MedicationProps = {
  dogId: string;
};

function MedicationList({ dogId }: MedicationProps) {
  const [showForm, setShowForm] = useState<boolean>(false);

  const api = `http://localhost:5001/dogs/${dogId}/medication`;
  const { data, setData } = useFetch<Medication[]>(api);
  if (!data) return <p>Loading…</p>;

  function deleteMedication(medicationId: string) {
    if (!data) return;
    const currentMedication = data;
    fetch(`http://localhost:5001/medication/${medicationId}`, {
      method: "DELETE",
    }).then(() => {
      const updated = currentMedication.filter(
        (medication) => medication._id !== medicationId,
      );
      setData(updated);
    });
  }

  function handleMedication(newMedication: Medication) {
    if (!data) return;
    setData([...data, newMedication]);
  }

  return (
    <>
      <p>medication</p>

      <button type="button" onClick={() => setShowForm(true)}>
        💊 Add medication
      </button>

      {data &&
        data.map((m) => (
          <div key={m._id}>
            <p>Medication name: {m.name}</p>
            <p>{m.startDate && new Date(m.startDate).toLocaleDateString()}</p>
            <p>{m.endDate && new Date(m.endDate).toLocaleDateString()}</p>
            <p>Frequency: {m.frequency}</p>
            <p>{m.customFrequency && `Frequency: ${m.customFrequency}`}</p>
            <p>Dose: {m.dose}</p>

            <div>
              <button>view</button>
              <button onClick={() => deleteMedication(m._id)}>delete</button>
            </div>
          </div>
        ))}

      {showForm && (
        <MedicationForm
          dogId={dogId}
          setShowForm={setShowForm}
          handleMedication={handleMedication}
        />
      )}
    </>
  );
}

export default MedicationList;
