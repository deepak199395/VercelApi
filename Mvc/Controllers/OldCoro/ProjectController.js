const ProjectModel= require("../../MongoModels/Old/Projects")

const createProjectController=async(req,res)=>{
    const {projectName,projectDescription,projectDuration,projectTechStack, projectImage,
        liveLink,
        githubLink,
        startDate,
        endDate,
        projectType,
        roleInProject }=req.body
    try {
          const createProject= await ProjectModel.create({ projectName, projectDescription,projectDuration,
            projectTechStack,
            projectImage,
            liveLink,
            githubLink,
            startDate,
            endDate,
            projectType,
            roleInProject
            })
            res.status(201).json({message:"Project Created Successfully",data:createProject})
          
    } catch (error) {
        res.status(500).json({message:"Error Creating Project",data:error})
        
    }

}
const getProjectController=async(req,res)=>{
    try {
        const getProject= await ProjectModel.find()
        res.status(200).json({message:"Project Retrieved Successfully",data:getProject})
    } catch (error) {
        res.status(500).json({message:"Error Retrieving Project",data:error})
        
    }
}
module.exports={createProjectController,getProjectController } 