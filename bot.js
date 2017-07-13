const Telegraf = require('telegraf');
const {Extra, Markup} = Telegraf;
const config = require('./config');

const bot = new Telegraf(config.telegraf_token);

bot.telegram.getMe().then((bot_informations) => {
    bot.options.username = bot_informations.username;
    console.log("Server has initialized bot nickname. Nick: "+bot_informations.username);
});

bot.command('start', (ctx) => ctx.reply('Bot started.'));
bot.hears('ymca', (ctx) => ctx.reply("*sing* It's fun to stay at the Y.M.C.A.!"));
bot.hears(/torino/i, (ctx) => ctx.reply("Someone said Torino!?"));

bot.on('inline_query', ctx => {
    let query = ctx.update.inline_query.query;
    if(query.startsWith("/")){
        if(query.startsWith("/audio_src")){
            return ctx.answerInlineQuery([{
                type: 'voice',
                id: ctx.update.inline_query.id, 
                title: 'Send audio file sample.ogg', 
                voice_url: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Example.ogg',
                voice_duration: 16,
                caption: '[BOT] Audio file sample.ogg!'
            }]);
        }
    }else{
        let name_target = query;
        let message_length = name_target.length;
        let full_message;
        let dado=Math.floor(Math.random()*8)+1;
        switch(dado){
            case 1: full_message = "IMHO, "+name_target+" sucks."; break;
            case 2: full_message = "IMHO, "+name_target+" is awesome"; break;
            case 3: full_message = name_target+" is not a nice people for me..."; break;
            case 4: full_message = name_target+" for me you are c- Eh! You wanted!"; break;
            case 5: full_message = "Whoa! "+name_target+" is very cool!"; break;
            case 6: full_message = "Grifondoro! No wait, "+name_target+" you're such a noob."; break;
            case 7: full_message = "Sometimes I ask myself why people like "+name_target+" dress up and walk around like that..."; break;
            case 8: full_message = "Watch him! Watch! "+name_target+" is so ugly!"; break;
        }
        return ctx.answerInlineQuery([{
            type: 'article',
            id: ctx.update.inline_query.id, 
            title: 'You have inserted: '+name_target, 
            description: 'What does '+bot.options.username+' thinks about '+name_target+'?',
            input_message_content: {message_text: full_message}
        }], {cache_time: 0});
    }
})

bot.startPolling();