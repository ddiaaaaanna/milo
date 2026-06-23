import "./VetVisits.css";
import useFetch from "../../hooks/useFetch";
import { type VetVisit } from "../../types/vetVisit";

type VetVisitProps = {
  dogId: string;
};

function VetVisits({ dogId }: VetVisitProps) {
  console.log(dogId);

  const api = `http://localhost:5001/dogs/${dogId}/visits`;
  const { data } = useFetch<VetVisit[]>(api);
  if (!data) return <p>Loading…</p>;

  console.log(data);

  return <p>vet visits</p>;
}

export default VetVisits;
