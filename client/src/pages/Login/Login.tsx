import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useState, type SyntheticEvent } from "react";

type LoginObject = {
  email: string;
  password: string;
};

function Login() {
  const [loginUser, setLoginUser] = useState<LoginObject>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function login(e: SyntheticEvent) {
    e.preventDefault();

    const api = `http://localhost:5001/login`;
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
        return response.json();
      })
      .then(() => navigate("/"))
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
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
      </form>
    </>
  );
}

export default Login;
