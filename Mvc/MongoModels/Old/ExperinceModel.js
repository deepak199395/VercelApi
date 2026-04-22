const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
    experinceYear: {
        type: String,
    },
    experinceMonth: {
        type: String,
    },
    startdateL: {
        type: Date,
    },
    enddateL: {
        type: Date,
    },
    experinceDescription: {
        type: String,
    },
    experinceLocation: {
        type: String,
    },
    experinceJobTitle: {
        type: String,
    },
    experinceCompany: {
        type: String,
    },
    experinceResponsibilities: {
        type: String, 
    },
    experinceAchievements: {
        type: String, 
    },
    experinceSkills: {
        type: String,
    },
    companylogo: {
        type: String,
    },
    companyWebsite: {
        type: String,
    },
    companyEmail: {
        type: String,
    },
    companyPhone: {
        type: String,
    },
    companyAddress: {
        type: String,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Experience', experienceSchema);
