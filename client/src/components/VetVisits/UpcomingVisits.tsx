import "./UpcomingVisits.css";
import useFetch from "../../hooks/useFetch";
import { type VetVisit } from "../../types/vetVisit";

type UpcomingVisitProps = {
  dogId: string;
};

function UpcomingVisits({ dogId }: UpcomingVisitProps) {
  const api = `http://localhost:5001/dogs/${dogId}/visits`;
  const { data } = useFetch<VetVisit[]>(api);
  if (!data) return <div className="loader"></div>;

  const today = Number(new Date());

  const upcomingVisits = data.filter(
    (visit) => Number(new Date(visit.date)) >= today,
  );

  return (
    <>
      <p>Upcoming visits:</p>

      {data &&
        upcomingVisits.map((visit) => (
          <div key={visit._id}>
            <p>{visit.reason}</p>
            <p>{visit.vetName}</p>
            {visit.date
              ? new Date(visit.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Unknown"}
          </div>
        ))}
    </>
  );
}

export default UpcomingVisits;
