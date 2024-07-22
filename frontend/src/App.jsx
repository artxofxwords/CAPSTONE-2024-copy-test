import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Landing from "./components/main/Landing";
import Register from "./components/header/Register";
import Login from "./components/header/Login";
import NewProposalForm from "./modals/NewProposalForm";
import About from "./components/main/About";
import Library from './components/main/Library';
import Dashboard from "./components/main/Dashboard";
import ControlPanel from "./components/main/ControlPanel";
import Secret from "./components/main/Secret";

function App() {
  
  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/proposal" element={<NewProposalForm />} />
      <Route path="/about" element={<About />} />
      <Route path="/secret" element={<Secret />}/>
      <Route path="/library" element={<Library />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/controlpanel" element={<ControlPanel />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
