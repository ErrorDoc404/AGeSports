const { Collection } = require('discord.js');
/**
 *
 * @param {import("../library/MusicBot ")} client
 */
module.exports = async (client) => {
    (client.Ready = true),
        client.user.setPresence(client.config.presence);
    client.log("Successfully Logged in as " + client.user.tag);
    // await client.DeRegisterGlobalSlashCommands();
    // await client.DeRegisterGuildSlashCommands();
    await client.RegisterSlashCommands();
};