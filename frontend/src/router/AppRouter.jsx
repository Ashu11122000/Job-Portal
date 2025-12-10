import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login.jsx";
import Home from "../pages/Home.jsx";
// ...other imports

export default function AppRouter() {
  return (
    <BrowserRouter>
      {/* Navbar is probably here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* other routes */}
      </Routes>
    </BrowserRouter>
  );
}
