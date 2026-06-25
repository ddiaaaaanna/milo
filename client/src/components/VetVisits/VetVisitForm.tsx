import "./VetVisitForm.css";
import { useState, type SyntheticEvent } from "react";
import { type VetVisit } from "../../types/vetVisit";

type VetVisitProps = {
  dogId: string;
  setShowForm: (value: boolean) => void;
  handleVisit: (newVisit: VetVisit) => void;
};

function VetVisitForm({ dogId, setShowForm, handleVisit }: VetVisitProps) {
  const [reason, setReason] = useState("");
  const [visitType, setVisitType] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [vetName, setVetName] = useState("");

  const [savedVisit, setSavedVisit] = useState(false);

  function clearForm() {
    (setReason(""),
      setVisitType(""),
      setDate(""),
      setNotes(""),
      setDiagnosis(""),
      setTreatment(""),
      setVetName(""));
  }

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    const api = `http://localhost:5001/visits`;
    fetch(api, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        reason,
        visitType,
        date,
        notes,
        diagnosis,
        treatment,
        vetName,
        dogId,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        (setSavedVisit(true), handleVisit(result));
      });

    clearForm();
  }

  function handleAddAnotherVisit() {
    clearForm();
    setSavedVisit(false);
  }

  return (
    <>
      {savedVisit && (
        <>
          <p>Your visit was saved!</p>
          <button onClick={handleAddAnotherVisit}>Add new visit</button>
          <button onClick={() => setShowForm(false)}>See visits</button>
        </>
      )}

      {!savedVisit && (
        <>
          <h1>Add new visit</h1>

          <button onClick={() => setShowForm(false)}>x</button>

          <form onSubmit={handleSubmit}>
            <label htmlFor="date">Date of visit*</label>
            <input
              type="date"
              placeholder="dd/mm/yyy"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <label htmlFor="veterinarian">Veterinarian</label>
            <input
              type="text"
              placeholder="e.g. Dr. Sarah Chen / VetPet"
              value={vetName}
              onChange={(e) => setVetName(e.target.value)}
            />

            <label htmlFor="visit-type">Visit type</label>
            <select
              value={visitType}
              onChange={(e) => setVisitType(e.target.value)}
            >
              <option value="">Select reason</option>
              <option value="annual">Annual Wellness Exam</option>
              <option value="sick">Sick Visit</option>
              <option value="vaccine">Vaccination</option>
              <option value="dental">Dental Cleaning</option>
              <option value="surgery">Surgery</option>
              <option value="follow-up">Follow-up</option>
              <option value="emergency">Emergency</option>
              <option value="other">Other</option>
            </select>

            <label htmlFor="reason">Reason for visit*</label>
            <input
              type="text"
              placeholder="e.g. Annual checkup, limping..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />

            <p>Findings</p>

            <label htmlFor="diagnosis">Diagnosis</label>
            <input
              type="text"
              placeholder="e.g. Dermatitis"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
            />

            <label htmlFor="treatment">Treatment</label>
            <input
              type="text"
              placeholder="e.g. X-ray, teeth cleaning..."
              value={treatment}
              onChange={(e) => setTreatment(e.target.value)}
            />

            <label htmlFor="notes">Notes</label>
            <textarea
              placeholder="Additional observations, vet instructions, home care notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>

            <button type="button" onClick={clearForm}>
              Cancel
            </button>
            <button type="submit">Save visit →</button>
          </form>
        </>
      )}
    </>
  );
}

export default VetVisitForm;
