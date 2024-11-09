import { GoogleGenerativeAI } from "@google/generative-ai";
import { getCourses, getJobs } from "../functions";
import { fetchCoursesFunctionDeclaration, fetchJobsFunctionDeclaration } from "./geminiFunctionDeclarations";
import TextEl from "../../src/components/TextEl";

const API_KEY = process.env.GEMINI_API_KEY

const GeminiResponse = async(input) =>{

    const functions = {
        fetchJobs:({job_position,location,job_type,is_remote,func,prompt})=>{
            return getJobs(job_position,location,job_type,is_remote,prompt)
        },
        fetchCourses:({topic,prompt,func})=>{
            return getCourses(topic,prompt)
        }
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const genModel = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        tools:{
            functionDeclarations:[fetchJobsFunctionDeclaration,fetchCoursesFunctionDeclaration]
        }
     });
    
    const prompt = input||"Explain how AI works";
    const chat = genModel.startChat();
    const result = await chat.sendMessage(prompt)

    const call = result.response.functionCalls()
  if(call !== undefined){
    const call = result.response.functionCalls()[0]
    if(call){
      const apiResponse = await functions[call.name](call.args);
      console.log(apiResponse)
       return apiResponse
    }
  }else{
    const result = await genModel.generateContent(prompt);
    let res_data = {
        from:'ai',
        element:<TextEl text={result.response.text()}/>,
        time: new Date()
    }
    console.log(res_data)
    return res_data
  }

   
}

export {GeminiResponse}
