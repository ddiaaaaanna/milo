import "./VetVisitForm.css";
import { useState, type SyntheticEvent } from "react";
import { type VetVisit } from "../../types/vetVisit";

type VetVisitProps = {
  dogId: string;
  setShowForm: (value: boolean) => void;
  handleVisit: (newVisit: VetVisit) => void;
  editVisit: VetVisit | null;
  setEditVisit: (value: VetVisit | null) => void;
  handleEditVisit: (updatedVisit: VetVisit) => void;
};

type VetVisitObject = {
  reason: string;
  visitType: string;
  date: string;
  notes: string;
  diagnosis: string;
  treatment: string;
  vetName: string;
};

function VetVisitForm({
  dogId,
  setShowForm,
  handleVisit,
  editVisit,
  setEditVisit,
  handleEditVisit,
}: VetVisitProps) {
  const initialVisit = editVisit
    ? {
        reason: editVisit.reason,
        visitType: editVisit.visitType,
        date: editVisit.date ? editVisit.date.split("T")[0] : "",
        notes: editVisit.notes || "",
        diagnosis: editVisit.diagnosis || "",
        treatment: editVisit.treatment || "",
        vetName: editVisit.vetName || "",
      }
    : {
        reason: "",
        visitType: "",
        date: "",
        notes: "",
        diagnosis: "",
        treatment: "",
        vetName: "",
      };

  const [visit, setVisit] = useState<VetVisitObject>(initialVisit);
  const [savedVisit, setSavedVisit] = useState(false);
  const token = localStorage.getItem("token") || "";

  function clearForm() {
    setVisit({
      reason: "",
      visitType: "",
      date: "",
      notes: "",
      diagnosis: "",
      treatment: "",
      vetName: "",
    });
  }

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    const api = `http://localhost:5001/visits`;
    fetch(api, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        ...visit,
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

  function updateVisit(e: SyntheticEvent) {
    e.preventDefault();

    const api = `http://localhost:5001/visits/${editVisit?._id}`;
    fetch(api, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        ...visit,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        (setSavedVisit(true), handleEditVisit(result));
      });

    clearForm();
    setEditVisit(null);
  }

  function handleAddAnotherVisit() {
    clearForm();
    setSavedVisit(false);
  }

  function resetForms() {
    clearForm();
    setShowForm(false);
    setEditVisit(null);
    setSavedVisit(false);
  }

  return (
    <>
      {savedVisit && (
        <>
          <p>Your visit was saved!</p>
          <button onClick={handleAddAnotherVisit}>Add new visit</button>
          <button onClick={resetForms}>See visits</button>
        </>
      )}

      {!savedVisit && (
        <>
          {editVisit ? <h1>Edit visit</h1> : <h1>Add new visit</h1>}

          <button onClick={resetForms}>x</button>

          <form onSubmit={editVisit ? updateVisit : handleSubmit}>
            <label htmlFor="vet-date">Date of visit*</label>
            <input
              id="vet-date"
              type="date"
              placeholder="dd/mm/yyy"
              value={visit.date}
              onChange={(e) => setVisit({ ...visit, date: e.target.value })}
            />

            <label htmlFor="vet-veterinarian">Veterinarian</label>
            <input
              id="vet-veterinarian"
              type="text"
              placeholder="e.g. Dr. Sarah Chen / VetPet"
              value={visit.vetName}
              onChange={(e) => setVisit({ ...visit, vetName: e.target.value })}
            />

            <label htmlFor="vet-visit-type">Visit type</label>
            <select
              id="vet-visit-type"
              value={visit.visitType}
              onChange={(e) =>
                setVisit({ ...visit, visitType: e.target.value })
              }
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

            <label htmlFor="vet-reason">Reason for visit*</label>
            <input
              id="vet-reason"
              type="text"
              placeholder="e.g. Annual checkup, limping..."
              value={visit.reason}
              onChange={(e) => setVisit({ ...visit, reason: e.target.value })}
            />

            <p>Findings</p>

            <label htmlFor="vet-diagnosis">Diagnosis</label>
            <input
              id="vet-diagnosis"
              type="text"
              placeholder="e.g. Dermatitis"
              value={visit.diagnosis}
              onChange={(e) =>
                setVisit({ ...visit, diagnosis: e.target.value })
              }
            />

            <label htmlFor="vet-treatment">Treatment</label>
            <input
              id="vet-treatment"
              type="text"
              placeholder="e.g. X-ray, teeth cleaning..."
              value={visit.treatment}
              onChange={(e) =>
                setVisit({ ...visit, treatment: e.target.value })
              }
            />

            <label htmlFor="vet-notes">Notes</label>
            <textarea
              id="vet-notes"
              placeholder="Additional observations, vet instructions, home care notes..."
              value={visit.notes}
              onChange={(e) => setVisit({ ...visit, notes: e.target.value })}
            ></textarea>

            <button type="button" onClick={resetForms}>
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
