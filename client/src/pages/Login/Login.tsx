import "./Login.css";
import "../../styles/AuthStyles.css";
import { useNavigate } from "react-router-dom";
import { useState, type SyntheticEvent } from "react";
import { Link } from "react-router-dom";

type LoginObject = {
  email: string;
  password: string;
};

function Login() {
  const [loginUser, setLoginUser] = useState<LoginObject>({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(false);

  const navigate = useNavigate();

  function login(e: SyntheticEvent) {
    e.preventDefault();

    const api = `${import.meta.env.VITE_API_URL}/login`;
    fetch(api, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ...loginUser,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          setLoginError(true);
          return;
        }
        return response.text();
      })
      .then((res) => {
        if (!res) return;
        localStorage.setItem("token", res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="auth-page auth-page--login">
        <div className="auth-left">
          <img src="/milo-logo.png" width={"400px"} />
          <div className="text-part">
            <h1>Every moment with your dog deserves to be remembered.</h1>
            <p>
              Health records, training milestones, vet visits, and journal
              entries — all in one calm, organized place.
            </p>
          </div>
        </div>

        <div className="auth-right">
          <h1>Welcome back</h1>
          <p>Sign in to view your dog's records.</p>

          <form onSubmit={login}>
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              value={loginUser.email}
              onChange={(e) =>
                setLoginUser({ ...loginUser, email: e.target.value })
              }
            />

            <label htmlFor="login-pw">Password</label>
            <input
              id="login-pw"
              type="password"
              placeholder="•••••••"
              value={loginUser.password}
              onChange={(e) =>
                setLoginUser({ ...loginUser, password: e.target.value })
              }
            />

            <button type="submit">Login</button>

            {loginError && (
              <p className="login-error">
                This account does not exist. Please create an account.
              </p>
            )}
          </form>

          <p>
            Don't have an account? <Link to="/register">Create Account</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
