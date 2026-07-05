import type { JournalType } from "../../types/journal";
import "./JournalForm.css";
import { useState, type SyntheticEvent } from "react";

type JournalFormProps = {
  dogId: string;
  setShowForm: (value: boolean) => void;
  handleEntry: (newEntry: JournalType) => void;
  editEntry: JournalType | null;
  setEditEntry: (value: JournalType | null) => void;
  handleEditEntry: (updatedJournalEntry: JournalType) => void;
  name: string;
};

type JournalObject = {
  photo: string;
  title: string;
  date: string;
  entry: string;
};

function JournalForm({
  dogId,
  setShowForm,
  handleEntry,
  editEntry,
  setEditEntry,
  handleEditEntry,
  name,
}: JournalFormProps) {
  const initialEntry = editEntry
    ? {
        photo: editEntry.photo || "",
        title: editEntry.title,
        date: editEntry.date ? editEntry.date.split("T")[0] : "",
        entry: editEntry.entry,
      }
    : {
        photo: "",
        title: "",
        date: "",
        entry: "",
      };

  const [entry, setEntry] = useState<JournalObject>(initialEntry);
  const [savedEntry, setSavedEntry] = useState(false);
  const token = localStorage.getItem("token") || "";

  function clearForm() {
    setEntry({
      photo: "",
      title: "",
      date: "",
      entry: "",
    });
  }

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    const api = `http://localhost:5001/journal`;
    fetch(api, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        ...entry,
        dogId,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        (setSavedEntry(true), handleEntry(result));
      });

    clearForm();
    setEditEntry(null);
  }

  function updateEntry(e: SyntheticEvent) {
    e.preventDefault();

    const api = `http://localhost:5001/journal/${editEntry?._id}`;
    fetch(api, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        ...entry,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        (setSavedEntry(true), handleEditEntry(result));
      });

    clearForm();
    setEditEntry(null);
  }

  function handleMoreEntries() {
    clearForm();
    setSavedEntry(false);
  }

  function resetForms() {
    clearForm();
    setShowForm(false);
    setEditEntry(null);
    setSavedEntry(false);
  }

  return (
    <>
      {savedEntry && (
        <>
          <p>Your entry was logged</p>
          <button onClick={handleMoreEntries}>Add another entry</button>
          <button onClick={resetForms}>See Entries</button>
        </>
      )}

      {!savedEntry && (
        <>
          {editEntry ? <h1>Edit entry</h1> : <h1>Add new entry</h1>}

          <button onClick={resetForms}>x</button>

          <form onSubmit={editEntry ? updateEntry : handleSubmit}>
            <label htmlFor="journal-title">Title *</label>
            <input
              type="text"
              id="journal-title"
              placeholder="e.g. First swim, vet visit update..."
              value={entry.title}
              onChange={(e) => setEntry({ ...entry, title: e.target.value })}
            />

            <label htmlFor="journal-date">Date</label>
            <input
              id="journal-date"
              type="date"
              placeholder="dd/mm/yyyy"
              value={entry.date}
              onChange={(e) => setEntry({ ...entry, date: e.target.value })}
            />

            <label htmlFor="journal-entry">Entry</label>
            <input
              style={{ width: "500px" }}
              id="journal-entry"
              type="text"
              placeholder={`What happened today? How was ${name}? Write freely...`}
              value={entry.entry}
              onChange={(e) => setEntry({ ...entry, entry: e.target.value })}
            />

            <button type="button" onClick={resetForms}>
              Cancel
            </button>
            <button type="submit">Save entry</button>
          </form>
        </>
      )}
    </>
  );
}

export default JournalForm;
