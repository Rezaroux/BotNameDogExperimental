import { ButtonInteraction, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";



export default {
    category: 'Moderation',
    description: 'Kicks tagged user',

    slash: true,
    testOnly: true,

    expectedArgs: '<user> [reason]',
    minArgs: 1,
    
    permissions: ['KICK_MEMBERS'],

    callback: async ({ interaction: msgInt, channel, args, client, }) => {

        let reason = args[1] || 'No reason given'

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('kick_yes')
                    .setEmoji('🔨')
                    .setLabel('Confirm')
                    .setStyle('SUCCESS')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('kick_no')
                    .setLabel('Cancel')
                    .setStyle('DANGER')
            )
        const KickReqEmbed = new MessageEmbed()
            .setTitle('Kick')
            .addFields([
                {
                    name: 'Are you sure you want to kick:',
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
        const KickFinEmbed = new MessageEmbed()
            .setTitle('Kicked')
            .addFields([
                {
                    name: 'Successfully kicked:',
                    value: args[0]
                },
                {
                    name: 'Reason:',
                    value: reason
                },
            ])
            .setTimestamp()
            .setColor(0xEB4444)
        const KickCancEmbed = new MessageEmbed()
            .setTitle('Cancelled')
            .addFields([
                {
                    name: 'Cancelled kick on:',
                    value: args[0]
                },
                {
                    name: 'Reason for initial kick:',
                    value: reason
                },
            ])
            .setTimestamp()
            .setColor(0xEB4444)
        
        let user : any = getUserFromMention(args[0])

        await msgInt.reply({
            embeds: [KickReqEmbed],
            components: [row],
            ephemeral: true,
        })

        if (user == 'cancel'){
            msgInt.editReply({content: 'Invalid user', embeds: [KickCancEmbed], components: [],})
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
            

            console.log(`Kick request recieved for ${user.tag}\nReason: ${reason}`)

            if (collection.first()?.customId === 'kick_yes') {


                try {
                    await msgInt.guild?.members.kick(user, reason)
                } catch (error) {
                    msgInt.editReply({
                        embeds: [KickCancEmbed],
                        content: `Failed to kick **${user.tag}**: ${error}`,
                        components: [],
                    })
                    return
                }
                console.log(`Successfully kicked: ${user.tag}\nReason: ${reason}`)
                
                msgInt.editReply({
                    embeds: [KickFinEmbed],
                    content: 'Kicked',
                    components: [],
                })
            }else{
                msgInt.editReply({
                    embeds: [KickCancEmbed],
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