const LiveshowModel = require("../../MongoModels/Old/LiveshowsModel");

const CreateLiveController = async (req, res) => {
  try {
    const {
      showName,
      showDate,
      showTime,
      showLocation,
      showDescription,
      showImage,
      SingerName,
      showPrice,
      showDuration,
      showStatus,
      showRating,
      showReviews
    } = req.body;

    const CreateLive = await LiveshowModel.create({
      showName,
      showDate,
      showTime,
      showLocation,
      showDescription,
      showImage,
      SingerName,
      showPrice,
      showDuration,
      showStatus,
      showRating,
      showReviews
    });

    res.status(201).send({
      success: true,
      message: "Live Show Created Successfully",
      Flage: "Y",
      CreateLive
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      Flage: "N",
      message: "Error Occured While Creating Live Show",
      error
    });
  }
};

const getLiveshowController = async (req, res) => {
  try {
    const getLiveshow = await LiveshowModel.find(); 
    res.status(200).send({
      success: true,
      Flage: "Y",
      getLiveshow
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      Flage: "N",
      message: "Error Occured While Getting Live Show",
      error
    });
  }
};

module.exports = { CreateLiveController, getLiveshowController };
