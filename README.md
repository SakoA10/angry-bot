# Angry Discord AI Bot (n8n + Webhook)

Local Discord bot that listens for `!ai ...` and sends the text to an n8n webhook.
n8n returns `{ "reply": "..." }` and the bot replies in Discord.

## Setup

1. Install Node.js
2. Install deps:
   npm install
3. Create .env from .env.example:
   copy .env.example .env
4. Put your DISCORD_TOKEN in .env
5. Start n8n and activate the workflow (Webhook path: /ai-bot)
6. Run the bot:
   node index.js

## Test webhook

Invoke-WebRequest -Method Post -Uri "http://localhost:5678/webhook/ai-bot" -ContentType "application/json" -Body '{"text":"hello"}' -UseBasicParsing | Select-Object -ExpandProperty Content

## Screenshots

![Example 1](screenshots/shot1.png)
![Example 2](screenshots/shot2.png)
![Example 3](screenshots/shot3.png)

## n8n workflow

![n8n workflow](screenshots/n8n.png)
