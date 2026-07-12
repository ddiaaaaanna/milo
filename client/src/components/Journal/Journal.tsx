import "./Journal.css";
import useFetch from "../../hooks/useFetch";
import { type JournalType } from "../../types/journal";
import { useState } from "react";
import JournalForm from "./JournalForm";
import { BookHeart } from "lucide-react";

type JournalProps = {
  dogId: string;
  name: string;
  breed: string;
};

function Journal({ dogId, name, breed }: JournalProps) {
  const [showForm, setShowForm] = useState(false);
  const [editEntry, setEditEntry] = useState<JournalType | null>(null);

  const api = `http://localhost:5001/dogs/${dogId}/journal`;
  const { data, setData } = useFetch<JournalType[]>(api);
  if (!data) return <div className="loader"></div>;

  function deleteJournalEntry(entryId: string) {
    if (!data) return;
    const currentEntry = data;
    const token = localStorage.getItem("token") || "";

    if (window.confirm("Delete this entry?")) {
      fetch(`http://localhost:5001/journal/${entryId}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }).then(() => {
        const updated = currentEntry.filter((entry) => entry._id !== entryId);
        setData(updated);
      });
    }
  }

  function handleEditEntry(updatedJournalEntry: JournalType) {
    if (!data) return;
    const updatedEntry = data.map((e) =>
      e._id === updatedJournalEntry._id ? updatedJournalEntry : e,
    );
    setData(updatedEntry);
  }

  function handleEntry(newEntry: JournalType) {
    if (!data) return;
    setData([...data, newEntry]);
  }

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <BookHeart />
        <h3>Journal</h3>
      </div>

      {data.length === 0 && <p>No entries yet</p>}
      <button
        type="button"
        onClick={() => {
          setShowForm(true);
          setEditEntry(null);
        }}
        className="card-add-btn"
      >
        New journal entry
      </button>

      {data &&
        data.map((e) => (
          <div key={e._id}>
            <p>{new Date(e.date).toLocaleDateString()}</p>
            <p>{e.title}</p>
            <p>{e.entry}</p>

            <button
              type="button"
              onClick={() => {
                setShowForm(true);
                setEditEntry(e);
              }}
            >
              edit
            </button>
            <button type="button" onClick={() => deleteJournalEntry(e._id)}>
              delete
            </button>
          </div>
        ))}

      {showForm && (
        <JournalForm
          dogId={dogId}
          setShowForm={setShowForm}
          handleEntry={handleEntry}
          editEntry={editEntry}
          setEditEntry={setEditEntry}
          handleEditEntry={handleEditEntry}
          name={name}
          breed={breed}
        />
      )}
    </div>
  );
}

export default Journal;
