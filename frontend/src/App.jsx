import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import Dashboard from './pages/Dashboard'
import Upload from './pages/Upload'
import ProtectedRoute from './Components/common/ProtectedRoute'

const App = () => {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/auth' element={<Auth />} />

        {/* Protected Routes */}
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path='/reports' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path='/upload' element={
          <ProtectedRoute>
            <Upload />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}

export default App
