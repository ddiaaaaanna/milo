import "./VetVisits.css";
import useFetch from "../../hooks/useFetch";
import { type VetVisit } from "../../types/vetVisit";
import VetVisitForm from "./VetVisitForm";
import { useState } from "react";
import { CalendarHeart } from "lucide-react";

type VetVisitProps = {
  dogId: string;
  name: string;
  breed: string;
};

function VetVisits({ dogId, name, breed }: VetVisitProps) {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editVisit, setEditVisit] = useState<VetVisit | null>(null);

  const api = `${import.meta.env.VITE_API_URL}/dogs/${dogId}/visits`;
  const { data, setData } = useFetch<VetVisit[]>(api);
  if (!data) return <div className="loader"></div>;

  function deleteVisit(visitId: string) {
    if (!data) return;
    const currentVisits = data;
    const token = localStorage.getItem("token") || "";

    if (window.confirm("Delete this visit?")) {
      fetch(`${import.meta.env.VITE_API_URL}/visits/${visitId}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }).then(() => {
        const updated = currentVisits.filter((visit) => visit._id !== visitId);
        setData(updated);
      });
    }
  }

  function handleVisit(newVisit: VetVisit) {
    if (!data) return;
    setData([...data, newVisit]);
  }

  function handleEditVisit(updatedVisit: VetVisit) {
    if (!data) return;
    const updatedVetVisit = data.map((v) =>
      v._id === updatedVisit._id ? updatedVisit : v,
    );
    setData(updatedVetVisit);
  }

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <CalendarHeart />
        <h3>Vet Visits</h3>
      </div>

      {data.length === 0 && <p>No visits scheduled</p>}

      <button
        type="button"
        onClick={() => {
          setShowForm(true);
          setEditVisit(null);
        }}
        className="card-add-btn"
      >
        + Add vet visit
      </button>

      <div className="record-list">
        {data &&
          data.map((v) => (
            <div key={v._id} className="record-item">
              <div className="info">
                <span className="date">
                  {new Date(v.date).toLocaleDateString()}
                </span>
                <span className="primary">{v.reason}</span>
                <span className="detail">{v.visitType}</span>
                <span className="detail">{v.diagnosis}</span>
                {v.treatment && <span className="detail">{v.treatment}</span>}
              </div>
              <div className="actions">
                <button
                  onClick={() => {
                    setEditVisit(v);
                    setShowForm(true);
                  }}
                >
                  edit
                </button>
                <button onClick={() => deleteVisit(v._id)}>delete</button>
              </div>
            </div>
          ))}
      </div>

      {showForm && (
        <VetVisitForm
          dogId={dogId}
          setShowForm={setShowForm}
          handleVisit={handleVisit}
          editVisit={editVisit}
          setEditVisit={setEditVisit}
          handleEditVisit={handleEditVisit}
          name={name}
          breed={breed}
        />
      )}
    </div>
  );
}

export default VetVisits;
