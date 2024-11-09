const fetchJobsFunctionDeclaration = {
    name:"fetchJobs",
    description:"Get job position, location, job type, remote option from any sentence if provided",
    parameters:{
        type:"OBJECT",
        properties:{
            job_position:{
                type:"STRING",
                description:"Job postion or role"
            },
            location:{
                type:"STRING",
                description:"name of the location if provided otherwise India"
            },
            job_type:{
                type:"STRING",
                description:"type of job full time, part time, internship, contract if not provided always full time"
            },
            is_remote:{
                type:"BOOLEAN",
                description:"if remote option is provided then return true, if not provided always false"
            },
            prompt:{
                type:"STRING",
                description:"write the complete prompt provided"
            },
            func:{
                type:"STRING",
                description:"Based on the prompt should we use `fecthJobs`, `none` function"
            }
        },
        required:["job_position","prompt","func"]
    }
}

const fetchCoursesFunctionDeclaration = {
    name:"fetchCourses",
    description:"get courses or learning material on the topic provided",
    parameters:{
        type:"OBJECT",
        properties:{
            topic:{
                type:"STRING",
                description:"get the provided topic"
            }, 
            prompt:{
                type:"STRING",
                description:"write the complete prompt provided"
            },
            func:{
                type:"STRING",
                description:"Based on the prompt should we use `fecthJobs`, `none` function"
            }
        },
        required:["topic","prompt","func"]
    }
}


export {fetchJobsFunctionDeclaration,fetchCoursesFunctionDeclaration}