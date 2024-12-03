import './App.css'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './admin/pages/Login';
import DashTable from './admin/pages/DashTable';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard-table' element={<DashTable/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
