import { ICommand } from "wokcommands";
const music = require('@koenie06/discord.js-music');

export default {
    category: 'Music',
    description: 'Resumes music',

    slash: true,
    testOnly: true,

    callback: async ({ interaction: msgInt }) => {
        const isResumed = await music.isResumed({ interaction: msgInt });
        const isConnected = await music.isConnected({ interaction: msgInt });
        if(!isResumed && isConnected){
            music.resume({ interaction: msgInt });
            return 'Resumed ⏯️'
        }else{
            return 'Already resumed'
        }
        
        
    },
} as ICommand