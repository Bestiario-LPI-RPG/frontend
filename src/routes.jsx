import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Create from "./pages/Create/Create.jsx";
import Edit from "./pages/Edit/Edit.jsx";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nova" element={<Create />} />
        <Route path="/editar/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}