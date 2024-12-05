import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './admin/pages/Login';
import DashTable from './admin/pages/DashTable';
import Approval from './admin/pages/Approval/Approval';
import Conference from './admin/pages/Conference/Conference';
import Company from './admin/pages/Company/Company';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard-table' element={<DashTable/>}/>
        <Route path='/approval' element={<Approval/>}/>
        <Route path='/conference' element={<Conference/>}/>
        <Route path='/company' element={<Company/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
