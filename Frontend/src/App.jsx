import { useState } from 'react'
import './App.css'
import { ThemeProvider } from './components/theme-provider'
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProjectView from './pages/ProjectView'
import Footer from './pages/Footer'
import { ModeToggle } from './components/mode-toggle'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ParticleBg from './pages/miniComponents/ParticleBg'


function App() {


  return (
    <>
    
     <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ParticleBg  id="particles"></ParticleBg>
      <Router>
        <ModeToggle classname="bg-white"/>
        <Routes>

          <Route path='/' element={<Home/>}></Route>
          <Route path='/project/:id' element={<ProjectView/>}></Route>
        </Routes>
        <Footer/>
        <ToastContainer position='bottom-right'/>
      </Router>

     </ThemeProvider>


    </>
  )
}

export default App
