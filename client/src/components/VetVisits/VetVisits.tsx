import "./VetVisits.css";
import useFetch from "../../hooks/useFetch";
import { type VetVisit } from "../../types/vetVisit";
import VetVisitForm from "./VetVisitForm";

type VetVisitProps = {
  dogId: string;
};

function VetVisits({ dogId }: VetVisitProps) {
  const api = `http://localhost:5001/dogs/${dogId}/visits`;
  const { data } = useFetch<VetVisit[]>(api);
  if (!data) return <p>Loading…</p>;

  console.log(data);

  return (
    <>
      <p>vet visits</p>

      <VetVisitForm dogId={dogId} />
    </>
  );
}

export default VetVisits;
