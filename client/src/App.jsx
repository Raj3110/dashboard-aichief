import './App.css'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import GetAcessPage from './pages/GetAcessPage'

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.setAttribute('data-theme', localStorage.getItem('theme') || theme);
    setTheme(localStorage.getItem('theme') || theme);
  }, [theme]);

  return (
    <div>
      <BrowserRouter>
        <Navbar theme={theme} setTheme={setTheme} />
        <div className='pages'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/get-access' element={<GetAcessPage />} />
          </Routes>
        </div>
      </BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  )
}

export default App