import React,{useContext, useState} from 'react'
import { GeminiResponse } from '../../backend/ai/gemini'
import { ChatHist } from '../context'
import d from '../../dummy_data/jobs'

const ChatInput = (props) => {
  const ch = useContext(ChatHist)
  const chat = ch.chatHist


  const [input,setInput] = useState('')

  
  

  const handleSubmit = () =>{
    props.loader(true)
    if(input !== ''){ 
      ch.setChatHist((prev)=>[...prev,{from:'user',msg:input,time:new Date()}])
      handleAIResponse()
    }else{
      alert('Please enter something')
    }
  }

  const handleAIResponse =async () =>{
    let res =await GeminiResponse(input)
    ch.setChatHist((prev=>[...prev,res]))
    setInput('')
    props.loader(false)
  }


  return (
    <div className='bg-white absolute w-[90%] xl:w-[1024px] bottom-5 flex justify-between h-[50px] rounded-l-xl'>
        <input placeholder='write here...' className='w-[90%] h-full p-2 mb-2 rounded-l-xl' onChange={(text)=>{setInput(text.target.value)}}/>
        <button className='p-2 bg-black text-white active:border-white focus:border-white rounded-r-xl w-[10%]' onClick={()=>{handleSubmit()}}>
            Submit
        </button>
    </div>
  )
}

export default ChatInput