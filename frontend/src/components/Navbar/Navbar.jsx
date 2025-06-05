import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-1">
            <span className="text-blue-500 text-2xl font-bold">.R</span>
            <span className="text-gray-900 text-2xl font-bold">GIGFLOWW</span>
          </Link>
          <div className="flex space-x-4">
            <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
            <Link to="/people" className="text-gray-600 hover:text-gray-900">People</Link>
            <Link to="/hiring" className="text-gray-600 hover:text-gray-900">Hiring</Link>
            <Link to="/salary" className="text-gray-600 hover:text-gray-900">Salary</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar