// EXP calculator function
function calculateXp(currentLevel, targetLevel, currentXp = 0) {
    let level = currentLevel;
    let totalXp = 0;

    while (level < targetLevel) {
        totalXp += 50 * (Math.pow(level, 2) + 2);
        level++;
    }

    totalXp -= currentXp;

    return totalXp;
}

// Example Discord bot command (using discord.js v14)
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const TOKEN = process.env.TOKEN;

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);

    // ✅ Set bot status
    client.user.setActivity("UnlimitedXP", { type: 3 }); // 3 = WATCHING
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;

    // Command format: !xp <currentLevel> <targetLevel> <currentXp>
    if (message.content.startsWith("!xp")) {
        const args = message.content.split(" ");

        if (args.length < 3) {
            return message.reply("Usage: `!xp <currentLevel> <targetLevel> [currentXp]`");
        }

        const currentLevel = parseInt(args[1]);
        const targetLevel = parseInt(args[2]);
        const currentXp = args[3] ? parseInt(args[3]) : 0;

        if (isNaN(currentLevel) || isNaN(targetLevel) || isNaN(currentXp)) {
            return message.reply("Please provide valid numbers!");
        }

        const xpNeeded = calculateXp(currentLevel, targetLevel, currentXp);

        message.reply(`📊 From level **${currentLevel}** to **${targetLevel}** you need: **${xpNeeded.toLocaleString()} XP**`);
    }
});

client.login(TOKEN);

const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Bot is alive!");
});

app.listen(3000, () => {
    console.log("Express server is running on port 3000");
});
