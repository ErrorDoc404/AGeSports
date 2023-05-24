const PlayerdConfig = require("../../mongoose/database/schemas/Player");
const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: "updateplayer",
    description: "update a player in the roster",
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
            {
                name: "name",
                description: "Enter his real Name",
                type: 3,
            },
            {
                name: "ign",
                description: "In Game Name",
                type: 3,
            },
            {
                name: "rank",
                description: "Player Peak Rank",
                type: 3,
            },
            {
                name: "agent1",
                description: "Player Primary Agent",
                type: 3,
            },
            {
                name: "agent2",
                description: "Player Seconday Agent",
                type: 3,
            },
            {
                name: "agent3",
                description: "Player Another Agent",
                type: 3,
            },
            {
                name: "acs",
                description: "Average Combat Score",
                type: 4,
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

            args = interaction.options._hoistedOptions;


            const user = args.find((a) => a.name === "user") ? args.find((a) => a.name === "user").value : null;

            const playerData = await PlayerdConfig.findOne({ playerId: user });

            const name = args.find((a) => a.name === "name") ? args.find((a) => a.name === "name").value : playerData.name;

            const ign = args.find((a) => a.name === "ign") ? args.find((a) => a.name === "ign").value : playerData.ign;

            const rank = args.find((a) => a.name === "rank") ? args.find((a) => a.name === "rank").value : playerData.rank;

            const agent1 = args.find((a) => a.name === "agent1") ? args.find((a) => a.name === "agent1").value : playerData.agent1;

            const agent2 = args.find((a) => a.name === "agent2") ? args.find((a) => a.name === "agent2").value : playerData.agent2;

            const agent3 = args.find((a) => a.name === "agent3") ? args.find((a) => a.name === "agent3").value : playerData.agent3;

            const acs = args.find((a) => a.name === "acs") ? args.find((a) => a.name === "acs").value : playerData.acs;

            await PlayerdConfig.findOneAndUpdate({ playerId: user }, {
                ign: ign,
                name: name,
                rank: rank,
                agent1: agent1,
                agent2: agent2,
                agent3: agent3,
                acs: acs
            });

            return interaction.reply(`Update Successpuffy`).catch((err) => { client.error(err) });
        }
    }
};