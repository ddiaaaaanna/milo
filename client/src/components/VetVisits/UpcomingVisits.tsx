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

      {upcomingVisits.length === 0 && (
        <>
          <p>No upcoming visits</p>
        </>
      )}

      {data.length > 0 &&
        upcomingVisits.map((visit) => (
          <div key={visit._id}>
            <p>{visit.reason}</p>
            <p>{visit.vetName}</p>
            <p>
              {visit.date
                ? new Date(visit.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Unknown"}
            </p>
          </div>
        ))}
    </>
  );
}

export default UpcomingVisits;
