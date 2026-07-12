import "./CreateDog.css";
import { useState, type SyntheticEvent } from "react";
import type { Dog } from "../../types/dog";
import { Link, useNavigate } from "react-router-dom";

function CreateDog() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [microchip, setMicrochip] = useState("");
  const [allergies, setAllergies] = useState<string[]>([]);
  const [newAllergy, setNewAllergy] = useState("");
  const [notes, setNotes] = useState("");

  const [savedDog, setSavedDog] = useState<Dog | null>(null);
  console.log(savedDog);
  const navigate = useNavigate();

  function handleAddAllergy() {
    setAllergies([...allergies, newAllergy]);
    setNewAllergy("");
  }

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    const token = localStorage.getItem("token") || "";
    const api = `http://localhost:5001/dogs`;
    fetch(api, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        name,
        breed,
        birthday,
        gender,
        weight,
        microchip,
        allergies,
        notes,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((newDog) => setSavedDog(newDog));
    navigate("/");
  }

  function handleCancel() {
    setName("");
    setBreed("");
    setBirthday("");
    setGender("");
    setWeight("");
    setMicrochip("");
    setNotes("");
    setNewAllergy("");
    setAllergies([]);
  }

  return (
    <>
      <Link to="/">← Back to dashboard</Link>
      <div className="addDog-container">
        <div className="addDog-modal">
          <div className="addDog-header">
            <div className="addDog-header-info">
              <h1>Add new dog</h1>
              <p>
                Fill in your dog's details to create their health and life
                record.
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="addDog-content">
            <p>Profile Photo</p>
            <input
              type="file"
              placeholder="Upload a photo
Drag & drop or click to browse
JPG, PNG or WEBP"
            />

            <p>Basic information</p>
            <label htmlFor="dog-name">DOG NAME</label>
            <input
              id="dog-name"
              type="text"
              placeholder="e.g. Martin"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="dog-breed">BREED</label>
            <input
              id="dog-breed"
              type="text"
              placeholder="e.g. Golden Retriever"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
            />

            <label htmlFor="dog-bday">DATE OF BIRTH</label>
            <input
              id="dog-bday"
              type="date"
              placeholder="dd/mm/yy"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />

            <label htmlFor="dog-gender">GENDER</label>
            <select
              id="dog-gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <p>Medical information</p>
            <label htmlFor="dog-weight">Weight</label>
            <input
              id="dog-weight"
              type="number"
              placeholder="0.0 kg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />

            <label htmlFor="dog-chip">Microchip number</label>
            <input
              id="dog-chip"
              type="number"
              placeholder="e.g. 985 121 052 378"
              value={microchip}
              onChange={(e) => setMicrochip(e.target.value)}
            />

            <p>Health notes</p>
            <label htmlFor="dog-allergies">Allergies</label>
            <input
              id="dog-allergies"
              type="text"
              placeholder="e.g. Chicken protein"
              value={newAllergy}
              onChange={(e) => setNewAllergy(e.target.value)}
            />
            <button type="button" onClick={handleAddAllergy}>
              Add
            </button>

            {allergies.map((a) => (
              <p key={a}>{a}</p>
            ))}

            <label htmlFor="dog-notes">Notes</label>
            <textarea
              id="dog-notes"
              placeholder="Any important information about your dog's health, temperament, or care needs..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>

            <div className="addDog-button-container">
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit">Save Dog</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateDog;
