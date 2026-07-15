import "./Medication.css";
import useFetch from "../../hooks/useFetch";
import { type Medication } from "../../types/medication";
import MedicationForm from "./MedicationForm";
import { useState } from "react";
import { Pill } from "lucide-react";

type MedicationProps = {
  dogId: string;
  name: string;
  breed: string;
};

function MedicationList({ dogId, name, breed }: MedicationProps) {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editMedication, setEditMedication] = useState<Medication | null>(null);

  const api = `${import.meta.env.VITE_API_URL}/dogs/${dogId}/medication`;
  const { data, setData } = useFetch<Medication[]>(api);
  if (!data) return <div className="loader"></div>;

  function deleteMedication(medicationId: string) {
    if (!data) return;
    const currentMedication = data;
    const token = localStorage.getItem("token") || "";

    if (window.confirm("Delete this medication?")) {
      fetch(`${import.meta.env.VITE_API_URL}/medication/${medicationId}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }).then(() => {
        const updated = currentMedication.filter(
          (medication) => medication._id !== medicationId,
        );
        setData(updated);
      });
    }
  }

  function handleEditMedication(updatedMed: Medication) {
    if (!data) return;
    const updatedMedication = data.map((m) =>
      m._id === updatedMed._id ? updatedMed : m,
    );
    setData(updatedMedication);
  }

  function handleMedication(newMedication: Medication) {
    if (!data) return;
    setData([...data, newMedication]);
  }

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <Pill />
        <h3>Medication</h3>
      </div>

      {data.length === 0 && <p>No medication yet</p>}

      <button
        type="button"
        onClick={() => {
          setShowForm(true);
          setEditMedication(null);
        }}
        className="card-add-btn"
      >
        + Add medication
      </button>
      <div className="record-list">
        {data &&
          data.map((m) => (
            <div key={m._id} className="record-item">
              <div className="info">
                <span className="primary">{m.name}</span>
                <span className="date">
                  {m.startDate && new Date(m.startDate).toLocaleDateString()}
                  {m.endDate &&
                    ` – ${new Date(m.endDate).toLocaleDateString()}`}
                </span>
                <span className="detail">
                  Frequency: {m.customFrequency || m.frequency}
                </span>
                <span className="detail">Dose: {m.dose}</span>
              </div>
              <div className="actions">
                <button
                  onClick={() => {
                    setEditMedication(m);
                    setShowForm(true);
                  }}
                >
                  edit
                </button>
                <button onClick={() => deleteMedication(m._id)}>delete</button>
              </div>
            </div>
          ))}
      </div>

      {showForm && (
        <MedicationForm
          dogId={dogId}
          setShowForm={setShowForm}
          handleMedication={handleMedication}
          editMedication={editMedication}
          setEditMedication={setEditMedication}
          handleEditMedication={handleEditMedication}
          name={name}
          breed={breed}
        />
      )}
    </div>
  );
}

export default MedicationList;
