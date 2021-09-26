import { ICommand } from "wokcommands";
const music = require('@koenie06/discord.js-music');

export default {
    category: 'Music',
    description: 'Skips current song',

    slash: true,
    testOnly: true,

    callback: async ({ interaction: msgInt, }) => {
        music.pause({ interaction: msgInt });
        return 'Paused ⏯️'
    },
} as ICommand