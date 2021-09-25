import { ICommand } from "wokcommands";
import Events from "wokcommands/src/enums/Events";

export default {
    category: 'Moderation',
    description: 'Deletes every message in a channel',

    slash: false,
    testOnly: true,
    ownerOnly: true,

    expectedArgs: '<text>',
    minArgs: 1,

    permissions: ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'],

    callback: ({ message, client, }) => {
        // if (message.channel.type == "DM") return;
        // message.channel.clone()
        // message.
        // client.channels._add(data);

        // message.channel.guild.channels.create(message.channel.name, message.channel.)

        // message.channel.clone({})
        // .then(channel => {
        //     channel.setPosition(message.channel.position)
        //     channel.send('Nuked 💥')
        // })
        // message.channel.delete()
    },
} as ICommand