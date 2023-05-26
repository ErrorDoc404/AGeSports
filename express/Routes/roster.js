const client = require("../../");
const api = require("express").Router();
const Player = require("../../mongoose/database/schemas/Player");

api.get('/', async (req, res) => {
    const data = await Player.find();
    if (data)
        return res.send(data);
    else return res.send(false);
});

module.exports = api;