import { collection, orderBy, query,getDocs,Timestamp, doc, updateDoc, where } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../config'
import { User } from '../context'
import Spinner from '../components/Spinner'
import NewResume from '../components/NewResume'
import { useNavigate } from 'react-router-dom'


const Profile = () => {
  const navigate = useNavigate()

  const u = useContext(User)
  const user= u.user

  const [myResume,setMyResume] = useState([])
  const [resIds,setResIds] = useState([])

  const [REFRESH,setREFRESH] = useState(0)

  const [loader,setLoader] = useState(true)
  const [newRes,setNewRes] = useState(false)



  const fetchResume =async () =>{
    setMyResume([])
    setResIds([])
    setLoader(true)
    try{
    const q = query(collection(db,"users",user.uid,"resume"),orderBy("time","desc"))
    const snaps = await getDocs(q);
    snaps.forEach((doc) => {
      setMyResume((prev)=>[...prev,doc.data()])
      setResIds((prev)=>[...prev,doc.id])
      console.log(doc.data())
    });
    setLoader(false)
    }catch(e){
      setMyResume([])
      setLoader(false)
      console.log(e)
    }
  }

  const makePrivate =async (index) =>{
    const docRef = doc(db,"users",user.uid,"resume",resIds[index])
    await updateDoc(docRef,{is_public:false})
    setREFRESH((prev)=>prev+1)
  }

  const makePublic = async(index) =>{
    let pub_id = null
    const q = query(collection(db,"users",user.uid,"resume"),where("is_public","==",true))
    const snaps = await getDocs(q);
    snaps.forEach((doc) => {
      pub_id = doc.id
    });
    if(pub_id !== null){
    const PubDocRef = doc(db,"users",user.uid,"resume",pub_id)
    await updateDoc(PubDocRef,{is_public:false})
    }
    const docRef = doc(db,"users",user.uid,"resume",resIds[index])
    await updateDoc(docRef,{is_public:true})
    setREFRESH((prev)=>prev+1)
  }
  




  useEffect(()=>{
    fetchResume()
  },[REFRESH])

  return (
    <div>
      <h2 className='font-bold text-3xl mt-10 sm:mt-0 sm:text-5xl' >You</h2>
     {loader == true ?
        <div className='mt-20 place-items-center' >
          <Spinner/>
        </div>
        :
      <div>
        <NewResume open={newRes} onClose={()=>{setNewRes(false)}} refresh={setREFRESH}/>
        <div className='mt-5 border-b-2 border-black p-2' >
          <button className='p-2 bg-black text-white rounded-xl' onClick={()=>{navigate(`/resume/${user.uid}`)}}>
            Public Resume
          </button>
          <button className='p-2 bg-black text-white rounded-xl ml-2' onClick={()=>{setNewRes(true)}}>
            New Resume
          </button>
        </div>
        <div>
          {myResume.length==0?
          <h2>No resume saved!</h2>
          :
          <div className='flex flex-wrap mt-2'>
           
          {myResume.map((item,index)=>{
            let year = new Date(item.time.seconds*1000)
            
            return(
              <div key={index} className='p-2 bg-white place-items-center rounded-lg mr-2'>
                <div onClick={()=>{navigate(`/profile/preview/${resIds[index]}`)}} className='cursor-pointer'>
                <svg class="w-32 h-32 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Z" clip-rule="evenodd"/>
                </svg>
                <h2 className='text-[15px]'>{item.postion},{year.getFullYear()}</h2>
                </div>
                <button className='text-[12px] p-1 text-white rounded-md flex w-full justify-center mt-1' style={{backgroundColor:item.is_public==true?'red':'green'}} onClick={()=>{item.is_public==true?makePrivate(index):makePublic(index)}}>
                  {item.is_public==true?'Make Private':'Make Public'}
                </button>
              </div>
            )
          })}
          
          </div>
          }
        </div>
      </div>
    
    }
    </div>
  )
}

export default Profile