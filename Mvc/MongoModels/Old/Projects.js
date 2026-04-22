const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    projectDescription: {
        type: String,
        required: true
    },
    projectDuration: {
        type: String, 
    },
    projectTechStack: {
        type: [String], 
        default: []
    },
    projectImage: {
        type: String, 
    },
    liveLink: {
        type: String, 
    },
    githubLink: {
        type: String, 
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    projectType: {
        type: String
    },
    roleInProject: {
        type: String,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Project", projectSchema);
