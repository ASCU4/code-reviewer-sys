import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import Dashboard from './pages/Dashboard'
import Upload from './pages/Upload'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/reports' element={<Dashboard />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </div>
  )
}

export default App
