
import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import * as music from '@koenie06/discord.js-music';

export default {
    category: 'Music',
    description: 'Gets music queue',

    slash: true,
    testOnly: true,

    callback: async ({ interaction: msgInt }) => {
        const isConnected = await music.isConnected({ interaction: msgInt });
        if(!isConnected) return 'There are no items currently in the queue'
        let queue = await (music.getQueue({ interaction: msgInt })) as any

        console.log(queue)

        const queueEmbed = new MessageEmbed()
            .setTitle('Music queue')
            .setColor(0xEB4444)
            .setAuthor(msgInt.member?.user.username as string, 'https://i.imgur.com/nWYciKQ.png')
            .setThumbnail(queue[0].info.thumbnail)
        for (var index in queue) {
            console.log(index)
            console.log(queue[index])
            if(index == '0'){
                queueEmbed.addFields([
                    {
                        name: queue[index].info.title,
                        value: `Currently playing (${queue[index].info.duration})`,
                    },
                ])
            }else{
                queueEmbed.addFields([
                    {
                        name: queue[index].info.title,
                        value: `#${index} in queue (${queue[index].info.duration})`,
                    },
                ])
            }
            
        }
        return queueEmbed
    },
} as ICommand