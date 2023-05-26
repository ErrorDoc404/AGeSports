const api = require("express").Router();
const { Collection } = require("discord.js");
const { join } = require("path");
const config = require("../config");
const Auth = require("./Middlewares/Auth");
const fs = require("fs");

const categories = fs.readdirSync(__dirname + '/../commands/');
let Commands = [];

categories.filter((cat) => !cat.endsWith('.js')).forEach((cat) => {
    const files = fs.readdirSync(__dirname + `/../commands/${cat}/`).filter((f) =>
        f.endsWith('.js')
    );
    files.forEach((file) => {
        let cmd = require(__dirname + `/../commands/${cat}/` + file);
        if (!cmd.name || !cmd.description || !cmd.SlashCommand) return;
        Commands.push({
            name: cmd.name,
            aliases: cmd.aliases,
            usage: cmd.usage,
            description: cmd.description,
            slash: cmd.SlashCommand ? true : false,
            premium: cmd.premium ? cmd.premium : false,
        });
    })
});

Commands.sort(function (cmd1, cmd2) {
    if (cmd1.name > cmd2.name) return 1;
    if (cmd1.name < cmd2.name) return -1;
    return 0;
});

api.get("/", (req, res) => {
    res.sendFile(join(__dirname, "..", "webview", "index.html"));
});

api.get("/dashboard", Auth, (req, res) => {
    res.sendFile(join(__dirname, "..", "webview", "dashboard.html"));
});

module.exports = api;