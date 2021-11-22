import { ICommand } from "wokcommands";
import * as music from '@koenie06/discord.js-music';

export default {
    category: 'Music',
    description: 'Skips current song',

    slash: true,
    testOnly: true,

    callback: async ({ interaction: msgInt}) => {
        const isConnected = await music.isConnected({ interaction: msgInt });
        if(isConnected){
            const isPaused = await music.isPaused({ interaction: msgInt });
            if(!isPaused){
                music.pause({ interaction: msgInt });
                return 'Paused ⏯️'
            }else{
                return 'Already paused'
            }
        }else{
            return 'Not connected'
        }

    },
} as ICommand