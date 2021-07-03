module.exports = (client, discord, config) => {
    client.user.setPresence({
        activity: {
            name: `skids alt accounts`,
            type: 'WATCHING'
        },
        status: 'idle'
    });
    console.log(`I am online and currently serving ${client.guilds.cache.size} server(s)`)
}