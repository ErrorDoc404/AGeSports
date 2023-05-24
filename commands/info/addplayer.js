const PlayerdConfig = require("../../mongoose/database/schemas/Player");
const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: "addplayer",
    description: "Add a player to the roster",
    usage: "",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: [""],
    category: "info",
    SlashCommand: {
        options: [
            {
                name: "user",
                description: "mention user",
                type: 6,
                required: true,
            },
        ],
        /**
         *
         * @param {import("../lib/AgEsports")} client
         * @param {import("discord.js").Message} message
         * @param {string[]} args
         * @param {*} param3
         */

        run: async (client, interaction, args, { GuildDB }) => {

            if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply(`you dont have manage guild permission to run this command`).catch(err => { client.error(err) });

            await PlayerdConfig.create({
                playerId: args.user.id,
            }).catch((e) => {
                client.error(`dublicate key`);
                return interaction.reply(`Already added`).catch((err) => { client.error(err) });
            });

            return interaction.reply(`${args.user.username} added to Roster`).catch((err) => { client.error(err) });
        }
    }
};