require('dotenv').config();
const { ActivityType } = require("discord.js");

module.exports = {
    Id: process.env.Discord_ClientID,
    prefix: process.env.PREFIX || '!',
    Admins: ["UserID", "UserID"],
    buildToken: process.env.BUILD_TOKEN || 'build token',
    Token: process.env.TOKEN || 'bot token',
    ExpressServer: true,
    httpPort: process.env.HTTP_PORT || 'need port',
    httpsPort: process.env.HTTPS_PORT || '443',
    CallbackURL: process.env.CALLBACK_URL || '',

    mongooseURL: process.env.MONGOOSE_URL || "",

    presence: {
        status: "online", // online, idle, and dnd(invisible too but it make people think the bot is offline)
        activities: [
            {
                name: "VALORANT", //Status Text
                type: ActivityType.Playing, // PLAYING, WATCHING, LISTENING, STREAMING
            },
        ],
    },
}