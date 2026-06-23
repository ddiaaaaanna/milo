import "./DogProfile.css";
import useFetch from "../../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import type { Dog } from "../../types/dog";
import VetVisits from "../../components/VetVisits/VetVisits";

function DogProfile() {
  const params = useParams();
  const navigate = useNavigate();

  const api = `http://localhost:5001/dogs/${params.id}`;
  const { data } = useFetch<Dog>(api);
  if (!data) return <p>Loading…</p>;

  let age: number | null = null;
  if (data.birthday) {
    const birth = new Date(data.birthday);
    const today = new Date();
    age = today.getFullYear() - birth.getFullYear();

    if (
      today.getMonth() < birth.getMonth() ||
      (today.getMonth() === birth.getMonth() &&
        today.getDate() < birth.getDate())
    ) {
      age = age - 1;
    }
  }

  function deleteDog() {
    if (window.confirm("Delete this dog?")) {
      fetch(api, { method: "DELETE" }).then(() => navigate("/"));
    }
  }

  return (
    <>
      {data && (
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
            <p>Notes: {data.notes}</p>
          </div>

          <button type="button" onClick={deleteDog}>
            Delete Dog
          </button>
        </div>
      )}

      <VetVisits />
    </>
  );
}

export default DogProfile;
