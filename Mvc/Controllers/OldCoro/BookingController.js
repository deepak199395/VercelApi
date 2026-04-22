const BookingTicket = require('../../MongoModels/Old/BookingModel')
const createBooking = async (req, res) => {
    try {
        const { fullname,PhoneNumber,Adress,NumberofTickets} = req.body;
        const Booking = await BookingTicket.create({
            fullname,
            PhoneNumber,
            Adress,
            NumberofTickets
        })
        res.status(201).send({
            message: "Booking created successfully",
            Booking
        })
    } catch (error) {
        res.status(500).send({
            message: "Error creating booking",
            error
        })
    }
}
const getBookingControllers = async (req, res) => {
    try {
        const getbookingdetails = await BookingTicket.find()
        res.status(200).send({
            message: "Booking details retrieved successfully",
            getbookingdetails
        })
    } catch (error) {
        res.status(500).send({
            message: "Error retrieving booking details",
            error
        })
    }
}
module.exports = {createBooking,getBookingControllers }