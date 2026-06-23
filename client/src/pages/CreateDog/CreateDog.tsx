import "./CreateDog.css";
import { useState, type SyntheticEvent } from "react";
import type { Dog } from "../../types/dog";

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

  function handleAddAllergy() {
    setAllergies([...allergies, newAllergy]);
    setNewAllergy("");
  }

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    const api = `http://localhost:5001/dogs`;
    fetch(api, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
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
      <h1>Add new dog</h1>
      <p>Fill in your dog's details to create their health and life record.</p>

      <form onSubmit={handleSubmit}>
        <p>Profile Photo</p>
        <input
          type="file"
          placeholder="Upload a photo
Drag & drop or click to browse
JPG, PNG or WEBP"
        />

        <p>Basic information</p>
        <label htmlFor="name">DOG NAME</label>
        <input
          type="text"
          placeholder="e.g. Martin"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="breed">BREED</label>
        <input
          type="text"
          placeholder="e.g. Golden Retriever"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        />

        <label htmlFor="date">DATE OF BIRTH</label>
        <input
          type="date"
          placeholder="dd/mm/yy"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />

        <label htmlFor="gender">GENDER</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <p>Medical information</p>
        <label htmlFor="">Weight</label>
        <input
          type="number"
          placeholder="0.0"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        <label htmlFor="">Microchip number</label>
        <input
          type="number"
          placeholder="e.g. 985 121 052 378"
          value={microchip}
          onChange={(e) => setMicrochip(e.target.value)}
        />

        <p>Health notes</p>
        <label htmlFor="">Allergies</label>
        <input
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

        <label htmlFor="">Notes</label>
        <textarea
          placeholder="Any important information about your dog's health, temperament, or care needs..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>

        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit">Save Dog</button>
      </form>
    </>
  );
}

export default CreateDog;
