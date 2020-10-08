const PlayerController = require('../controllers/player.controller');

module.exports = function (app) {
    app.get('/api', PlayerController.index);
    app.get('/api/players', PlayerController.getAllPlayers);
    app.delete('/api/player/:id', PlayerController.deletePlayer);
    app.put('/api/:id', PlayerController.updatePlayer);
    app.post('/api/new', PlayerController.createPlayer);
}