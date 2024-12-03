import './App.css'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './b2b-matchmaking/pages/LandingPage';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/matchmaking' element={<LandingPage/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
