import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register, Login, Chat } from "./pages";

const App = () => {
  <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Chat />} />
    </Routes>
  </BrowserRouter>;
};

export default App;
