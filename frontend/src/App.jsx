import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import StudentHome from './components/StudentHome'
import MentorHome from './components/MentorHome'
import StudentResquest from './components/StudentResquest'
import MentorRequest from './components/MentorRequest'
import Register from './components/Register'
import OAuthSuccess from './components/OAuth'


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/studentHome" element={<StudentHome />} />
          <Route path="/mentorHome" element={<MentorRequest/>}></Route>
          <Route path="/requests" element={<StudentResquest />} />
          <Route path="/mentorRequests" element={<MentorRequest />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  )
}

export default App