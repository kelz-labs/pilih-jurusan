import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import Home from "./pages/home";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <div className="bg-pilihjurusan w-full bg-bottom bg-no-repeat bg-cover min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/login" element={<Login />} />
            <Route />
          </Routes>
        </div>
      </BrowserRouter>
      <Toaster position="top-right" />
    </>
  );
}
