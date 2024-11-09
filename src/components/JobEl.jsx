import { addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import { User } from "../context";
import { db } from "../config";
import { useNavigate } from "react-router-dom";


const JobEl = (props) =>{
  const navigate = useNavigate()

  const u = useContext(User)
  const user = u.user

  const [loader,setLoader] = useState()
  const [i,setI] = useState(null)

  const saveJobs = async(item) =>{
    const docRef = collection(db,"users",user.uid,"saved_jobs")
    setLoader(true)
    await addDoc(docRef,{data:[item],time:new Date()})
    setI(null)
    navigate('/dashboard')
    setLoader(false)
  }

  



    let data = props.data || []
    var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    function kFormatter(num) {
      return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
    }

    return(
      <div>
{data.length !== 0 ?
<div>
        <h2>I found these jobs...</h2>
        {data.map((item,index)=>{
          let exp = new Date(item.job_offer_expiration_datetime_utc||{})
          return(
            <div key={index} className='p-2 border rounded-x mt-5'>
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
              <h2 className='text-[12px]'>Job city: {item.job_city}, {item.job_country}</h2>
              <h2 className='text-[12px]'>Remote possible: {item.job_is_remote==true?'Yes':'No'}</h2>
              <h2 className='text-[12px]'>Apply before: {exp.getDate()} {mS[exp.getMonth()]} {exp.getFullYear()}</h2>
              </div>

              <div className='flex justify-between mt-5'>
                <a className='p-1 bg-blue-400 rounded-lg font-bold text-white text-[14px] cursor-pointer' href={item.job_apply_link} target='_blank'>
                  Apply via {item.job_publisher}
                </a>
                <button className='p-1 bg-black rounded-lg font-bold text-white text-[14px]' onClick={()=>{setI(index);saveJobs(item)}}>
                  {loader==true && i==index?'Saving':'Save'}
                </button>
              </div>
            </div>
          )
        })}
        </div>
:<h2>Sorry, No jobs were found!</h2>
        }
      </div>
    )
  }

  export default JobEl