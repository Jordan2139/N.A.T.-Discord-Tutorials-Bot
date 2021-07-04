module.exports = {
    name: 'ping',
    description: 'The first of many commands!',
    aliases: ['isalive'],
    async run(client, discord, message, args, config) {
        if(message.channel.type === "dm") return; // Don't run commands in dms
        const PingEmbed = new discord.MessageEmbed()
        .setColor(`${config['main_config'].colorhex}`)
        .setFooter(`${config['main_config'].footer}`)
        .setTimestamp()
        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
        .setDescription(`Latency is **${Date.now() - message.createdTimestamp}ms**`)
        message.channel.send(PingEmbed).then(msg => msg.delete( {timeout: 15000} )).catch(e => {})
    }
}
