import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Utilities',
    description: 'Gives tagged users profile picture',

    slash: true,
    testOnly: true,
    expectedArgs: '<user>',

    callback: ({client, interaction: msgInt, args, channel }) => {
        let embed = new MessageEmbed();
        let user : any = getUserFromMention(args[0]) || msgInt.user
        embed.setColor(0xEB4444);
        embed.setTimestamp();
        embed.setImage(user.displayAvatarURL() + "?size=2048");
        return msgInt.reply({embeds: [embed]})

        function getUserFromMention(mention: string) {
            if (!mention) return;
        
            if (mention.startsWith('<@') && mention.endsWith('>')) {
                mention = mention.slice(2, -1);
        
                if (mention.startsWith('!')) {
                    mention = mention.slice(1);
                }
                
                return client.users.cache.get(mention);
            } else {
                return 'cancel'
            }
        }
    },
} as ICommand