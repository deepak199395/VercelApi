const matchTicket = require("../../MongoModels/Old/IplModel")
const CreateTickets = async (req, res) => {
    try {
        const { matchId,
            matchName,
            matchDate,
            matchTime,
            matchTeam1,
            matchTeam2,
            matchTicketPrice,
            matchTicketQuantity,
            matchTicketStatus,
            matchTicketBookingStatus,
            matchTicketBookingDate,
            matchTicketBookingTime,
            matchTicketBookingAmount,
            TeamImage,
            TeamLogo,
            flag,
            TeamName } = req.body;
        const newTicket = await matchTicket.create({
            matchId,
            matchName,
            matchDate,
            matchTime,
            matchTeam1,
            matchTeam2,
            matchTicketPrice,
            matchTicketQuantity,
            matchTicketStatus,
            matchTicketBookingStatus,
            matchTicketBookingDate,
            matchTicketBookingTime,
            matchTicketBookingAmount,
            TeamImage,
            TeamLogo,
            TeamName,
            flag
        })
        res.status(201).send({
            success: true,
            message: "Ticket Created Successfully",
            newTicket
        })
    } catch (error) {
        console.log("error in creating tickets ", error)
        res.status(500).send({
            success: false,
            message: "Error in Creating Tickets"
        })

    }
}
const getTicketInfo = async (req, res) => {
    try {
        const ticketsinfo = await matchTicket.find()
        res.status(200).send({
            
            success: true,
            message: "Tickets Info", ticketsinfo
        })

    } catch (error) {
        console.log("find error in api ", error)
        res.status(500).send({
            success: false,
            message: "Error in Finding Tickets Info"
        })
    }
}
module.exports = { CreateTickets, getTicketInfo }