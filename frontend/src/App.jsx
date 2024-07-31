import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Landing from "./components/main/Landing";
import Register from "./components/header/Register";
import Login from "./components/header/Login";
import About from "./components/main/About";
import Library from './components/main/Library';
import Dashboard from "./components/main/Dashboard";
import ControlPanel from "./components/main/ControlPanel";
import Proposal from "./components/main/Proposal";
import Secret from "./components/main/Secret";
import SoftwareEngineering from './components/main/SoftwareEngineering';
import {ContextProvider} from "./components/main/Context";

function App() {

  return (
    <>
      <ContextProvider>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/secret" element={<Secret />}/>
      <Route path="/library" element={<Library />} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/controlpanel" element={<ControlPanel/>} />
      <Route path="/proposal" element={<Proposal />} />
      <Route path='/softwareEngineering' element={<SoftwareEngineering />} />
      </Routes>
      </BrowserRouter>
      </ContextProvider>
    </>
  )
}

export default App
