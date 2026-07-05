import { Link } from "react-router-dom";
import "./PageNotFound.css";

function PageNotFound() {
  return (
    <>
      <h1>404</h1>
      <p>Oops! This page is not found.</p>

      <Link to="/">Home</Link>
    </>
  );
}

export default PageNotFound;
