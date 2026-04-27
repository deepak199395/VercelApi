const ScreenTrack = require("../../MongoModels/ShrigarModel/AnalyticsModel");
const screenTrackController = async (req, res) => {
  try {
    const { userId, email, phone, sessionId, screen, screenKey, productId } = req.body;

    if (!sessionId || !screen || !screenKey) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const now = new Date();

    /* 🔴 STEP 1: Close previous active screens (FIXED) */
    const activeTracks = await ScreenTrack.find({
      sessionId,
      endTime: null,
    });

    for (let track of activeTracks) {
      track.endTime = now;

      // ✅ CALCULATE IN JS (milliseconds)
      track.duration = now - track.startTime;

      await track.save();
    }

    /* 🟢 STEP 2: Create new screen entry */
    const track = await ScreenTrack.create({
      userId: userId || null,
      email: email || null,
      phone: phone || null,
      sessionId,
      screen,
      screenKey,
      productId: productId || null,
      startTime: now,
    });

    res.json({
      success: true,
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

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: "sessionId required",
      });
    }

    const end = new Date();

    const tracks = await ScreenTrack.find({
      sessionId,
      endTime: null,
    });

    for (let track of tracks) {
      track.endTime = end;

      // ✅ milliseconds
      track.duration = end - track.startTime;

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
    const data = await ScreenTrack.aggregate([
      { $sort: { startTime: 1 } },

      {
        $group: {
          _id: "$sessionId",
          userId: { $first: "$userId" },
          email: { $first: "$email" },

          screens: {
            $push: {
              screen: "$screen",
              duration: "$duration", // ✅ now correct
              startTime: "$startTime",
            },
          },
        },
      },

      { $sort: { "_id": -1 } },
      { $limit: 20 },
    ]);

    res.json({
      success: true,
      sessions: data,
    });

  } catch (error) {
    console.error("❌ JOURNEY ERROR:", error);
    res.status(500).json({ success: false });
  }
};

const getCurrentScreenController = async (req, res) => {
  try {
    const activeUsers = await ScreenTrack.find({
      endTime: null,
    }).sort({ startTime: -1 });

    res.json({
      success: true,
      count: activeUsers.length,
      users: activeUsers,
    });

  } catch (error) {
    console.error("❌ CURRENT ERROR:", error);
    res.status(500).json({ success: false });
  }
};

const getFunnelAnalytics = async (req, res) => {
  try {
    const data = await ScreenTrack.aggregate([
      {
        $group: {
          _id: "$screen",
          users: { $addToSet: "$sessionId" },
        },
      },
      {
        $project: {
          screen: "$_id",
          count: { $size: "$users" },
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
    res.status(500).json({ success: false });
  }
};


module.exports = {
  screenTrackController,
  exitScreenController,
  getJourneyController,
  getCurrentScreenController,
  getFunnelAnalytics,
};