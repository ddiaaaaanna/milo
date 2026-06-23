import "./Home.css";
import useFetch from "../../hooks/useFetch";
import { type Dog } from "../../types/dog";
import { Link } from "react-router-dom";

function Home() {
  const api = `http://localhost:5001/dogs`;
  const { data } = useFetch<Dog[]>(api);
  if (!data) return <p>Loading…</p>;

  return (
    <>
      <h1>homepage</h1>
      {data &&
        data.map((d) => (
          <Link to={`/dog/${d._id}`} key={d._id}>
            <p>{d.name}</p>
          </Link>
        ))}
    </>
  );
}

export default Home;
