const DeleteMoodModel = require("../../MongoModels/JuhiModel/MoodDetect.js")
const DeleteMoodController = async (req, res) => {
    try {
        const { text } = req.body;
        const deletemood = await DeleteMoodModel.create({
            text
        })
        res.status(200).send({
            success: true,
            "message": "Mood detected successfully",
            "data": {
                "primary_mood": "Stressed",
                "confidence": 0.91,
                "emotions": {
                    "stress": 0.91,
                    "sadness": 0.75,
                    "neutral": 0.20
                }, "suggestions": [
                    "Take a small break and hydrate",
                    "Try a quick breathing exercise",
                    "Consider journaling your thoughts"
                ]
            }
        })
    } catch (error) {
        res.status(500).send({
            "success": false,

            "message": "Invalid text input"

        })
    }
}
module.exports = { DeleteMoodController }