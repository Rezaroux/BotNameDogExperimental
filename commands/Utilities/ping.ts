import { ICommand } from "wokcommands";

export default {
    category: 'Utilities',
    description: 'Gives latency',

    slash: true,
    testOnly: true,

    callback: ({client, interaction: msgInt }) => {
        let APIping = Math.round(client.ws.ping)
        var ping: any;
        msgInt.channel?.send('Calculating ping...')
        .then((resultMessage) => {
            ping = resultMessage.createdTimestamp - msgInt.createdTimestamp;
            resultMessage.delete()
        })
        msgInt.reply({content: 'Calculating ping...',})
        .then(() => {
            msgInt.editReply({content: `Bot latency is ${ping}ms\nAPI latency is ${APIping}ms`,})
        })

    },
} as ICommand