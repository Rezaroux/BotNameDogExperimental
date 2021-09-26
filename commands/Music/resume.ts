import { ICommand } from "wokcommands";
const music = require('@koenie06/discord.js-music');

export default {
    category: 'Music',
    description: 'Resumes music',

    slash: true,
    testOnly: true,

    callback: async ({ interaction: msgInt }) => {
        music.resume({ interaction: msgInt });
        return 'Resumed ⏯️'
    },
} as ICommand