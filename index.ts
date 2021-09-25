import DiscordJS, { Intents } from 'discord.js'
import WOKCommands from 'wokcommands'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
})

client.on('ready', () => {
    console.log("BotNDE is online")
    
    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        typeScript: true,
        testServers: ['726196852646608897'],
    })
    .setDefaultPrefix(';')
    .setColor(0xEB4444)
    .setBotOwner(['379402987325620254', '472911548134719499'])
})



client.login(process.env.TOKEN)