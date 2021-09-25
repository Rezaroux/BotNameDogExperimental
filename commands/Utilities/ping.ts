import { ICommand } from "wokcommands";

export default {
    category: 'Utilities',
    description: 'Gives latency',

    slash: 'both',
    testOnly: true,

    callback: ({ message, client, interaction: msgInt }) => {
        let APIping = Math.round(client.ws.ping)
        var ping: any
        if(message){
            message.channel.send('Calculating ping...')
            .then((resultMessage) => {
                ping = resultMessage.createdTimestamp - message.createdTimestamp;
                resultMessage.edit(`Bot latency is ${ping}ms\nAPI latency is ${APIping}ms`)
            })

        }else{
            msgInt.channel?.send('Calculating ping...')
            .then((resultMessage) => {
                ping = resultMessage.createdTimestamp - msgInt.createdTimestamp;
                resultMessage.delete()
            })
            msgInt.reply({content: 'Calculating ping...',})
            .then(() => {
                msgInt.editReply({content: `Bot latency is ${ping}ms\nAPI latency is ${APIping}ms`,})
            })

            

            
        }


    },
} as ICommand