import "./MedicationForm.css";
import { useState, type SyntheticEvent } from "react";
import { type Medication } from "../../types/medication";

type MedicationProps = {
  dogId: string;
  setShowForm: (value: boolean) => void;
  handleMedication: (newMedication: Medication) => void;
  editMedication: Medication | null;
  setEditMedication: (value: Medication | null) => void;
  handleEditMedication: (updatedMed: Medication) => void;
};

type MedicationObject = {
  name: string;
  dose: string;
  notes: string;
  reason: string;
  frequency: string;
  startDate: string;
  endDate: string;
};

function MedicationForm({
  dogId,
  setShowForm,
  handleMedication,
  editMedication,
  setEditMedication,
  handleEditMedication,
}: MedicationProps) {
  const initialMedication = editMedication
    ? {
        name: editMedication.name,
        dose: editMedication.dose,
        notes: editMedication.notes || "",
        reason: editMedication.reason || "",
        frequency: editMedication.frequency || "",
        startDate: editMedication.startDate
          ? editMedication.startDate.split("T")[0]
          : "",
        endDate: editMedication.endDate
          ? editMedication.endDate.split("T")[0]
          : "",
      }
    : {
        name: "",
        dose: "",
        notes: "",
        reason: "",
        frequency: "",
        startDate: "",
        endDate: "",
      };
  const [medication, setMedication] =
    useState<MedicationObject>(initialMedication);

  const [customFrequency, setCustomFrequency] = useState("");
  const [isOngoing, setIsOngoing] = useState(false);

  const [savedMedication, setSavedMedication] = useState(false);

  function clearForm() {
    setMedication({
      name: "",
      dose: "",
      notes: "",
      reason: "",
      frequency: "",
      startDate: "",
      endDate: "",
    });
    setCustomFrequency("");
    setIsOngoing(false);
  }

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const finalFrequency =
      medication.frequency === "custom"
        ? customFrequency
        : medication.frequency;
    const finalEndDate = isOngoing ? "" : medication.endDate;

    const api = `http://localhost:5001/medication`;
    fetch(api, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ...medication,
        frequency: finalFrequency,
        endDate: finalEndDate,
        dogId,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        (setSavedMedication(true), handleMedication(result));
      });

    clearForm();
    setEditMedication(null);
  }

  function updateMedication(e: SyntheticEvent) {
    e.preventDefault();
    const finalFrequency =
      medication.frequency === "custom"
        ? customFrequency
        : medication.frequency;
    const finalEndDate = isOngoing ? "" : medication.endDate;

    const api = `http://localhost:5001/medication/${editMedication?._id}`;
    fetch(api, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ...medication,
        frequency: finalFrequency,
        endDate: finalEndDate,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        (setSavedMedication(true), handleEditMedication(result));
      });

    clearForm();
    setEditMedication(null);
  }

  function handleMoreMedication() {
    clearForm();
    setSavedMedication(false);
  }

  function resetForms() {
    clearForm();
    setShowForm(false);
    setEditMedication(null);
    setSavedMedication(false);
  }

  return (
    <>
      {savedMedication && (
        <>
          <p>Your medication was logged</p>
          <button onClick={handleMoreMedication}>Add more medication</button>
          <button onClick={resetForms}>See medication</button>
        </>
      )}

      {!savedMedication && (
        <>
          {editMedication ? (
            <h1>Edit medication</h1>
          ) : (
            <h1>Add new medication</h1>
          )}

          <button onClick={resetForms}>x</button>

          <form onSubmit={editMedication ? updateMedication : handleSubmit}>
            <label htmlFor="med-name">*Medication name</label>
            <input
              id="med-name"
              type="text"
              placeholder="e.g. Brevecto"
              value={medication.name}
              onChange={(e) =>
                setMedication({ ...medication, name: e.target.value })
              }
            />

            <p>Dosage</p>

            <label htmlFor="med-dose-amount">Dose Amount</label>
            <input
              id="med-dose-amount"
              type="text"
              placeholder="e.g. 25"
              value={medication.dose}
              onChange={(e) =>
                setMedication({ ...medication, dose: e.target.value })
              }
            />

            <label htmlFor="med-frequency">Frequency</label>
            <select
              id="med-frequency"
              value={medication.frequency}
              onChange={(e) =>
                setMedication({ ...medication, frequency: e.target.value })
              }
            >
              <option value="">Select frequency</option>
              <option value="once">Once daily</option>
              <option value="twice">Twice daily</option>
              <option value="eight-hrs">Every 8 hours</option>
              <option value="twelve-hrs">Every 12 hours</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="as-needed">As needed</option>
              <option value="custom">Custom</option>
            </select>

            {medication.frequency === "custom" && (
              <input
                type="text"
                placeholder="e.g. every Saturday and Sunday"
                value={customFrequency}
                onChange={(e) => setCustomFrequency(e.target.value)}
              />
            )}

            <p>Schedule</p>

            <label htmlFor="med-start">Start date</label>
            <input
              id="med-start"
              type="date"
              placeholder="dd/mm/yyyy"
              value={medication.startDate}
              onChange={(e) =>
                setMedication({ ...medication, startDate: e.target.value })
              }
            />

            <label htmlFor="med-end">End date</label>
            <input
              id="med-end"
              type="date"
              placeholder="dd/mm/yyyy"
              value={medication.endDate}
              disabled={isOngoing}
              onChange={(e) =>
                setMedication({ ...medication, endDate: e.target.value })
              }
            />

            <label htmlFor="med-ongoing">Ongoing - no end date</label>
            <input
              id="med-ongoing"
              type="checkbox"
              checked={isOngoing}
              onChange={(e) => setIsOngoing(e.target.checked)}
            />

            <p>Details</p>

            <label htmlFor="med-reason">Reason / condition treated</label>
            <input
              id="med-reason"
              type="text"
              placeholder="e.g. Allergy"
              value={medication.reason}
              onChange={(e) =>
                setMedication({ ...medication, reason: e.target.value })
              }
            />

            <label htmlFor="med-instructions">Instructions & notes</label>
            <input
              id="med-instructions"
              type="text"
              placeholder="e.g. Give with food, store in fridge, monitor for side effects..."
              value={medication.notes}
              onChange={(e) =>
                setMedication({ ...medication, notes: e.target.value })
              }
            />

            <button type="button" onClick={resetForms}>
              Cancel
            </button>
            <button type="submit">Save medication →</button>
          </form>
        </>
      )}
    </>
  );
}

export default MedicationForm;
