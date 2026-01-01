require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const axios = require("axios");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const seen = new Set();
setInterval(() => seen.clear(), 60 * 1000);

client.once("ready", () => {
  console.log("Bot online:", client.user.tag, "PID:", process.pid);
});

function cleanReply(text) {
  if (typeof text !== "string") return "";

  let t = text.replace(/^\s*={1,}\s*/g, "");

  while (/^\s*={1,}\s*/.test(t)) t = t.replace(/^\s*={1,}\s*/g, "");

  return t.trim();
}

client.on("messageCreate", async (message) => {
  try {
    if (message.author.bot) return;
    if (!message.content.startsWith("!ai")) return;

    if (seen.has(message.id)) return;
    seen.add(message.id);

    const userText = message.content.replace(/^!ai\s*/i, "").trim();
    if (!userText) return message.reply("Say something after `!ai` 😡");

    const { data } = await axios.post(
      process.env.N8N_WEBHOOK_URL,
      { text: userText },
      { timeout: 15000 }
    );

    const raw = typeof data === "string" ? data : data?.reply;
    const reply = cleanReply(raw) || "No reply.";

    return message.reply(reply);
  } catch (err) {
    console.log("AXIOS STATUS:", err?.response?.status);
    console.log("AXIOS DATA:", err?.response?.data);
    console.log("AXIOS MSG:", err?.message);
    return message.reply("AI is angry but broken 😡");
  }
});

client.login(process.env.DISCORD_TOKEN);
