import { Message, MessageActionRow, MessageButton, MessageComponentInteraction, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Fun',
    description: 'Initiates game of rock paper scissors',

    slash: true,
    testOnly: true,

    callback: async ({ interaction: msgInt, channel, client }) => {
        let choice = '';
        let choiceNum = Math.floor(Math.random() * 3);
        switch(choiceNum){
            case 0:
                choice = 'rock'
                break;
            case 1:
                choice = 'paper'
                break;
            case 2:
                choice = 'scissors'
                break;
        }


        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('rock')
                    .setEmoji('🪨')
                    .setLabel('Rock')
                    .setStyle('PRIMARY')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('paper')
                    .setEmoji('📰')
                    .setLabel('Paper')
                    .setStyle('PRIMARY')
            )
            .addComponents(
                new MessageButton()
                .setCustomId('scissors')
                .setEmoji('✂️')
                .setLabel('Scissors')
                .setStyle('PRIMARY')
            );
        const rpsEmbed = new MessageEmbed()
            .setTitle('Rock, Paper, Scissors!')
            .setTimestamp()
            .setColor(0xEB4444);

        await msgInt.reply({
            embeds: [rpsEmbed],
            components: [row],
        })

        const filter = (btnInt: MessageComponentInteraction) => {
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
            
            // if(collection.first()?.customId === 'rock'){
            //     msgInt.editReply({embeds: rpsEmbed, content: 'cringe', components: []});
            //     return
            // }

            const rpsResultEmbed = new MessageEmbed()
                .setTitle('Timed out')
                .addFields([
                    {
                        name: 'You chose:',
                        value: `${collection.first()?.customId.charAt(0).toUpperCase() + collection.first()?.customId.slice(1)! || 'Nothing'}`,
                    },
                    {
                        name: 'I chose:',
                        value: `${choice.charAt(0).toUpperCase() + choice.slice(1)}`,
                    },
                ])
                .setTimestamp()
                .setColor(0xEB4444);
            if(collection.first()?.customId === choice){
                rpsResultEmbed.setTitle('Tie!')        
            }else{

                switch(choice){
                    case 'rock':
                        switch(collection.first()?.customId){
                            case 'paper':
                                rpsResultEmbed.setTitle('You won!')
                                break;
            
                            case 'scissors':
                                rpsResultEmbed.setTitle('You lost!')
                                break;
                        }
                        break;
                    case 'paper':
                        switch(collection.first()?.customId){
                            case 'scissors':
                                rpsResultEmbed.setTitle('You won!')
                                break;
            
                            case 'rock':
                                rpsResultEmbed.setTitle('You lost!')
                                break;
                        }
                        break;
                    case 'scissors':
                        switch(collection.first()?.customId){
                            case 'rock':
                                rpsResultEmbed.setTitle('You won!')
                                break;
            
                            case 'paper':
                                rpsResultEmbed.setTitle('You lost!')
                                break;
                        }
                        break;
                }

                
            }

            msgInt.editReply({
                embeds: [rpsResultEmbed], 
                content: 'gg.', 
                components: []
            });
            return
            

            
            
        })

        
    },

        
} as ICommand