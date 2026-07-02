import "./RecentEntries.css";
import useFetch from "../../hooks/useFetch";
import { type JournalType } from "../../types/journal";

type RecentEntriesProps = {
  dogId: string;
};

function RecentEntries({ dogId }: RecentEntriesProps) {
  const api = `http://localhost:5001/dogs/${dogId}/journal`;
  const { data } = useFetch<JournalType[]>(api);
  if (!data) return <div className="loader"></div>;

  const recents = data.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date)),
  );

  const showRecents = recents.slice(0, 3);

  return (
    <>
      <p>Recent Journal</p>
      {data.length === 0 && <p>No entries yet</p>}

      {data.length > 0 &&
        showRecents.map((e) => (
          <div key={e._id}>
            <p>{e.photo}</p>
            <p>{e.title}</p>
            <p>{new Date(e.date).toLocaleDateString()}</p>
          </div>
        ))}
    </>
  );
}

export default RecentEntries;
