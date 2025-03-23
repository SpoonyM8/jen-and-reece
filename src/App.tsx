import './App.css'
import NavBar from './components/NavBar/NavBar'
import Router from './components/Router/Router'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Router />
    </AuthProvider>
  )
}

export default App
