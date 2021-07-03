const moment = require('moment');
const config = require('../../config.json')

module.exports = async(client, discord, config, guildMember) => {
    try {
        let accountage = Date.now() - guildMember.user.createdAt;
        if (accountage < config["altprev"].age * 86400000) {
            let deChannel = guildMember.guild.channels.cache.get(config["altprev"].logchannel);
            const caught = new discord.MessageEmbed()
                .setColor(`${config['main_config'].colorhex}`)
                .setTitle(`Alt Account Alert!`)
                .setDescription(`User **<@${guildMember.user.id}> - (${guildMember.user.tag})** has joined your server.\n**Account Age:** ${(moment(guildMember.user.createdAt).fromNow())} \n\n*Note: Your account must me ${config['altprev'].age} days old to bypass this really shit alt prev bot*`)
                .setThumbnail(`${client.user.displayAvatarURL()}`)
                .setTimestamp()
                .setFooter(`${config['main_config'].footer}`)
            deChannel.send(caught)
        }
        const caughtpt2 = new discord.MessageEmbed()
            .setColor(`${config['main_config'].colorhex}`)
            .setTitle(`You were kicked!`)
            .setDescription(`**Reason:** Possible Alt Account\n**Account Age:** ${(moment(guildMember.user.createdAt).fromNow())}\n\n*Note: Your account must be ${config['altprev'].age} days old in order to bypass the alt prevention`)
            .setThumbnail(`${client.user.displayAvatarURL()}`)
            .setTimestamp()
            .setFooter(`${config['main_config'].footer}`)
        try {
            guildMember.send(caughtpt2)
        } catch (e) {}
        guildMember.kick(`Alt account detected (Account age: ${moment(guildMember.user.createdAt)}) - ${client.user.tag}`);

        if(config["NewUser"].enabled) {
            if(config["NewUser"].SendMsg) {
                if (!config["NewUser"].WelcomeChannel) {
                    console.log('Oi M8! You need to set a welcome channel in the config.json!') 
                    return;
                } else {
                    const WelcomeEmbed = new discord.MessageEmbed()
                    .setColor(`${config['main_config'].colorhex}`)
                    .setFooter(`${config['main_config'].footer}`)
                    .setTimestamp()
                    .setTitle(`Welcome ${guildMember.user.tag}!`)
                    .setThumbnail(`${guildMember.user.displayAvatarURL(true)}`)
                    .setDescription(`Hey there! Welcome to this amazing server! Please make sure to follow the rules as well as Discord ToS!`)
                    config["NewUser"].WelcomeChannel.send(WelcomeEmbed)
                }
                if(config["NewUser"].DMUser) {
                    const DMEmbed = new discord.MessageEmbed()
                    .setColor(`${config['main_config'].colorhex}`)
                    .setFooter(`${config['main_config'].footer}`)
                    .setTimestamp()
                    .setTitle(`Welcome ${guildMember.user.tag}!`)
                    .setThumbnail(`${guildMember.user.displayAvatarURL(true)}`)
                    .setDescription(`Hey there! Welcome to this amazing server! Please make sure to follow the rules as well as Discord ToS!`)
                    guildMember.send(DMEmbed)
                }
            }
        }
    } catch (e) {}
}