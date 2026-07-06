import "./Navigation.css";
import { Link, useNavigate } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <nav className="sidebar">
      <Link to="/" className="sidebar-logo">
        milo
      </Link>

      <div className="options">
        <Link to="/">dashboard</Link>
        <Link to="/create">add dog</Link>

        <Link to="/settings">settings</Link>
      </div>

      <div className="sidebar-bottom">
        <button type="button" onClick={logout}>
          logout
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
