import { ICommand } from "wokcommands";

import simplydjs from 'simply-djs';

export default {
    aliases: ['math', 'calc', 'calculator'],
    category: 'Utilities',
    description: 'Opens a calculator',

    slash: true,
    testOnly: true,

    callback: async ({ interaction: msgInt, args, channel }) => {
        await msgInt.deferReply();


        simplydjs.calculator(msgInt, {
            slash: true,
            embedColor: '0xEB4444',
            credit: false,
        })
        .catch(e => console.log(e))
    },
} as ICommand