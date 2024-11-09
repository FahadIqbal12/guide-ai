import React,{ useContext, useState } from 'react'
import { addDoc, collection } from "firebase/firestore";
import { User } from "../context";
import { db } from "../config";
import { useNavigate } from "react-router-dom";

const CourseEl = (props) => {

    let data = props.data

    const navigate = useNavigate()

  const u = useContext(User)
  const user = u.user

  const [loader,setLoader] = useState()
  const [i,setI] = useState(null)

    const saveCourse = async(item) =>{
        const docRef = collection(db,"users",user.uid,"saved_courses")
        setLoader(true)
        await addDoc(docRef,{data:[item],time:new Date()})
        setI(null)
        navigate('/dashboard')
        setLoader(false)
      }


  return (
    <div>
        
        {data.length !== 0 
        ?
        <div>
            <h2>Here are list of top courses/resources that you can use...</h2>
            <div>
            {data.map((item,index)=>{
                return(
                    <div key={index} className='flex mt-1 border-b-2 p-1 w-full'>
                        <img src={item.thumbnails[0].url} className='w-[150px] rounded-lg' />
                        <div className='ml-2 w-full'>
                            <h2 className='text-[15px]' >{(item.title).substring(0,36)}...</h2>
                            <h4 className='text-[10px] mt-1' >{item.author}</h4>
                            <div className='mt-3 flex justify-between w-full'>
                                <button className='p-1 text-[14px] bg-red-500 font-bold text-white rounded-lg' disabled={loader}>
                                    Youtube
                                </button>
                                <button className='p-1 text-[14px] bg-black font-bold text-white rounded-lg' disabled={loader} onClick={()=>{setI(index);saveCourse(item)}}>
                                    {loader==true && i==index?'Saving':'Save to courses'}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })}
            </div>
        </div>
            :
            <h2>Sorry, No courses/resources found!</h2>
        }
    </div>
  )
}

export default CourseEl