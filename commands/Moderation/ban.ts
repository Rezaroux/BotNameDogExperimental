import { ButtonInteraction, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";



export default {
    category: 'Moderation',
    description: 'Bans tagged user',

    slash: true,
    testOnly: true,

    expectedArgs: '<user> [reason] [days]',
    minArgs: 1,
    
    permissions: ['KICK_MEMBERS'],

    callback: async ({ interaction: msgInt, channel, args, client, }) => {

        let reason = args[1] || 'No reason given'
        let days = parseFloat(args[2])

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('ban_yes')
                    .setEmoji('🔨')
                    .setLabel('Confirm')
                    .setStyle('SUCCESS')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('ban_no')
                    .setLabel('Cancel')
                    .setStyle('DANGER')
            )
        const BanReqEmbed = new MessageEmbed()
            .setTitle('Ban')
            .addFields([
                {
                    name: 'Are you sure you want to ban:',
                    value: args[0]
                },
                {
                    name: 'Reason',
                    value: reason
                },
            ])
            .setTimestamp()
            .setColor(0xEB4444)
            .setFooter('This will automatically cancel in 15 seconds')
        const BanFinEmbed = new MessageEmbed()
            .setTitle('Banned')
            .addFields([
                {
                    name: 'Successfully banned:',
                    value: args[0]
                },
                {
                    name: 'Reason:',
                    value: reason
                },
                {
                    name: 'Duration:',
                    value: days + " days"
                },
            ])
            .setTimestamp()
            .setColor(0xEB4444)
        const BanCancEmbed = new MessageEmbed()
            .setTitle('Cancelled')
            .addFields([
                {
                    name: 'Cancelled ban on:',
                    value: args[0]
                },
                {
                    name: 'Reason for initial ban:',
                    value: reason
                },
            ])
            .setTimestamp()
            .setColor(0xEB4444)
        
        let user : any = getUserFromMention(args[0])

        await msgInt.reply({
            embeds: [BanReqEmbed],
            components: [row],
            ephemeral: true,
        })
        console.log("DAYS = " + days)
        if(isNaN(days)){
            msgInt.editReply({content: 'Invalid duration', embeds: [BanCancEmbed], components: [],})
            return 
        }

        if (user == 'cancel'){
            msgInt.editReply({content: 'Invalid user', embeds: [BanCancEmbed], components: [],})
            return
        }

        const filter = (btnInt: ButtonInteraction) => {
            return msgInt.user.id === btnInt.user.id
        }

        const collector = channel.createMessageComponentCollector({
            filter,
            max: 1,
            time: 1000 * 15
        })

        

        collector.on('end', async (collection) => {
            collection.forEach((click) => {
                console.log(click.user.id, click.customId)
            })
            

            console.log(`Ban request recieved for ${user.tag}\nReason: ${reason}`)

            if (collection.first()?.customId === 'ban_yes') {


                try {
                    await msgInt.guild?.members.ban(user, { days, reason })
                } catch (error) {
                    msgInt.editReply({
                        embeds: [BanCancEmbed],
                        content: `Failed to ban **${user.tag}**: ${error}`,
                        components: [],
                    })
                    return
                }
                console.log(`Successfully banned: ${user.tag}\nReason: ${reason}`)
                
                msgInt.editReply({
                    embeds: [BanFinEmbed],
                    content: 'Banned',
                    components: [],
                })
            }else{
                msgInt.editReply({
                    embeds: [BanCancEmbed],
                    content: 'Cancelled',
                    components: [],
                })
            }

            
        })

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