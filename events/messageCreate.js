const GuildConfig = require("../mongoose/database/schemas/GuildConfig");

module.exports = async (client, message) => {
    let GuildDB = await client.GetData(message.guild.id);
    if (!GuildDB) return;
    if (!GuildDB.musicChannelId) return;
    if (message.channel.id == GuildDB.musicChannelId) {
        if (message.author.bot) {
            try {
                setTimeout(() => message.delete(), 3000);
            } catch (e) {
                message.channel.send(`Error: ${e}`);
            }
        } else {
            try {
                message.delete();
            } catch (e) {
                message.channel.send(`Error: ${e}`);
            }
            const play = client.Commands.get('play');
            play.run(client, message, { GuildDB });
        }
        // const msg = await message.channel.messages.fetch(MusicDB.musicMessageId);
    }
};