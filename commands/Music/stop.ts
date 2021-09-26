import { ICommand } from "wokcommands";
const music = require('@koenie06/discord.js-music');

export default {
    category: 'Music',
    description: 'Stops music',

    slash: true,
    testOnly: true,

    callback: async ({ interaction: msgInt}) => {
        const isConnected = await music.isConnected({ interaction: msgInt });
        if(isConnected){
            music.stop({ interaction: msgInt });
            return 'Stopped ⛔'
        }else{
            return 'Not playing'
        }
        
    },
} as ICommand