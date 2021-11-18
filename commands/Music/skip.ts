import { ICommand } from "wokcommands";
import * as music from '@koenie06/discord.js-music';

export default {
    category: 'Music',
    description: 'Skips current song',

    slash: true,
    testOnly: true,

    callback: async ({ interaction: msgInt }) => {
        const isConnected = await music.isConnected({ interaction: msgInt });
        if(isConnected){
            music.skip({ interaction: msgInt });
            return 'Skipped ⏭'
        }else{
            return 'Not playing'
        }
        
    },
} as ICommand