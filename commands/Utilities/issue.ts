import fs from 'fs';

import { ICommand } from "wokcommands";

export default {
    category: 'Utilities',
    description: 'Sends report to bot developer',

    slash: true,
    testOnly: true,

    expectedArgs: '<issue>',
    minArgs: 1,

    callback: ({ interaction: msgInt, }) => {

        var logs = fs.readFileSync('issues.txt', 'utf8')
        fs.writeFileSync('issues.txt', logs + '\n' + msgInt.options.getString('issue') + ' - ' + msgInt.member?.user.username + '#' + msgInt.member?.user.discriminator)

        return 'Issue report sent'
    },
} as ICommand