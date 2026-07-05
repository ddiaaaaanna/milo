import "./Home.css";
import useFetch from "../../hooks/useFetch";
import { type Dog } from "../../types/dog";
import { Link } from "react-router-dom";
import { useState } from "react";
import calculateAge from "../../utils/calculateAge";
import UpcomingVisits from "../../components/VetVisits/UpcomingVisits";
import UpcomingMedications from "../../components/Medication/UpcomingMedications";
import TrainingProgress from "../../components/Training/TrainingProgress";
import RecentEntries from "../../components/Journal/RecentEntries";
import Navigation from "../../components/Navigation/Navigation";

function Home() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const api = `http://localhost:5001/dogs`;
  const { data } = useFetch<Dog[]>(api);
  if (!data) return <div className="loader"></div>;

  if (data.length === 0) {
    return (
      <>
        <p>No dogs yet</p>
        <Link to="/create">
          <button>Add dog</button>
        </Link>
      </>
    );
  }

  const age = calculateAge(data[selectedIndex].birthday);

  return (
    <>
      <Navigation />

      <h1>homepage</h1>

      {data.map((d, index) => (
        <button key={d._id} onClick={() => setSelectedIndex(index)}>
          <p>{d.name}</p>
        </button>
      ))}

      {data && (
        <div>
          <p>Age :{age}</p>
          <p>Gender: {data[selectedIndex].gender}</p>
          <p>Weight: {data[selectedIndex].weight}kg</p>

          <p>
            Birthday:
            {data[selectedIndex].birthday
              ? new Date(data[selectedIndex].birthday).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  },
                )
              : "Unknown"}
          </p>
          <Link to={`/dog/${data[selectedIndex]._id}`}>
            <p>Open full profile →</p>
          </Link>
        </div>
      )}

      <UpcomingVisits dogId={data[selectedIndex]._id} />
      <UpcomingMedications dogId={data[selectedIndex]._id} />
      <TrainingProgress dogId={data[selectedIndex]._id} />
      <RecentEntries dogId={data[selectedIndex]._id} />
    </>
  );
}

export default Home;
