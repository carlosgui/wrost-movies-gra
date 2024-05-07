import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Movielist from "./pages/movielist";

export default function Paths() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={Dashboard} />
        <Route path="/Movielist" Component={Movielist} />
      </Routes>
    </BrowserRouter>
  );
}
