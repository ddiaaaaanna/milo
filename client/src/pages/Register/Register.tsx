import { Link, useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";
import "./Register.css";
import { useState, type SyntheticEvent } from "react";

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
      <div className="auth-page auth-page--register">
        <div className="auth-left">
          <img src="/milo-logo.png" width={"400px"} />

          <div className="text-part">
            <h1>Your dog's whole story, beautifully kept.</h1>
            <p>
              Create your free account and start building a lifelong record for
              your dog — health, training, and every memorable moment.
            </p>
            <ul>
              <li>Health records & vet visit history</li>
              <li>Training progress tracker</li>
              <li>Private journal with photos</li>
              <li>Medication & vaccination reminders</li>
            </ul>
          </div>
        </div>

        <div className="auth-right">
          <h1>Create an account</h1>

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

            <button type="submit">Create account</button>
          </form>

          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
