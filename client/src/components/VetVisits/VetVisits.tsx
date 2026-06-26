import "./VetVisits.css";
import useFetch from "../../hooks/useFetch";
import { type VetVisit } from "../../types/vetVisit";
import VetVisitForm from "./VetVisitForm";
import { useState } from "react";

type VetVisitProps = {
  dogId: string;
};

function VetVisits({ dogId }: VetVisitProps) {
  const [showForm, setShowForm] = useState<boolean>(false);

  const api = `http://localhost:5001/dogs/${dogId}/visits`;
  const { data, setData } = useFetch<VetVisit[]>(api);
  if (!data) return <p>Loading…</p>;

  function deleteVisit(visitId: string) {
    if (!data) return;
    const currentVisits = data;

    if (window.confirm("Delete this visit?")) {
      fetch(`http://localhost:5001/visits/${visitId}`, {
        method: "DELETE",
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

  return (
    <>
      <p>vet visits</p>

      <button type="button" onClick={() => setShowForm(true)}>
        + Add vet visit
      </button>

      {data &&
        data.map((v) => (
          <div key={v._id}>
            <p>{new Date(v.date).toLocaleDateString()}</p>
            <p>{v.reason}</p>
            <p>{v.visitType}</p>
            <p>{v.diagnosis}</p>
            {v.treatment && <p>{v.treatment}</p>}

            <div>
              <button>view</button>
              <button onClick={() => deleteVisit(v._id)}>delete</button>
            </div>
          </div>
        ))}

      {showForm && (
        <VetVisitForm
          dogId={dogId}
          setShowForm={setShowForm}
          handleVisit={handleVisit}
        />
      )}
    </>
  );
}

export default VetVisits;
