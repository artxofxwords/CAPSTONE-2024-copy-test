import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./components/main/Landing";
import Register from "./components/header/Register";
import Login from "./components/header/Login";
import ForgotPassword from './components/main/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import About from "./components/main/About";
import Secret from "./components/main/Secret";
import Library from "./components/main/Library";
import Dashboard from "./components/main/Dashboard";
import ControlPanel from "./components/main/ControlPanel";
import Proposal from "./components/main/Proposal";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
      <Route path="/about" element={<About />} />
      <Route path="/secret" element={<Secret />}/>
      <Route path="/library" element={<Library />} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/controlpanel" element={<ControlPanel/>} />
      <Route path="/proposal" element={<Proposal />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
