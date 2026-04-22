const mongoose = require("mongoose")

const BookingSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    PhoneNumber: {
        type: Number,
        required: true
    },
    Adress: {
        type: String,
        required: true
    },
    NumberofTickets: {
        type: Number,
        required: true
    }
})
module.exports = mongoose.model('BookingTicket', BookingSchema);
