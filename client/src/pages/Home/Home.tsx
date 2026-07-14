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
import { PawPrint } from "lucide-react";

function Home() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const api = `${import.meta.env.VITE_API_URL}/dogs`;
  const { data } = useFetch<Dog[]>(api);
  if (!data) return <div className="loader"></div>;

  if (data.length === 0) {
    return (
      <div className="app-layout">
        <Navigation />

        <div className="page-content empty-state">
          <h1>
            <PawPrint />
            No dogs yet
          </h1>

          <p>
            Add your first dog to start tracking health, training and memories
            all in one place.
          </p>
          <Link to="/create">
            <button>+ Add your dog</button>
          </Link>
          <img src="/empty-state.png" alt="" width={"500px"} />
        </div>
      </div>
    );
  }

  const age = calculateAge(data[selectedIndex].birthday);

  return (
    <div className="app-layout">
      <Navigation />

      <div className="page-content">
        <div className="dashboard-grid">
          <div className="dashboard-dog-card">
            {data.map((d, index) => (
              <button key={d._id} onClick={() => setSelectedIndex(index)}>
                <p>{d.name}</p>
              </button>
            ))}

            <p>Age :{age}</p>
            <p>Gender: {data[selectedIndex].gender}</p>
            <p>Weight: {data[selectedIndex].weight}kg</p>

            <p>
              Birthday:
              {data[selectedIndex].birthday
                ? new Date(data[selectedIndex].birthday).toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "long", day: "numeric" },
                  )
                : "Unknown"}
            </p>
            <Link to={`/dog/${data[selectedIndex]._id}`}>
              <p>Open full profile →</p>
            </Link>
          </div>

          <div className="dashboard-summaries">
            <UpcomingVisits dogId={data[selectedIndex]._id} />
            <UpcomingMedications dogId={data[selectedIndex]._id} />
            <TrainingProgress dogId={data[selectedIndex]._id} />
            <RecentEntries dogId={data[selectedIndex]._id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
