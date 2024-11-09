import { doc,getDocs,query,collection,where } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { db } from '../config'
import Spinner from '../components/Spinner'


const Resume = () => {

    const {id} = useParams()

    

    const [data,setData] = useState(null)
    const [loader,setLoader] = useState(false)

    const fetchResume = async() =>{
        setLoader(true)
        const q = query(collection(db,"users",id,"resume"),where("is_public","==",true))
        const snaps = await getDocs(q);
        snaps.forEach((doc) => {
        setData(doc.data())
        });
        setLoader(false)
    }


    useEffect(()=>{
        fetchResume()
    },[])


  return (
    <div>
    {
    loader==true
    ?
    <div className='mt-20 place-items-center'>
        <Spinner/>
    </div> 
    :
    <div>
        {data==null
        ?
        <h2 className='text-center mt-20'>This resume does not exist!</h2>
        :
        <div className='mt-10'>
            <div className='flex bg-green-400' >
                <img src={data.img} className='w-[120px] sm:w-[200px]' />
                <div className='p-3 w-full'>
                    <h2 className='font-bold text-xl sm:text-3xl lg:text-5xl'>{data.name}</h2>
                    <h4 className='mt-2 '>{data.postion}</h4>
                    <div className='mt-2 sm:mt-14 sm:place-items-end'>
                        <div>
                        <h4 className='text-[10px] sm:text-[15px]'>Email: {data.email}</h4>
                        <h4 className='text-[10px] sm:text-[15px]'>Phone: +{data.phone}</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-5'>

                <div className='sm:flex justify-between'>
                    <div className=''>
                    <h2 className='font-bold'>Bio</h2>
                    </div>
                    <h2 className='w-[80%]'>{data.bio}</h2>
                </div>

                <div className='sm:flex mt-10 justify-between'>
                    <div className=''>
                        <h2 className='font-bold'>Skills</h2>
                    </div>
                    <h2 className='w-[80%]'>{data.skills}</h2>
                </div>

                <div className='sm:flex mt-10 justify-between'>
                    <div className=' '>
                        <h2 className='font-bold'>Experience</h2>
                    </div>
                    <div className='w-[80%]'>
                    <h2 >{data.exp_history}</h2>
                    </div>
                </div>
                
            </div>
        </div>
        }
    </div>   
    }
</div>
  )
}

export default Resume