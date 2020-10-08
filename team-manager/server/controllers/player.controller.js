const { Player } = require('../models/player.model');

module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    });
}

module.exports.createPlayer = (request, response) => {
    const { playerName, position, gameOne, gameTwo, gameThree } = request.body;
    Player.create({
        playerName,
        position,
        gameOne,
        gameTwo,
        gameThree
    })
        .then(player => response.json(player))
        .catch(err => response.status(400).json(err));
}

module.exports.getAllPlayers = (request, response) => {
    Player.find({})
        .then(players => response.json(players))
        .catch(err => response.json(err))
}

module.exports.deletePlayer = (request, response) => {
    Player.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}

module.exports.updatePlayer = (req, res) => {
    Player.findOneAndUpdate({_id: req.params.id}, req.body, { new: true })
    .then(updatedPlayer => res.json(updatedPlayer))
    .catch(err => res.json(err))
}