import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './admin/pages/Login';
import DashTable from './admin/pages/DashTable';
import Approval from './admin/pages/Approval/Approval';
import Conference from './admin/pages/Conference/Conference';
import Company from './admin/pages/Company/Company';
import NotFound from './NotFound';
import NotAllowed from './NotAllowed';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/*' element={<NotFound/>}/>
        <Route path='/notAllowed' element={<NotAllowed/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/u/approval' element={<ApprovalUser/>}/>
        <Route path='/u/schedules' element={<ScheduleUser/>}/>
        <Route path='/u/companies' element={<CompanyUser/>}/>
        <Route path='/u/companies/id' element={<DetailCompany/>}/>
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
