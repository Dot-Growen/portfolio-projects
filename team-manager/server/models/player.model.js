const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    playerName: {
        type: String,
        required: [
            true,
            "Player's name is required"
        ],
        minlength: [2, "minimum length 2 character"]
    },
    position: { type: String },
    gameOne: {
        game: String,
        status: String
    },
    gameTwo: {
        game: String,
        status: String
    },
    gameThree: {
        game: String,
        status: String
    }
}, { timestamps: true });

module.exports.Player = mongoose.model('Player', PlayerSchema);