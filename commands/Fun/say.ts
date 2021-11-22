import { ICommand } from "wokcommands";

export default {
    category: 'Fun',
    description: 'Says what you want',

    slash: true,
    testOnly: true,
    ownerOnly: true,

    expectedArgs: '<text>',
    minArgs: 1,

    callback: async ({ text, channel, interaction: msgInt }) => {
        channel.sendTyping();
        console.log(text)
        await sleep(2000);
        channel.send(text)
        msgInt.reply({
            content: 'Sent',
            ephemeral: true,

        })
        function sleep(ms: number) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        return
    },
} as ICommand