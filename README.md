# Telegram Bot in Node.JS, using Telegraf

## What is this repository about?
This repository lets you run and configure a Telegram bot, easily, in order to interact with user input and manage data.

This repository is an upgraded version of the old one with totally different package. Contents in README are similar because this repository provide additional features.

I've decided to try out `telegraf` NPM package since it supports Telegram API v3.1+ which includes cool features like `game` support and `inline mode` (used in this sample) and had more informations and better documentation than the previous package `telegram-api`, still useful for text handling. NPM `telegraf` package is also capable of handling media files (audio, gif, etc.).

So: if you ONLY need a text bot, my previous repository is still fine and it is very simple to use.
If you need many more features, go with this repository.

Also for this project I used `node v8.0.0`. Old project supported `node v4.0.0` thanks to Babel and its ES6 transpilation/polyfill. If your environment suits higher node versions or you are capable to upgrade to `node v8.0.0` (I'll also show in this README how to do it), go for this repository. If it's not the case, go for the previous one.

## How to create the bot

### Step 1: create a 'user bot' and connect it with Node.js
- Open Telegram application on your computer;
- Contact BotFather through Telegram here: https://telegram.me/BotFather. This bot will be used to create your bot;
- As image suggests, follow those steps:
![image](http://i.imgur.com/POZq2tq.png)
- BotFather will provide you an API key. This API key is used to make requests to Telegram API in order to listen messages from your bot user, make bot answer accordingly and much more. Save it for next step.

### Step 2: configure your Node.js application
- Create config.js in the repository root with this content. Replace API_TOKEN with the API key you got from BotFather:
```javascript
module.exports = {ttelegraf_token:'API_TOKEN'};
```
This file will be automatically ignored from .gitignore to secure your API key in GitHub.


- Install dependencies:
```
npm install
```
This will install all dependencies in `package.json` so just `telegraf` in order to use Telegram API.

Done! Your bot is now configured.

## Run the bot
- Start your application:
```
npm start
```
If it prints:
```
[SERVER] Bot started.
```
...congratulations! Now bot will do what you want.

![image](http://i.imgur.com/v6fmG6f.png)

## Secure your API key
In .gitignore:
```
config.js
```
API key will not be published inside your GitHub repository.
I have separated configuration logic from application logic in order to secure this key, but in a production environment it might not be enough.

Secure your API key as much as possible.
If your key gets stolen --- Bad things could happen with your bot.

If you're working on this repository with someone else, I suggest to NOT publish config.js but to share your configuration file privately with your collaborators OR let them build their own 'bot-users' with their own API keys.

# Documentation
I have personally commented my own code in order to make things as much clear as possible.

The file index.js is a loader for app.js file. To change your bot behavior, change app.js accordingly.

For example, listening a command:
```javascript
// Command example, pretty easy. Each callback passes as parameter the context.
// Context data includes message info, timestamp, etc; check the official documentation or print ctx.
bot.command('start', (ctx) => ctx.reply('Bot started.'));
```

Hear a word in a sentence:
```javascript
// Hears, instead of command, check if the given word or regexp is CONTAINED in user input.
bot.hears('ymca', (ctx) => ctx.reply("*sing* It's fun to stay at the Y.M.C.A.!"));
```

You can also use regexp, for example this one checks case-insensitive version of the word:
```javascript
bot.hears(/torino/i, (ctx) => ctx.reply("Someone said Torino!?"));
```

For more informations, check Telegraf API: https://github.com/telegraf/telegraf.
For inline support results, check: https://core.telegram.org/bots/api#inlinequeryresult.