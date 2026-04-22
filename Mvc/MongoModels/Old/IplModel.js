const mongoose = require("mongoose")

const iplTickesSchema = new mongoose.Schema({
    matchId: {
        type: String,
        required: true
    },
    matchName: {
        type: String,
        required: true
    },
    matchDate: {
        type: String,
        required: true
    },
    matchTime: {
        type: String,
        required: true
    },
    matchVenue: {
        type: String,
    },
    matchTeam1: {
        type: String,
        required: true
    },
    matchTeam2: {
        type: String,
        required: true
    },
    matchTicketPrice: {
        type: String,
        required: true
    },
    matchTicketQuantity: {
        type: String,
        required: true
    },
    matchTicketStatus: {
        type: String,
        required: true
    },
    matchTicketBookingStatus: {
        type: String,
    },
    matchTicketBookingDate: {
        type: String,
    },
    matchTicketBookingTime: {
        type: String,
    },
    matchTicketBookingAmount: {
        type: String,
        required: true
    },
    TeamImage: {
        type: String,
        required: true
    },
    TeamLogo: {
        type: String,
        required: true
    },
    TeamName: {
        type: String,
        required: true
    },
    flag:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('matchTicket', iplTickesSchema);

