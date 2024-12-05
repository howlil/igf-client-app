import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './admin/pages/Login';
import DashTable from './admin/pages/DashTable';
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
      </Routes>
    </Router>
    </>
  )
}

export default App
