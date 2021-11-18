import DiscordJS, { Intents } from 'discord.js'
import WOKCommands from 'wokcommands'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
})

client.on('ready', () => {
    console.log("BotNDE is online")
    
    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        typeScript: true,
        testServers: ['726196852646608897', '853133286791839745'],
        botOwners: ['379402987325620254', '472911548134719499'],
        mongoUri: process.env.MONGO_URI,
    })
    .setDefaultPrefix(';')
    .setColor(0xEB4444)
    .setCategorySettings([
        {
            name: 'Fun',
            emoji: '🎮'
        },
        {
            name: 'Music',
            emoji: '🎶'
        },
        {
            name: 'Moderation',
            emoji: '🚧',
            hidden: true
        },
        {
            name: 'Utilities',
            emoji: '🛠️',
        },
    ])
    
})



client.login(process.env.TOKEN)