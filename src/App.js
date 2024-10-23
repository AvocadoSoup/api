import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Items from "./Items";
import ItemDetails from "./ItemDetails";
import './App.css'; 

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/items" element={<Items />} />
          <Route path="/item-details/:id" element={<ItemDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
