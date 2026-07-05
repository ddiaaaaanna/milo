import "./Navigation.css";
import { useNavigate } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <nav>
      <p>home</p>
      <button type="button" onClick={logout}>
        logout
      </button>
    </nav>
  );
}

export default Navigation;
