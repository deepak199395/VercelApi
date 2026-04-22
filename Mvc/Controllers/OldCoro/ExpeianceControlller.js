const experienceModel = require('../../MongoModels/Old/ExperinceModel'); 

// Create Experience
const createExperience = async (req, res) => {
    try {
        const {
            experinceYear,
            experinceMonth,
            startdateL,
            enddateL,
            experinceDescription,
            experinceLocation,
            experinceJobTitle,
            experinceCompany,
            experinceResponsibilities,
            experinceAchievements,
            experinceSkills,
            companylogo,
            companyWebsite,
            companyEmail,
            companyPhone,
            companyAddress
        } = req.body;

        const newExperience = await experienceModel.create({
            experinceYear,
            experinceMonth,
            startdateL,
            enddateL,
            experinceDescription,
            experinceLocation,
            experinceJobTitle,
            experinceCompany,
            experinceResponsibilities,
            experinceAchievements,
            experinceSkills,
            companylogo,
            companyWebsite,
            companyEmail,
            companyPhone,
            companyAddress
        });

        res.status(201).send({
            message: "Experience created successfully",
            newExperience
        });

    } catch (error) {
        res.status(500).send({
            message: "Error creating experience",
            error: error.message
        });
    }
};

// Get All Experiences
const getExperienceController = async (req, res) => {
    try {
        const allExperiences = await experienceModel.find();
        res.status(200).send({
            message: "Experiences retrieved successfully",
            allExperiences
        });
    } catch (error) {
        res.status(500).send({
            message: "Error retrieving experiences",
            error: error.message
        });
    }
};

module.exports = {
    createExperience,
    getExperienceController
};
