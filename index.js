const {
    Client,
    GatewayIntentBits,
    EmbedBuilder
} = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const TOKEN = "MTQ1OTU0MTIyODAyMTQ4MTcwOA.G4ARbs.D_szc9sYOjB_0uxSOhEZlooRoZ2a5oMsM9-9vU";

// 🧩 CUSTOM EMOJI
const CUSTOM_EMOJI = "👩🏻‍💻";

// 👥 MEMBERS TO WATCH (AUTO MESSAGE IF TAGGED)
const WATCHED_USERS = [
    "598453613324533781",
    "859641475998548008",
    "839806819660595230",
    "972813897369284608"
];

// 🎞️ ANIMATED STATUS
const STATUS_FRAMES = [
    "Made By GhostxBlade",
    "Made By GhostxBlade.",
    "Made By GhostxBlade..",
    "Made By GhostxBlade..."
];

client.once("ready", () => {
    console.log(`✅ Auto-tag bot online as ${client.user.tag}`);
});

client.on("messageCreate", async message => {
    if (message.author.bot) return;

    const mentioned = message.mentions.users.first();
    if (!mentioned) return;

    if (!WATCHED_USERS.includes(mentioned.id)) return;

    let frame = 0;

    const embed = new EmbedBuilder()
        .setColor(0x00FFFF)
        .setAuthor({
            name: `${CUSTOM_EMOJI} ✨ Fun X Chill Versa ✨`,
            iconURL: client.user.displayAvatarURL()
        })
        .setDescription(
            `🔔 **${mentioned} is currently busy**\n\n` +
            `😡 **Dhhhatt teri ma ki chuuut**\n\n` +
            `📝 Tagged by: ${message.author}`
        )
        .setFooter({ text: STATUS_FRAMES[0] })
        .setTimestamp();

    const sentMsg = await message.reply({ embeds: [embed] });

    const interval = setInterval(async () => {
        frame = (frame + 1) % STATUS_FRAMES.length;
        embed.setFooter({ text: STATUS_FRAMES[frame] });

        try {
            await sentMsg.edit({ embeds: [embed] });
        } catch {
            clearInterval(interval);
        }
    }, 700);

    setTimeout(() => clearInterval(interval), 15000);
});

client.login(TOKEN);
