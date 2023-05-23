const GuildConfig = require("../mongoose/database/schemas/GuildConfig");
const premium = require("../mongoose/database/schemas/Premium");

module.exports = async (client, interaction) => {

    let GuildDB = await client.GetData(interaction.guildId);
    let PremiumCMD = await premium.find({ guildId: interaction.guildId });

    //Initialize GuildDB
    if (!GuildDB) {
        GuildDB = await GuildConfig.create({
            guildId: interaction.guildId,
            prefix: '!',
        });
    }

    const command = interaction.commandName;

    let cmd = client.SlashCommands.get(command);
    if (!cmd) return;

    const args = interaction.options._hoistedOptions[0];

    if (cmd.SlashCommand && cmd.SlashCommand.run) {
        if (cmd.premium) {
            if (PremiumCMD.length == 0 || PremiumCMD.expire == true || PremiumCMD.time < Date())
                return interaction.reply({ content: `**This command require you to get Premuim**` });
            else
                cmd.SlashCommand.run(client, interaction, args, { GuildDB });
        }
        else
            cmd.SlashCommand.run(client, interaction, args, { GuildDB });
    }

    client.CommandsRan++;
};