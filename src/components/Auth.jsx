import React, { useContext, useState } from 'react'
import Modal from './Modal'
import { User } from '../context'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {auth} from '../config'

const Auth = (props) => {
  const u = useContext(User)
  const user = u.user
  console.log(user)

  const [loader,setLoader] = useState(false)

  const handleAuth = async() =>{
  
    const provider = new GoogleAuthProvider();
    setLoader(true)
    await signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      u.setUser(user)
      setLoader(false)
     
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      setLoader(false)
    });
  } 


  return (
    <Modal open={props.open} onClose={props.onClose} >
      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full sm:h-[600px] sm:w-[500px] bg-white p-5 rounded-xl'>
      <span class="flex w-3 h-3 me-3 bg-red-500 rounded-full cursor-pointer" onClick={()=>{props.onClose()}}></span>
      <div className='place-items-center'>
        <img src='https://thumb.ac-illust.com/65/6548c5765671eb381e561ac4beafbe0f_t.jpeg' className='w-[80%]' />
      </div>
        <div className='flex items-center justify-center mb-5'>
          <svg className="w-[50px] h-[50px] sm:w-[80px] sm:h-[80px] text-gray-800 e" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.1" d="M12 18.5A2.493 2.493 0 0 1 7.51 20H7.5a2.468 2.468 0 0 1-2.4-3.154 2.98 2.98 0 0 1-.85-5.274 2.468 2.468 0 0 1 .92-3.182 2.477 2.477 0 0 1 1.876-3.344 2.5 2.5 0 0 1 3.41-1.856A2.5 2.5 0 0 1 12 5.5m0 13v-13m0 13a2.493 2.493 0 0 0 4.49 1.5h.01a2.468 2.468 0 0 0 2.403-3.154 2.98 2.98 0 0 0 .847-5.274 2.468 2.468 0 0 0-.921-3.182 2.477 2.477 0 0 0-1.875-3.344A2.5 2.5 0 0 0 14.5 3 2.5 2.5 0 0 0 12 5.5m-8 5a2.5 2.5 0 0 1 3.48-2.3m-.28 8.551a3 3 0 0 1-2.953-5.185M20 10.5a2.5 2.5 0 0 0-3.481-2.3m.28 8.551a3 3 0 0 0 2.954-5.185"/>
          </svg>
          <h3 className='text-5xl sm:text-7xl font-bold'>Guide AI</h3>
        </div>
        <h4 className='text-center text-[15px]' >GuideAI is more than just a tool; it's your partner in achieving career success. We're here to help you navigate the complex job market, unlock your potential, and land your dream job.</h4>
        <button className='flex p-5 mt-5 bg-black text-white font-bold w-full text-[20px] rounded-xl items-center justify-center' onClick={()=>{handleAuth()}}>
        <svg className="w-6 h-6 text-gray-800 dark:text-white mr-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M12.037 21.998a10.313 10.313 0 0 1-7.168-3.049 9.888 9.888 0 0 1-2.868-7.118 9.947 9.947 0 0 1 3.064-6.949A10.37 10.37 0 0 1 12.212 2h.176a9.935 9.935 0 0 1 6.614 2.564L16.457 6.88a6.187 6.187 0 0 0-4.131-1.566 6.9 6.9 0 0 0-4.794 1.913 6.618 6.618 0 0 0-2.045 4.657 6.608 6.608 0 0 0 1.882 4.723 6.891 6.891 0 0 0 4.725 2.07h.143c1.41.072 2.8-.354 3.917-1.2a5.77 5.77 0 0 0 2.172-3.41l.043-.117H12.22v-3.41h9.678c.075.617.109 1.238.1 1.859-.099 5.741-4.017 9.6-9.746 9.6l-.215-.002Z" clip-rule="evenodd"/>
        </svg>
          {loader==true?'Authenticating...':'Authenticate'}
        </button>
      </div>
    </Modal>
  )
}

export default Auth