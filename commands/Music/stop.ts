import { ICommand } from "wokcommands";
const music = require('@koenie06/discord.js-music');

export default {
    category: 'Music',
    description: 'Stops music',

    slash: true,
    testOnly: true,

    callback: ({ interaction: msgInt}) => {
        music.stop({ interaction: msgInt });
        return 'Stopped ⛔'
    },
} as ICommand