const {
    REST,
    Routes,
    SlashCommandBuilder
} = require("discord.js");

const TOKEN = "MTQ1OTU0MTIyODAyMTQ4MTcwOA.GN3qJE.RkFgUD-RfaYX1CYiqHvbcAdeu1LZ0wPNN08iK8";
const CLIENT_ID = "1459541228021481708";
const GUILD_ID = "1242409797228298261";

const commands = [
    new SlashCommandBuilder()
        .setName("busy")
        .setDescription("Mark a staff member as busy")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("Staff member")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("Reason for being busy")
        )
        .toJSON()
];

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
    try {
        console.log("⏳ Registering slash commands...");
        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands }
        );
        console.log("✅ Slash commands registered successfully!");
    } catch (error) {
        console.error(error);
    }
})();


