// app.jsx

import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import Login from './components/login';
import Home from './components/home';
import Main from './components/main';
import Payments from './components/Payments';
import Client from './components/Client';
import Files from './components/Files';
import Reports from './components/Reports';
import Templates from './components/Templates';
import System from './components/System';
import Law from './components/Law';
import Lawsuites from "./components/Lawsuites.jsx"
import ClientId from './components/ClientId.jsx';
import TemplateId from './screens/TemplateId1.jsx';
import LawsuitesId from "./components/LawsuitesId.jsx"
function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route path="/home" element={<Main />}>
          <Route index element={<Home/>} />
          <Route path="client" element={<Client/>} />
          <Route path="client/:id" element={<ClientId/>} />
          <Route path="payments" element={<Payments/>} />
          <Route path="lawsuites" element={<Lawsuites />} />
          <Route path="lawsuites/:id" element={<LawsuitesId />} />

          <Route path="files" element={<Files/>} />
          <Route path="reports" element={<Reports/>} />
          <Route path="templates" element={<Templates/>} />
          <Route path="templates/:id" element={<TemplateId/>} />
          <Route path="system" element={<System/>} />
          <Route path="law" element={<Law/>} />
        </Route>
      </Route>
    </Routes>
  </div>
  );
}

export default App;


