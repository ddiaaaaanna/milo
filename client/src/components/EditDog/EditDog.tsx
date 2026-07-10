import "../../styles/FormStyles.css";
import type { Dog } from "../../types/dog";
import { useState, type SyntheticEvent } from "react";
import { Pencil } from "lucide-react";

type EditDogType = {
  dog: Dog;
  setShowForm: (value: boolean) => void;
  updateDogData: (value: Dog) => void;
};

type DogObject = {
  name: string;
  breed: string;
  birthday: string;
  photo: string;
  notes: string;
  gender: string;
  weight: string;
  microchip: string;
  allergies: string[];
};

function EditDog({ dog, setShowForm, updateDogData }: EditDogType) {
  const initialDogData = {
    name: dog.name,
    breed: dog.breed,
    birthday: dog.birthday ? dog.birthday.split("T")[0] : "",
    photo: dog.photo || "",
    notes: dog.notes || "",
    gender: dog.gender || "",
    weight: dog.weight || "",
    microchip: dog.microchip || "",
    allergies: dog.allergies || [],
  };

  const [dogData, setDogData] = useState<DogObject>(initialDogData);
  const [newAllergy, setNewAllergy] = useState("");

  function handleNewAllergy() {
    setDogData({
      ...dogData,
      allergies: [...dogData.allergies, newAllergy],
    });
    setNewAllergy("");
  }

  function updateDog(e: SyntheticEvent) {
    e.preventDefault();

    const api = `http://localhost:5001/dogs/${dog._id}`;
    const token = localStorage.getItem("token") || "";
    fetch(api, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        ...dogData,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        {
          updateDogData(result);
          setShowForm(false);
        }
      });
  }

  return (
    <div className="form-container">
      <div className="form-modal">
        <div className="form-header">
          <div className="form-header-info">
            <Pencil />
            <div className="form-header-txt">
              <h1>Edit Profile</h1>
              <p>Update {dogData.name}'s information</p>
            </div>
          </div>

          <button onClick={() => setShowForm(false)}>x</button>
        </div>

        <form onSubmit={updateDog} className="form-content">
          <div className="form-scroll">
            <p>Profile Photo</p>
            <input
              type="file"
              placeholder="Upload a photo
Drag & drop or click to browse
JPG, PNG or WEBP"
            />

            <p>Basic information</p>
            <label htmlFor="edit-name">DOG NAME</label>
            <input
              id="edit-name"
              type="text"
              placeholder="e.g. Martin"
              value={dogData.name}
              onChange={(e) => setDogData({ ...dogData, name: e.target.value })}
            />

            <label htmlFor="edit-breed">BREED</label>
            <input
              id="edit-breed"
              type="text"
              placeholder="e.g. Golden Retriever"
              value={dogData.breed}
              onChange={(e) =>
                setDogData({ ...dogData, breed: e.target.value })
              }
            />

            <label htmlFor="edit-date">DATE OF BIRTH</label>
            <input
              id="edit-date"
              type="date"
              placeholder="dd/mm/yy"
              value={dogData.birthday}
              onChange={(e) =>
                setDogData({ ...dogData, birthday: e.target.value })
              }
            />

            <label htmlFor="edit-gender">GENDER</label>
            <select
              id="edit-gender"
              value={dogData.gender}
              onChange={(e) =>
                setDogData({ ...dogData, gender: e.target.value })
              }
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <p>Medical information</p>
            <label htmlFor="edit-weight">Weight</label>
            <input
              id="edit-weight"
              type="number"
              placeholder="25 kg"
              value={dogData.weight}
              onChange={(e) =>
                setDogData({ ...dogData, weight: e.target.value })
              }
            />

            <label htmlFor="edit-microchip">Microchip number</label>
            <input
              id="edit-microchip"
              type="number"
              placeholder="e.g. 985 121 052 378"
              value={dogData.microchip}
              onChange={(e) =>
                setDogData({ ...dogData, microchip: e.target.value })
              }
            />

            <p>Health notes</p>
            <label htmlFor="edit-allergies">Allergies</label>
            <input
              id="edit-allergies"
              type="text"
              placeholder="e.g. Chicken protein"
              value={newAllergy}
              onChange={(e) => setNewAllergy(e.target.value)}
            />
            <button type="button" onClick={handleNewAllergy}>
              Add
            </button>

            {dogData.allergies.map((a) => (
              <p key={a}>{a}</p>
            ))}

            <label htmlFor="edit-notes">Notes</label>
            <textarea
              id="edit-notes"
              placeholder="Any important information about your dog's health, temperament, or care needs..."
              value={dogData.notes}
              onChange={(e) =>
                setDogData({ ...dogData, notes: e.target.value })
              }
            ></textarea>
          </div>

          <div className="button-container">
            <button type="button" onClick={() => setShowForm(false)}>
              Cancel
            </button>
            <button type="submit">Save Dog</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditDog;
