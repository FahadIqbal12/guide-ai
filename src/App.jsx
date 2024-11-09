import { useEffect, useState } from 'react'
import './App.css'
import { ChatHist, User } from './context'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Sidebar from './components/Sidebar'
import NotFound from './pages/NotFound'
import { auth } from './config'
import Preview from './pages/Preview'
import Resume from './pages/Resume'


function App() {
  const [user,setUser] = useState(null)
  const [chatHist,setChatHist] = useState([])

  useEffect(()=>{
    console.log(auth.currentUser)
    setUser(auth.currentUser)
  },[])


  return (
    <div className='flex justify-center'>
      <div className='p-5 w-full xl:w-[1024px]'>
    <User.Provider value={{user:user,setUser:setUser}}>
      {
        user == null?
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/resume/:id' element={<Resume/>} />
          <Route path='*' element={<NotFound/>}/>
        </Routes>
        :
        <>
        <ChatHist.Provider value={{chatHist:chatHist,setChatHist:setChatHist}}>
        <Routes>
          <Route path='/' element={<Chat/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/profile/preview/:id' element={<Preview/>}/>
          <Route path='/resume/:id' element={<Resume/>} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
        </ChatHist.Provider>
        <Sidebar/>
        </>
        
      }
    </User.Provider>
    </div>
    </div>
  )
}

export default App
