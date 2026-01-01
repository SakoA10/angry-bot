require("dotenv").config();
console.log("TOKEN_START", (process.env.DISCORD_TOKEN || "").slice(0, 8));
console.log("TOKEN_LEN", (process.env.DISCORD_TOKEN || "").length);