const mongoose = require("mongoose")
const moviesSchema = new  mongoose.Schema({
    movieId:{
        type:String,
     },
    MovieName: {
        type: String,
    },
    MovieDescription: {
        type: String,
    },
    MovieImage: {
        type: String,
    },
    MovieRating: {
        type: Number,
    },
    MovieReleaseDate: {
        type: String,
    },
    MovieGenre: {
        type: String,
    },
    MovieLanguage: {
        type: String,
    },
    MovieDuration: {
        type: String,
    },
    MovieCast: {
        type: String,
    },
    MovieDirector: {
        type: String,
    },
    MovieProducer: {
        type: String,
    },
    MovieMusic: {
        type: String,
    },
    MovieCinematography: {
        type: String,
    },
    MovieEditing: {
        type: String,
    },
    MovieProductionHouse: {
        type: String,
    },
    MovieDistributor: {
        type: String,
    },
    MovieReleaseYear: {
        type: String,
    },
    MovieBoxOffice: {
        type: String,
    },
    MovieAwards: {
        type: String,
    },
    MovieNominations: {
        type: String,
    },
    MovieIMDbRating: {
        type: String,
    },
    MovieIMDbVotes: {
        type: String,
    },
    MovieMetacriticRating: {
        type: String,
    },
    MovieMetacriticReviews: {
        type: String,
    },
    MovieRottenTomatoesRating: {
        type: String,
    },
    MovieRottenTomatoesReviews: {
        type: String,
    },
    ticketPrice: {
        type: String,
    },







})

module.exports=mongoose.model("MovieTickets",moviesSchema)