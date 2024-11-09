import React, { useContext, useEffect, useState } from 'react'
import { collection, query, where, getDocs, orderBy,doc,deleteDoc } from "firebase/firestore";
import { db } from '../config';
import { User } from '../context';
import Spinner from '../components/Spinner';

const Dashboard = () => {
  const u = useContext(User)
  const user = u.user

  const [myJobs,setMyJobs] = useState([])
  const [myCourse,setMyCourse] = useState([])

  const [jobId,setJobId] = useState([])
  const [courseId,setCourseId] = useState([])

  const [loader,setLoader] = useState(true)
  const [REFRESH,setREFRESH] = useState(0)


  const fetchInfo = async() =>{
    setLoader(true)
    try{
      setMyCourse([])
      setMyJobs([])
      setJobId([])
      setCourseId([])
      const job_q = query(collection(db,"users",user.uid,"saved_jobs"),orderBy("time","asc"));
      const j_querySnapshot = await getDocs(job_q);
      j_querySnapshot.forEach((doc) => {
        setMyJobs((prev)=>[...prev,doc.data()])
        setJobId((prev)=>[...prev,doc.id])
      });
      const course_q = query(collection(db,"users",user.uid,"saved_courses"),orderBy("time","desc"));
      const c_querySnapshot = await getDocs(course_q);
      c_querySnapshot.forEach((doc) => {
        setMyCourse((prev)=>[...prev,doc.data()])
        setCourseId((prev)=>[...prev,doc.id])
      });
      setLoader(false)
    
    }
    catch(e){
      setLoader(false)
      console.log(error)
    }
  }

  const deleteJob = async(index) =>{
    const docRef = doc(db,"users",user.uid,"saved_jobs",jobId[index])
    await deleteDoc(docRef)
    setREFRESH((prev)=>prev+1)
  }

  const deleteCourse = async(index) =>{
    const docRef = doc(db,"users",user.uid,"saved_courses",courseId[index])
    await deleteDoc(docRef)
    setREFRESH((prev)=>prev+1)
  }

  var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    function kFormatter(num) {
      return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
    }

  useEffect(()=>{
    fetchInfo()
  },[REFRESH])


  return (
    <div>
      <h2 className='font-bold text-3xl mt-10 sm:mt-0 sm:text-5xl' >Dashboard</h2>
      {loader == true ?
      <div className='place-items-center mt-20' >
       <Spinner/>
       </div>
       :
      <div className='mt-5' >
        <h2 className='text-xl' >Saved Jobs:</h2>
        <div className='flex flex-wrap h-96 overflow-y-scroll'>
        {myJobs.map((it,index)=>{
          let item = it.data[0]
          let exp = new Date(item.job_offer_expiration_datetime_utc||{})
          return(
            <div key={index} className='p-2 border rounded-x mt-5 bg-white w-full sm:w-[300px] h-[200px] mr-5 flex-wrap' >
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                <img src={item.employer_logo}  className='w-5 h-5 rounded-full'/>
                <a href={item.employer_website} target='_blank'><h2 className='ml-1 text-[10px] underline'>{item.employer_name}</h2></a>
                </div>
                <h2 className='text-[10px] font-bold'>{item.job_employment_type}</h2>
              </div>

              <h2 className='font-bold text-black text-lg' >{item.job_title}</h2>
              <h2 className='text-[12px]'>Salary range (Rs.): {kFormatter(item.job_min_salary)==0?'N/A':kFormatter(item.job_min_salary)} - {kFormatter(item.job_max_salary)==0?'N/A':kFormatter(item.job_max_salary)}</h2>
              <h2 className='text-[12px]'>Exprience required: {item.job_required_experience.required_experience_in_months || 0} Months</h2>
              
              <div className='flex justify-between'>
              <h2 className='text-[12px]'>Remote possible: {item.job_is_remote==true?'Yes':'No'}</h2>
              <h2 className='text-[12px] text-red-500'>Apply before: {exp.getDate()} {mS[exp.getMonth()]} {exp.getFullYear()}</h2>
              </div>

              <div className='flex justify-between mt-5'>
                <a className='p-1 bg-blue-400 rounded-lg font-bold text-white text-[14px] cursor-pointer' href={item.job_apply_link} target='_blank'>
                  Apply now
                </a>
                <button className='p-1 bg-black rounded-lg font-bold text-white text-[14px]' onClick={()=>{deleteJob(index)}}>
                  Delete
                </button>
              </div>
            </div>
          )
        })}
        </div>
        <h2 className='text-xl mt-5'>Saved Courses: </h2>
        <div className='flex flex-wrap h-96 overflow-y-scroll'>
          {myCourse.map((it,index)=>{
            let item = it.data[0]
            return(
              <div key={index} className='mt-1 border-b-2 p-1 w-full sm:w-[300px] sm:h-[300px] bg-white rounded-lg mr-5'>
                        <img src={item.thumbnails[0].url} className='w-full rounded-lg' />
                        <div className='ml-2'>
                            <h2 className='text-[15px]' >{(item.title).substring(0,50)}....</h2>
                            <h4 className='text-[10px] mt-1' >By {item.author}</h4>
                            <div className='mt-3 flex justify-between'>
                                <button className='p-1 text-[14px] bg-red-500 font-bold text-white rounded-lg' disabled={loader}>
                                    Youtube
                                </button>
                                <button className='p-1 text-[14px] bg-black font-bold text-white rounded-lg' disabled={loader} onClick={()=>{deleteCourse(index)}}>
                                   Delete
                                </button>
                            </div>
                        </div>
                    </div>
            )
          })}
        </div>
      </div>
      }
      
    </div>
  )
}

export default Dashboard