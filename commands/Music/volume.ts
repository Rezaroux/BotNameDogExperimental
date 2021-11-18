import { ICommand } from "wokcommands";
import * as music from '@koenie06/discord.js-music';

export default {
    category: 'Music',
    description: 'Changes volume (percentage)',

    slash: true,
    testOnly: true,

    expectedArgs: '<volume>',
    minArgs: 1,

    callback: async ({ interaction: msgInt, args}) => {
        const isConnected = await music.isConnected({ interaction: msgInt });
        if(isConnected){
            const [volume] = args
            console.log(volume);
            if(parseInt(volume) <= 100 && parseInt(volume) >= 1){
                console
                music.volume({
                    interaction: msgInt,
                    volume: parseInt(volume)
                });
                return `Changed volume to ${volume}%`
            }else{
                return 'Please enter a volume between 1-100'
            }
            
            
        }

    },
} as ICommand