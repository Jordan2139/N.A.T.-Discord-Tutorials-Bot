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
    } catch (e) {}
}