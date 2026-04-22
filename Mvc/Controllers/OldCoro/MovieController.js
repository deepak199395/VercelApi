const MovieTickets = require("../../MongoModels/Old/MovieModel");

const CreateMovieController = async (req, res) => {
    try {
        const {
            movieId,
            MovieName,
            MovieDescription,
            MovieImage,
            MovieRating,
            MovieReleaseDate,
            MovieGenre,
            MovieLanguage
        } = req.body;

        if (
            !movieId || !MovieName || !MovieDescription || !MovieImage ||
            !MovieRating || !MovieReleaseDate || !MovieGenre || !MovieLanguage
        ) {
            return res.status(400).json({
                status: false,
                message: "All fields are required",
                flag: "N"
            });
        }

        // Create movie
        const newMovie = await MovieTickets.create({
            movieId,
            MovieName,
            MovieDescription,
            MovieImage,
            MovieRating,
            MovieReleaseDate,
            MovieGenre,
            MovieLanguage
        });

        return res.status(201).json({
            status: true,
            message: "Movie created successfully",
            flag: "Y",
            newMovie
        });

    } catch (error) {
        console.error("Error in CreateMovieController:", error);
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            flag: "N"
        });
    }
};

const getMovieDetailsController=async(req,res)=>{
   try {
    const getMovie= await MovieTickets.find()
    res.status(201).json({
        status:true,
        message:"Movie details fetched successfully",
        flag:"Y",
        getMovie
    })
   } catch (error) {
    console.error("Error in getMovieDetailsController:", error);
    return res.status(500).json({
        status: false,
        message: "Internal server error",
        flag: "N"
        });
    
   }
}

module.exports = { CreateMovieController,getMovieDetailsController};
