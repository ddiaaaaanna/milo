import "./MedicationForm.css";
import { useState, type SyntheticEvent } from "react";
import { type Medication } from "../../types/medication";

type MedicationProps = {
  dogId: string;
  setShowForm: (value: boolean) => void;
  handleMedication: (newMedication: Medication) => void;
};

function MedicationForm({
  dogId,
  setShowForm,
  handleMedication,
}: MedicationProps) {
  const [name, setName] = useState("");
  const [dose, setDose] = useState("");
  const [notes, setNotes] = useState("");
  const [reason, setReason] = useState("");
  const [frequency, setFrequency] = useState("");
  const [customFrequency, setCustomFrequency] = useState("");
  const [vetVisitId, setVetVisitId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isOngoing, setIsOngoing] = useState(false);

  const [savedMedication, setSavedMedication] = useState(false);

  function clearForm() {
    (setReason(""),
      setName(""),
      setDose(""),
      setNotes(""),
      setFrequency(""),
      setCustomFrequency(""),
      setIsOngoing(false),
      setVetVisitId(""),
      setStartDate(""),
      setEndDate(""));
  }

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const finalFrequency = frequency === "custom" ? customFrequency : frequency;
    const finalEndDate = isOngoing ? "" : endDate;

    const api = `http://localhost:5001/medication`;
    fetch(api, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        reason,
        name,
        dose,
        notes,
        frequency: finalFrequency,
        vetVisitId,
        startDate,
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
  }

  function handleMoreMedication() {
    clearForm();
    setSavedMedication(false);
  }

  return (
    <>
      {savedMedication && (
        <>
          <p>Your medication was logged</p>
          <button onClick={handleMoreMedication}>Add more medication</button>
          <button onClick={() => setShowForm(false)}>See medication</button>
        </>
      )}

      {!savedMedication && (
        <>
          <h1>Add new medication</h1>

          <button onClick={() => setShowForm(false)}>x</button>

          <form onSubmit={handleSubmit}>
            <label htmlFor="name">*Medication name</label>
            <input
              type="text"
              placeholder="e.g. Brevecto"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <p>Dosage</p>

            <label htmlFor="dose-amount">Dose Amount</label>
            <input
              type="text"
              placeholder="e.g. 25"
              value={dose}
              onChange={(e) => setDose(e.target.value)}
            />

            <label htmlFor="frequency">Frequency</label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
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

            {frequency === "custom" && (
              <input
                type="text"
                placeholder="e.g. every Saturday and Sunday"
                value={customFrequency}
                onChange={(e) => setCustomFrequency(e.target.value)}
              />
            )}

            <p>Schedule</p>

            <label htmlFor="start">Start date</label>
            <input
              type="date"
              placeholder="dd/mm/yyyy"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <label htmlFor="end">End date</label>
            <input
              type="date"
              placeholder="dd/mm/yyyy"
              value={endDate}
              disabled={isOngoing}
              onChange={(e) => setEndDate(e.target.value)}
            />

            <label htmlFor="ongoing">Ongoing - no end date</label>
            <input
              type="checkbox"
              checked={isOngoing}
              onChange={(e) => setIsOngoing(e.target.checked)}
            />

            <p>Details</p>

            <label htmlFor="reason">Reason / condition treated</label>
            <input
              type="text"
              placeholder="e.g. Allergy"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />

            <label htmlFor="instructions">Instructions & notes</label>
            <input
              type="text"
              placeholder="e.g. Give with food, store in fridge, monitor for side effects..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            <button type="button" onClick={clearForm}>
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
