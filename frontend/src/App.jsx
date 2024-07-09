import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Landing from "./components/main/Landing";
import Register from "./components/header/Register";
import Login from "./components/header/Login";
import About from "./components/main/About";
import Dashboard from "./components/main/Dashboard";

function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
