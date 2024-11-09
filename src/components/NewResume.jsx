import React, { useContext, useState } from 'react'
import Modal from './Modal'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../config'
import { User } from '../context'


const NewResume = (props) => {
   

    const u = useContext(User)
    const user = u.user

    const [name,setName] = useState('')
    const [postion,setPosition] = useState('')
    const [yearExp,setYearExp] = useState(null)
    const [phone,setPhone] = useState(null)
    const [skills,setSkills] = useState('')
    const [exp,setExp] = useState('')
    const [img,setImg] = useState('')

    const generateContent =async (prompt) =>{
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
        const result = await model.generateContent(prompt);
        return result.response.text()
    }
    
    const [loader,setLoader] = useState(false)
      
    const makeResume = async () =>{
        if(name !== '' && postion !== '' && yearExp !== null && phone !== null && skills !== '' && exp !== '' && img !== ''){
            setLoader(true)
            let bioPrompt = `write a bio about me as a/an ${postion} having ${yearExp} years of experience in one paragrph.`
            let expPrompt = `write my experience history as a ${postion} having worked at ${exp} in points, no headings.`

            let Bio = await generateContent(bioPrompt)
            let ExpHistory = await generateContent(expPrompt)

            let data = {
                name:name,
                postion:postion,
                year_of_exp:yearExp,
                phone:phone,
                skills:skills,
                bio: Bio,
                exp_history:ExpHistory,
                exp:exp,
                img:img,
                email:user.email,
                is_public:false,
                time:new Date()
            }

            console.log(data)
            const docRef = collection(db,"users",user.uid,"resume")
            await addDoc(docRef,data)
            setLoader(false)
            props.ref((prev)=>prev+1)
            props.onClose()

        }else{
            alert('Some fields are still missing!')
        }
      }



  return (
    <Modal open={props.open} onClose={props.onClose} >
        <div className='absolute w-full sm:w-[700px] bg-white sm:left-1/2 sm:-translate-x-1/2 p-5 rounded-xl' >
        <span class="flex w-3 h-3 me-3 bg-red-500 rounded-full cursor-pointer" onClick={()=>{props.onClose()}}></span>
            <div className='mt-5'>
                <h2 className='font-bold text-xl' >New Resume</h2>
                <div className='flex flex-wrap mt-5'>
                    <input placeholder='Your full name eg. Harry Man' className='border-2 p-2 w-[100%] sm:w-[50%] mb-2 sm:mb:0' onChange={(text)=>{setName(text.target.value)}}/>
                    <input placeholder='Your position eg. Web Developer' className='border-2 p-2 w-[100%] sm:w-[50%] mb-2 sm:mb:0' onChange={(text)=>{setPosition(text.target.value)}}/>
                </div>
                <div className='flex flex-wrap mt-2'>
                    <input placeholder='Years of experience eg. 3' type='number' className='border-2 p-2 w-[100%] sm:w-[50%] mb-2 sm:mb:0' onChange={(text)=>{setYearExp(text.target.value)}}/>
                    <input placeholder='Your phone no. eg. 919342198453' className='border-2 p-2 w-[100%] sm:w-[50%] mb-2 sm:mb:0' onChange={(text)=>{setPhone(text.target.value)}}/>
                </div>
                <div className='mt-2'>
                    <textarea placeholder='All your skills eg. HTML, Javascript, Python, React' className='border-2 p-2 w-[100%] sm:w-[100%] mb-2 sm:mb:0' onChange={(text)=>{setSkills(text.target.value)}}/>
                </div>
                <div className='mt-2'>
                    <textarea placeholder='Add all your work experience eg. Web Developer at Google (July 2022 - September 2023), Mobile App Developer at Apple (October 2023 - till date), if you dont have any experience add projects here eg. Angry Birds Project (June 2024 - October 2024) ' className='border-2 p-2 w-[100%] sm:w-[100%] h-[300px] mb-2 sm:mb:0' onChange={(text)=>{setExp(text.target.value)}}/>
                </div>
                <div>
                    <input placeholder='Your image url' className='border-2 p-2 w-[100%] sm:w-[100%] mb-2 sm:mb:0' onChange={(text)=>{setImg(text.target.value)}}/>
                </div>
                
                <button className='p-3 bg-black text-white rounded-xl flex justify-self-end' onClick={()=>{makeResume()}}>
                   {loader==true?'Making your resume..': 'Make me a resume!'}
                </button>
            </div>
        </div>
    </Modal>
  )
}

export default NewResume