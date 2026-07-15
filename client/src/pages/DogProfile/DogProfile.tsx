import "./DogProfile.css";
import useFetch from "../../hooks/useFetch";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Dog } from "../../types/dog";
import VetVisits from "../../components/VetVisits/VetVisits";
import MedicationList from "../../components/Medication/Medication";
import { useState } from "react";
import EditDog from "../../components/EditDog/EditDog";
import Journal from "../../components/Journal/Journal";
import Training from "../../components/Training/Training";
import calculateAge from "../../utils/calculateAge";
import Navigation from "../../components/Navigation/Navigation";

function DogProfile() {
  const params = useParams();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  const api = `${import.meta.env.VITE_API_URL}/dogs/${params.id}`;
  const { data, setData } = useFetch<Dog>(api);
  if (!data) return <div className="loader"></div>;

  const age = calculateAge(data.birthday);

  function deleteDog() {
    const token = localStorage.getItem("token") || "";
    if (window.confirm("Delete this dog?")) {
      fetch(api, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }).then(() => navigate("/"));
    }
  }

  return (
    <div className="app-layout">
      <Navigation />

      <div className="page-content dog">
        {data && (
          <>
            <Link to="/">← Back to dashboard</Link>
            <div className="dog-info">
              <div className="photo-part">
                <p className="photo">photo here</p>
              </div>
              <div className="text-part">
                <div className="main-part">
                  <p className="profile-name">{data.name}</p>
                  <p className="profile-breed">{data.breed}</p>
                  <p>Age: {age !== null ? `${age} years` : "Unknown"}</p>
                </div>
                <div className="info-grid">
                  <p>
                    Birthday:
                    {data.birthday
                      ? new Date(data.birthday).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Unknown"}
                  </p>

                  <p>Gender: {data.gender}</p>
                  <p>Weight: {data.weight} kg</p>
                  <p>Notes: {data.notes}</p>
                  <p>Allergies: {data.allergies}</p>
                </div>
              </div>

              <div className="profile-buttons">
                <button type="button" onClick={() => setShowForm(true)}>
                  Edit Dog
                </button>
                <button type="button" onClick={deleteDog}>
                  Delete Dog
                </button>
              </div>
            </div>
          </>
        )}

        {showForm && (
          <EditDog
            dog={data}
            setShowForm={setShowForm}
            updateDogData={setData}
          />
        )}

        <VetVisits dogId={data._id} name={data.name} breed={data.breed} />
        <MedicationList dogId={data._id} name={data.name} breed={data.breed} />
        <Journal dogId={data._id} name={data.name} breed={data.breed} />
        <Training dogId={data._id} />
      </div>
    </div>
  );
}

export default DogProfile;
