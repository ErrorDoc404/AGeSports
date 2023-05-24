const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
    playerId: {
        type: mongoose.SchemaTypes.String,
        require: true,
        unique: true,
    },
    name: {
        type: mongoose.SchemaTypes.String,
        require: false,
    },
    ign: {
        type: mongoose.SchemaTypes.String,
        require: false,
    },
    rank: {
        type: mongoose.SchemaTypes.String,
        require: false,
    },
    agent1: {
        type: mongoose.SchemaTypes.String,
        require: false,
    },
    agent2: {
        type: mongoose.SchemaTypes.String,
        require: false,
    },
    agent3: {
        type: mongoose.SchemaTypes.String,
        require: false,
    },
    acs: {
        type: mongoose.SchemaTypes.Number,
        require: false,
    }
});

module.exports = mongoose.model('Player', PlayerSchema);