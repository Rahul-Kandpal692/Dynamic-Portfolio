import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import ManageSkills from './pages/ManageSkills'
import ManageProject from './pages/ManageProject'
import ManageTimeline from './pages/ManageTimeline'
import ViewProject from './pages/ViewProject'
import UpdateProject from './pages/UpdateProject'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import { getUser } from './store/slices/userSlice'
import { getAllMessage } from './store/slices/messageSlice'
import { getAllTimeline } from './store/slices/timelineSlice'
import { getAllSkill } from './store/slices/skillSlice'
import { getAllSoftwareApplications } from './store/slices/softwareApplicationSlice'
import { getAllprojects } from './store/slices/projectSlice'

const App = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getUser());
    dispatch(getAllMessage());
    dispatch(getAllTimeline());
    dispatch(getAllSkill());
    dispatch(getAllSoftwareApplications());
    dispatch(getAllprojects());
  },[])
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/password/forgot" element={<ForgotPassword/>}/>
        <Route path="/password/reset/:token"  element={<ResetPassword/>}/>
        <Route path="/manage/skills" element={<ManageSkills/>}/>
        <Route path="/manage/timeline" element={<ManageTimeline/>}/>
        <Route path="/manage/projects" element={<ManageProject/>}/>
        <Route path="/view/project/:id" element={<ViewProject/>}/>
        <Route path="/update/project/:id" element={<UpdateProject/>}/>
      </Routes>
      <ToastContainer position='bottom-right' theme='dark'/>
    </Router>
  )
}

export default App
