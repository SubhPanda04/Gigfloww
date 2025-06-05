import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Dashboard from './pages/Dashboard/Dashboard'
import People from './pages/People/People'
import Hiring from './pages/Hiring/Hiring'
import Salary from './pages/Salary/Salary'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/people" element={<People />} />
            <Route path="/hiring" element={<Hiring />} />
            <Route path="/salary" element={<Salary />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
