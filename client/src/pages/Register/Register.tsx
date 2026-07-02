import { Link } from "react-router-dom";
import "./Register.css";
import { useState, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";

type UserObject = {
  name: string;
  email: string;
  password: string;
};

function Register() {
  const [user, setUser] = useState<UserObject>({
    name: "",
    email: "",
    password: "",
  });

  const [confirmPw, setConfirmPw] = useState("");
  const [passwordsMatchErr, setPasswordsMatchErr] = useState(false);
  const navigate = useNavigate();

  function createUser(e: SyntheticEvent) {
    e.preventDefault();
    setPasswordsMatchErr(false);

    if (user.password !== confirmPw) {
      setPasswordsMatchErr(true);
      return;
    }

    const api = `http://localhost:5001/user`;
    fetch(api, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ...user,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then(() => navigate("/create"))
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <h1>Create account</h1>

      <form onSubmit={createUser}>
        <label htmlFor="register-name">Full name</label>
        <input
          id="register-name"
          type="text"
          placeholder="Jane Smith"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />

        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          type="email"
          placeholder="you@example.com"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          type="password"
          placeholder="Create a strong password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <label htmlFor="register-confirm-password">Confirm Password</label>
        <input
          id="register-confirm-password"
          type="password"
          placeholder="Repeat your password"
          value={confirmPw}
          onChange={(e) => setConfirmPw(e.target.value)}
        />
        {passwordsMatchErr && <p>Passwords do not match</p>}

        {/*  navigate to create dog */}
        <button type="submit">Create account</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </>
  );
}

export default Register;
