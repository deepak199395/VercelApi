const mongoose = require("mongoose")

const liveshowSchema = new mongoose.Schema({
    showName: {
        type: String,
    },
    showDate: {
        type: String,
    },
    showTime: {
        type: String,
    },
    showLocation: {
        type: String,
    },
    showDescription: {
        type: String,
    },
    showImage: {
        type: String,
    },
    SingerName: {
        type: String,

    },
    showPrice: {
        type: String,
    },
    showDuration: {
        type: String,
    },
    showStatus: {
        type: String,
    },
    showRating: {
        type: String,
    },
    showReviews: {
        type: String,
    },
},
{ timestamps: true }
)

module.exports = mongoose.model('LiveshowModel',liveshowSchema );
