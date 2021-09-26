import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Deletes every message in a channel',

    slash: 'both',
    testOnly: true,
    ownerOnly: true,

    permissions: ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'],

    callback: ({ channel }) => {
        channel.clone({})
        .then(channel => {
            channel.setPosition(channel.position)
            channel.send('Nuked 💥')
        })
        channel.delete()
    },
} as ICommand