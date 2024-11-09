import React, { useContext, useState } from 'react'
import ChatInput from '../components/ChatInput'
import { ChatHist, User } from '../context'

const Chat = () => {
  const ch = useContext(ChatHist)
  const chat = ch.chatHist

  const u = useContext(User)
  const user = u.user


  const [loader,setLoader] = useState(false)

  const prompts = [
    'Find me a Data Analyst remote job!',
    'Suggest me a best free course on Web development.',
    'I want to learn to about Machine Learning for free!',
    'Write a resume for me as a mobile app developer.'
  ]

  

  return (
    <div className=''>
      <div className='flex h-screen'>
        <div className='w-full h-[85%] overflow-y-scroll'>
        {chat.length == 0 ?
          <div className='mt-20'>
              <h2 className='text-xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text'>Hi there, {user.displayName}<br/> What whould you like to know?</h2>
              <h4 className='font-bold text-[#898B94]'>Use one of the most common prompts<br/>below or use your own to begin.</h4>
              <div className='flex flex-wrap mt-2'>
              {
                prompts.map((item,index)=>{
                  return(
                    <div key={index} className='flex p-2 w-[200px] h-[100px] mr-2 mt-2 rounded-xl border-2 border-[#E4E3E3] hover:border-black'div>
                      <h4 className='text-left'>{item}</h4>
                    </div>
                  )
                })
              }
              </div>
            </div>:
            <div className='flex-row w-full mt-10 '>
        {chat.map((item,index)=>{
          return(
            <div key={index} className='flex-row bg-white p-3 w-[80%] xl:w-[50%] mb-8 rounded-2xl' style={{justifySelf:item.from=='user'?'end':'start',borderBottomRightRadius:item.from=='user'?0:12,borderBottomLeftRadius:item.from=='ai'?0:12}}>
              {item.from=='user'
              ?
              <h2 className=''>{item.msg}</h2>
              :
              <>
              {item.element}
              </>
              }
              <h4 className='text-sm mt-2 text-[#898B94]' style={{justifySelf:item.from=='user'?'end':'start'}} >{item.from=='user'?'You':'Guide AI'}</h4>
            </div>
          )
        })}
        {loader == true ?
          <div className='flex-row bg-white p-3 w-[80%] xl:w-[50%] mb-8 rounded-2xl rounded-bl-none'>
            <h2>Thinking...</h2>
            <h4 className='text-sm mt-2 text-[#898B94]'>Guide AI</h4>
          </div>:''
        }
        </div>
        }
        
        </div>
      </div>
      <ChatInput loader={setLoader}/>
    </div>
  )
}

export default Chat