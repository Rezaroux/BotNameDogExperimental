import { ICommand } from "wokcommands";

export default {
    category: 'Fun',
    description: 'Says what you want',

    slash: false,
    testOnly: true,
    ownerOnly: true,

    expectedArgs: '<text>',
    minArgs: 1,

    callback: async ({ message, client, text }) => {
        message.delete()
        message.channel.sendTyping();
        console.log(text)
        await sleep(2000);
        message.channel.send(text)

        function sleep(ms: number) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        return
    },
} as ICommand