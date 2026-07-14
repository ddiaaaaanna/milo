import "./RecentEntries.css";
import useFetch from "../../hooks/useFetch";
import { type JournalType } from "../../types/journal";
import { BookHeart } from "lucide-react";

type RecentEntriesProps = {
  dogId: string;
};

function RecentEntries({ dogId }: RecentEntriesProps) {
  const api = `${import.meta.env.VITE_API_URL}/dogs/${dogId}/journal`;
  const { data } = useFetch<JournalType[]>(api);
  if (!data) return <div className="loader"></div>;

  const recents = data.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date)),
  );

  const showRecents = recents.slice(0, 3);

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <BookHeart size={18} color=" #4a5a2f" />
        <h4>Recent Journal</h4>
      </div>

      {data.length === 0 && <p>No entries yet</p>}

      {data.length > 0 &&
        showRecents.map((e) => (
          <div key={e._id}>
            <p>{e.photo}</p>
            <p>{e.title}</p>
            <p>{new Date(e.date).toLocaleDateString()}</p>
          </div>
        ))}
    </div>
  );
}

export default RecentEntries;
