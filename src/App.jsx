import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './admin/pages/Login';
import DashTable from './admin/pages/DashTable';
import Approval from './admin/pages/Approval/Approval';
import Conference from './admin/pages/Conference/Conference';
import Company from './admin/pages/Company/Company';
import NotFound from './NotFound';
import LandingPage from './users/LandingPage';
import CompanyUser from './users/CompanyUser';
import ApprovalUser from './users/ApprovalUser';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/*' element={<NotFound/>}/>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/u/approval' element={<ApprovalUser/>}/>
        <Route path='/u/companies' element={<CompanyUser/>}/>
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
