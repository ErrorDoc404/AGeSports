const { Client, Partials, GatewayIntentBits, Collection } = require('discord.js');
const ConfigFetcher = require('../config');
const fs = require('fs');
const Logger = require("./Logger");
const logger = new Logger();
const http = require("http");
const Express = require("express");
const mongoose = require("mongoose");

const GuildConfig = require("../mongoose/database/schemas/GuildConfig");

class AgEsports extends Client {
    constructor(
        props = {
            partials: [
                Partials.Channel, // for text channel
                Partials.GuildMember, // for guild member
                Partials.User, // for discord user
            ],
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildInvites,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
            ],
        }

    ) {
        super(props);

        // Load Config File
        this.config = ConfigFetcher;

        this.SlashCommands = new Collection();
        this.Commands = new Collection();

        this.LoadEvents();
        this.LoadCommands();

        var client = this;

        //creating Web portal
        this.server = Express();
        this.http = http.createServer(this.server);
        // this.server.use('/', require('../express'));
        // this.io = new Server(this.http);
        // require('../express/socket')(this.io);
    }

    log(Text) {
        logger.log(Text);
    }

    warn(Text) {
        logger.warn(Text);
    }

    error(Text) {
        logger.error(Text);
    }

    LoadEvents() {
        fs.readdir('./events/', async (err, files) => {
            if (err) return console.error(err);
            files.forEach(file => {
                if (!file.endsWith('.js')) return;
                const evt = require(`../events/${file}`);
                let evtName = file.split('.')[0];
                this.on(evtName, evt.bind(null, this));
                logger.events(`Loaded event '${evtName}'`);
            });
        });
    }

    LoadCommands() {
        const categories = fs.readdirSync(__dirname + '/../commands/');
        categories.filter((cat) => !cat.endsWith('.js')).forEach((cat) => {
            const files = fs.readdirSync(__dirname + `/../commands/${cat}/`).filter((f) =>
                f.endsWith('.js')
            );
            files.forEach((file) => {
                let cmd = require(__dirname + `/../commands/${cat}/` + file);
                if (!cmd.name || !cmd.description || !cmd.SlashCommand) {
                    return this.warn(`unable to load command: ${file.split(".")[0]}, Reason: File doesn't had run/name/desciption`);
                }
                let cmdName = cmd.name.toLowerCase();
                this.Commands.set(cmdName, cmd);
                logger.commands(`Loaded command '${cmdName}'`);
            })
        });
    }

    build() {
        this.warn('Getting Ready....');
        this.login(this.config.Token);
        if (this.config.ExpressServer) {
            this.warn('Server is starting');
            this.log('Server started...');
            this.http.listen(this.config.httpPort, () =>
                this.log(`Web HTTP Server has been started at ${this.config.httpPort}`)
            );
        }

        this.MongooseConnect();
    }

    RegisterSlashCommands() {
        require("./SlashCommand")(this);
    }

    DeRegisterGlobalSlashCommands() {
        require("./DeRegisterSlashGlobalCommands")(this);
    }

    DeRegisterGuildSlashCommands() {
        this.guilds.cache.forEach((guild) => {
            require("./DeRegisterSlashGuildCommands")(this, guild.id);
        });
    }

    MongooseConnect() {
        mongoose.set('strictQuery', true);
        mongoose.connect(this.config.mongooseURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .then(data => {
                this.warn(`Connected to ${data.connection.host}:${data.connection.port} database: ${data.connection.name}`);
            })
            .catch(err => { this.warn(err) });
    }

    GetData(GuildID) {
        return new Promise(async (res, rej) => {
            const findGuildConfig = await GuildConfig.findOne({ guildId: GuildID });
            res(findGuildConfig);
        });
    }
}

module.exports = AgEsports;