import { ICommand } from "wokcommands";
import { Bot } from 'smart-botto'
export default {
    category: 'Fun',
    description: 'Talks to bot',

    slash: true,
    testOnly: true,

    expectedArgs: '<text>',
    minArgs: 1,

    callback: async ({ text, channel, interaction: msgInt }) => {
        // const chatbot = new Bot('Bot Name Dog')

        // channel.sendTyping();
        // msgInt.reply('ㅤ')
        // msgInt.deleteReply()
        // await sleep(2000);

        // chatbot.chat({
        //     message: text,
        //     user: msgInt.user.id
        // })
        // .then((res) => console.log(res)) 

        // function sleep(ms: number) {
        //     return new Promise(resolve => setTimeout(resolve, ms));
        // }

        return 'come back later when this works'
    },
} as ICommand