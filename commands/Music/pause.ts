import { ICommand } from "wokcommands";
const music = require('@koenie06/discord.js-music');

export default {
    category: 'Music',
    description: 'Skips current song',

    slash: true,
    testOnly: true,

    callback: async ({ interaction: msgInt, }) => {
        const isPaused = await music.isPaused({ interaction: msgInt });
        const isConnected = await music.isConnected({ interaction: msgInt });
        if(!isPaused && isConnected){
            music.pause({ interaction: msgInt });
            return 'Paused ⏯️'
        }else{
            return 'Already paused'
        }
    },
} as ICommand