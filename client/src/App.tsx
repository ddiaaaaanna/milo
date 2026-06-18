import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import CreateDog from "./pages/CreateDog/CreateDog";
import DogProfile from "./pages/DogProfile/DogProfile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreateDog />} />
          <Route path="/dog/:id" element={<DogProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
