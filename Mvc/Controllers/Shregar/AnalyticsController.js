const ScreenTrack = require("../../MongoModels/ShrigarModel/AnalyticsModel");


// 🟢 ENTER SCREEN
const screenTrackController = async (req, res) => {
  try {
    const { userId, sessionId, screen, screenKey, productId } = req.body;

    if (!sessionId || !screen) {
      return res.status(400).json({
        success: false,
        message: "sessionId and screen are required",
      });
    }

    // 🔴 Close previous active screen
    const activeTrack = await ScreenTrack.findOne({
      sessionId,
      endTime: null,
    });

    if (activeTrack) {
      activeTrack.endTime = new Date();
      activeTrack.duration =
        (activeTrack.endTime - activeTrack.startTime) / 1000;

      await activeTrack.save();
    }

    // 🟢 Start new screen
    const track = await ScreenTrack.create({
      userId,
      sessionId,
      screen,
      screenKey,
      productId,
      startTime: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Entered screen",
      track,
    });

  } catch (error) {
    console.error("SCREEN TRACK ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// 🟢 EXIT SCREEN (optional)
const exitScreenController = async (req, res) => {
  try {
    const { sessionId } = req.body;

    const track = await ScreenTrack.findOne({
      sessionId,
      endTime: null,
    });

    if (track) {
      track.endTime = new Date();
      track.duration = (track.endTime - track.startTime) / 1000;

      await track.save();
    }

    res.json({
      success: true,
      message: "Screen exited",
    });

  } catch (error) {
    console.error("EXIT SCREEN ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// 🟢 GET USER JOURNEY
const getJourneyController = async (req, res) => {
  try {
    const { sessionId } = req.query;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: "sessionId is required",
      });
    }

    const journey = await ScreenTrack.find({ sessionId })
      .sort({ startTime: 1 });

    res.json({
      success: true,
      journey,
    });

  } catch (error) {
    console.error("JOURNEY ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// 🟢 CURRENT SCREEN (LIVE USER STATE)
const getCurrentScreenController = async (req, res) => {
  try {
    const { sessionId } = req.query;

    const current = await ScreenTrack.findOne({
      sessionId,
      endTime: null,
    });

    res.json({
      success: true,
      currentScreen: current,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  screenTrackController,
  exitScreenController,
  getJourneyController,
  getCurrentScreenController,
};
