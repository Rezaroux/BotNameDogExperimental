import { ICommand } from "wokcommands";
import * as music from '@koenie06/discord.js-music';

export default {
    category: 'Music',
    description: 'Resumes music',

    slash: true,
    testOnly: true,

    callback: async ({ interaction: msgInt }) => {
        const isConnected = await music.isConnected({ interaction: msgInt });
        if(isConnected){
            const isResumed = await music.isResumed({ interaction: msgInt });
            if(!isResumed){
                music.resume({ interaction: msgInt });
                return 'Resumed ⏯️'
            }else{
                return 'Already playing'
            }
        }else{
            return 'Not connected'
        }
        
    },
} as ICommand