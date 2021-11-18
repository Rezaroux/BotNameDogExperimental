import { ICommand } from "wokcommands";
import * as music from '@koenie06/discord.js-music';

export default {
    category: 'Music',
    description: 'Stops music',

    slash: true,
    testOnly: true,

    callback: async ({ interaction: msgInt}) => {
        const isConnected = await music.isConnected({ interaction: msgInt });
        if(isConnected){
            const isPaused = await music.isPaused({ interaction: msgInt });
            if(isPaused){
                music.pause({ interaction: msgInt });
            }

            console.log(music.getQueue.length)

            let queue = await (music.getQueue({ interaction: msgInt })) as any

            queue = []
            music.stop({ interaction: msgInt });
            
            return 'Stopped ⛔'
        }else{
            return 'Not connected'
        }
        
    },
} as ICommand