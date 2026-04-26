const ScreenTrack = require("../../MongoModels/ShrigarModel/AnalyticsModel");
const screenTrackController = async (req, res) => {
  try {
    const { userId, sessionId, screen, screenKey, productId } = req.body;

    console.log("📥 TRACK REQUEST:", req.body);

    if (!sessionId || !screen || !screenKey) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    /* 🔴 STEP 1: Close previous active screen */
    await ScreenTrack.updateMany(
      { sessionId, endTime: null },
      [
        {
          $set: {
            endTime: new Date(),
            duration: {
              $divide: [
                { $subtract: [new Date(), "$startTime"] },
                1000,
              ],
            },
          },
        },
      ]
    );

    /* 🟢 STEP 2: Start new screen */
    const track = await ScreenTrack.create({
      userId: userId || null,
      sessionId,
      screen,
      screenKey,
      productId: productId || null,
    });

    res.json({
      success: true,
      message: "Entered screen",
      track,
    });
  } catch (error) {
    console.error("❌ ENTER ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

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
    console.error("❌ EXIT ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getJourneyController = async (req, res) => {
  try {
    const { sessionId } = req.query;

    const journey = await ScreenTrack.find().sort({
      startTime: -1,
    });

    res.json({
      success: true,
      totalSteps: journey.length,
      journey,
    });
  } catch (error) {
    console.error("❌ JOURNEY ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getCurrentScreenController = async (req, res) => {
  try {
    const { sessionId } = req.query;

    const current = await ScreenTrack.findOne({
      sessionId,
      endTime: null,
    }).sort({ startTime: -1 });

    res.json({
      success: true,
      currentScreen: current || null,
    });
  } catch (error) {
    console.error("❌ CURRENT SCREEN ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ======================================================
   📈 FUNNEL ANALYTICS (VERY POWERFUL 🚀)
====================================================== */
const getFunnelAnalytics = async (req, res) => {
  try {
    const data = await ScreenTrack.aggregate([
      {
        $group: {
          _id: "$screen",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.json({
      success: true,
      funnel: data,
    });
  } catch (error) {
    console.error("❌ FUNNEL ERROR:", error);
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
  getFunnelAnalytics,
};