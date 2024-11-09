import React, { useState } from 'react'
import Auth from '../components/Auth'

const Home = () => {

  const [open,setOpen] = useState(false)

  const features = [
    {img:'https://img.freepik.com/free-vector/chat-bot-concept-illustration_114360-5522.jpg',title:'Search like you talk',des:'Our intelligent system delivers accurate results and insightful alternatives in real-time, enhancing your search experience.'},
    {img:'https://img.freepik.com/free-vector/freelancer-working-laptop-her-house_1150-35054.jpg',title:'Most recent job openings',des:'Our cutting-edge job board scours the web to bring you the most recent and relevant job openings.'},
    {img:'https://img.freepik.com/premium-vector/work-home-illustration-design-freelance-woman-sitting-chair-working-laptop_100562-415.jpg',title:'Powerful resume builder',des:'Craft a compelling resume that showcases your unique skills and experiences'},
    {img:'https://img.freepik.com/premium-vector/illustration-earth_498740-5038.jpg',title:'Share your resume with the world',des:'You can easily share your meticulously crafted resume with potential employers, recruiters, and your network.'},
    {img:'https://img.freepik.com/free-vector/maths-online-course-economics-university-department-internet-classes-accounting-lessons-bookkeeping-mathematics-textbooks-digital-archive_335657-3441.jpg?semt=ais_hybrid',title:'Find top notch courses/resources',des:'We helps you identify top-notch courses and resources to enhance your skills and knowledge.'},
    {img:'https://img.freepik.com/premium-vector/employee-performance-report-flat-illustration_203633-3991.jpg',title:'Track your learning journey and job applications',des:'Keep tabs on your learning journey and see how far you have come.'}
  ]

  return (
    <div>
      <Auth open={open} onClose={()=>{setOpen(false)}} />
      <div className='flex items-center'>
      <svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18.5A2.493 2.493 0 0 1 7.51 20H7.5a2.468 2.468 0 0 1-2.4-3.154 2.98 2.98 0 0 1-.85-5.274 2.468 2.468 0 0 1 .92-3.182 2.477 2.477 0 0 1 1.876-3.344 2.5 2.5 0 0 1 3.41-1.856A2.5 2.5 0 0 1 12 5.5m0 13v-13m0 13a2.493 2.493 0 0 0 4.49 1.5h.01a2.468 2.468 0 0 0 2.403-3.154 2.98 2.98 0 0 0 .847-5.274 2.468 2.468 0 0 0-.921-3.182 2.477 2.477 0 0 0-1.875-3.344A2.5 2.5 0 0 0 14.5 3 2.5 2.5 0 0 0 12 5.5m-8 5a2.5 2.5 0 0 1 3.48-2.3m-.28 8.551a3 3 0 0 1-2.953-5.185M20 10.5a2.5 2.5 0 0 0-3.481-2.3m.28 8.551a3 3 0 0 0 2.954-5.185"/>
      </svg>
      <h2 className='ml-2 text-[18px]'>Guide AI</h2>
      </div>

      <div className='w-full text-center bg-white p-5 rounded-xl place-items-center mt-10' >
          <h2 className='mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl'>Navigate Your Career with Confidence</h2>
          <h4 className='w-full text-sm sm:w-[80%] xl:text-lg' >GuideAI is your personal AI assistant designed to help you navigate your career journey. It provides tailored responses on job hunting, skill development, and resume building.</h4>
          <div className='mt-8'>
            <button className='p-3 bg-blue-500 font-bold text-white rounded-lg hover:bg-black' onClick={()=>{setOpen(true)}}>
              Get Started
            </button>
            <a href='#features' className='p-3 bg-[#a9a9a9] font-bold text-white rounded-lg hover:bg-black ml-5'>
              Features
            </a>
          </div>
      </div>
      
      <div className='mt-10 sm:mt-20 place-items-center'>
      <a name='features' />
        <div className='flex items-center'>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThr7qrIazsvZwJuw-uZCtLzIjaAyVW_ZrlEQ&s' className='w-[30px] rounded-full'/>
          <h2 className='ml-2 '>Powered by Gemini</h2>
        </div>
        <h2 className='font-bold text-5xl mt-5'>Guide AI Features</h2>
        <h4 className='mt-3 text-lg'>Find opportunities, enhance your skill and build an amazing resume</h4>
        
        <div className='flex flex-wrap justify-center'>
          {features.map((item,index)=>{
            return(
              <div key={index} className='p-2 bg-white m-[5px] w-[300px] rounded-lg' >
                <img src={item.img} className='w-[300px]'/>
                <h2 className='text-center font-bold text-xl'>{item.title}</h2>
                <h4 className='text-center'>{item.des}</h4>
              </div>
            )
          })}
        </div>
      </div>

      <div className='flex mt-20 justify-center'>
        <h2>Built with love, by <a href='https://fiz.codes'>fiz.codes</a> at HTF'24</h2>
      </div>

    </div>
  )
}

export default Home