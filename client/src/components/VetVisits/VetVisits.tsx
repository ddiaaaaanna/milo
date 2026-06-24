import "./VetVisits.css";
import useFetch from "../../hooks/useFetch";
import { type VetVisit } from "../../types/vetVisit";
import VetVisitForm from "./VetVisitForm";

type VetVisitProps = {
  dogId: string;
};

function VetVisits({ dogId }: VetVisitProps) {
  const api = `http://localhost:5001/dogs/${dogId}/visits`;
  const { data, setData } = useFetch<VetVisit[]>(api);
  if (!data) return <p>Loading…</p>;

  function deleteVisit(visitId: string) {
    if (!data) return;
    const currentVisits = data;
    fetch(`http://localhost:5001/visits/${visitId}`, { method: "DELETE" }).then(
      () => {
        const updated = currentVisits.filter((visit) => visit._id !== visitId);
        setData(updated);
      },
    );
  }

  return (
    <>
      <p>vet visits</p>

      {data &&
        data.map((v) => (
          <>
            <p>{v.date}</p>
            <p>{v.reason}</p>
            <p>{v.visitType}</p>
            <p>{v.diagnosis}</p>
            {v.treatment && <p>{v.treatment}</p>}

            <div>
              <button>view</button>
              <button onClick={() => deleteVisit(v._id)}>delete</button>
            </div>
          </>
        ))}

      <VetVisitForm dogId={dogId} />
    </>
  );
}

export default VetVisits;
