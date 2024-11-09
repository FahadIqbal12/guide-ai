import axios from "axios"
import JobEl from '.././src/components/JobEl'
import CourseEl from "../src/components/CourseEl"


const getJobs = async(job_position,location,job_type,is_remote,prompt) =>{

    let q = `${job_position} in ${location} ${is_remote==true?'remote':'not remote'} for ${job_type}`

    const options = {
        method: 'GET',
        url: 'https://jsearch.p.rapidapi.com/search',
        params: {
          query: q,
          page: '1',
          num_pages: '1',
          date_posted: 'month'
        },
        headers: {
          'x-rapidapi-key': 'a9a4680735msh7ecf8b1cb8cf618p1e8738jsn5a099ce02397',
          'x-rapidapi-host': 'jsearch.p.rapidapi.com'
        }
      }
      let data = []
      try {
          const response = await axios.request(options);
          data = response.data.data
      } catch (error) {
          console.error(error);
          data = []
      }


    const res_data = {
        from:'ai',
        element:<JobEl data={data}/>,
        time:new Date()
    }
    return res_data
}

const getCourses = async(topic,prompt)=>{
  
  const options = {
    method: 'GET',
    url: 'https://youtube-v2.p.rapidapi.com/search/',
    params: {
      query: topic,
    },
    headers: {
      'x-rapidapi-key': 'a9a4680735msh7ecf8b1cb8cf618p1e8738jsn5a099ce02397',
      'x-rapidapi-host': 'youtube-v2.p.rapidapi.com'
    }
  };
  
  let data = []
  try {
    const response = await axios.request(options);
    console.log(response.data);
    data = response.data.videos
  } catch (error) {
    console.error(error);
  }

    const res_data = {
      from:'ai',
      element:<CourseEl data={data}/>,
      time:new Date()
  }
    return res_data
}


export {getJobs,getCourses}