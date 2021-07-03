const discord = require('discord.js');
const config = require('./config.json');
const client = new discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
client.events = new discord.Collection();

client.on('uncaughtException', err => {
    console.log(err)
});


['Event'].forEach(handler => {
    require(`./handlers/${handler}`)(client, discord, config)
})

client.login(config["main_config"].token)