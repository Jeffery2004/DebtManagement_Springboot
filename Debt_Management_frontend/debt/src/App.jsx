import React from "react";
import {Route,Routes } from "react-router-dom";
import Register from "./components/Register";
import Home from './components/Home';
import Login from './components/Login';
import AddUser from './components/AddDebt';
import UpdateDebt from './components/UpdateDebt';
import RetrieveDebt from "./components/RetrieveDebt";
import ViewDebt from "./components/ViewDebt"
import Report from './components/Report'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/addDebt" element={<AddUser />}></Route>
      <Route path="/update/:id" element={<UpdateDebt />}></Route>
      <Route path="/retrieve" element={< RetrieveDebt/>}></Route>
      <Route path="/view/:id" element={<ViewDebt />}></Route>
      <Route path="/report" element={< Report/>}></Route>

    </Routes>
  );
}

export default App;
