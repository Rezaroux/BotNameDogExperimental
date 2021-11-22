import { ICommand } from "wokcommands";
import fs from 'fs';
export default {
    category: 'Fun',
    description: "Sends a random roast (they're jokes please do not take offense lol)",

    slash: true,
    testOnly: true,
    callback: async ({  }) => {
        const list = fs.readFileSync('roasts.json', 'utf8')
        const listParsed = JSON.parse(list);
        
        return listParsed.roasts[Math.floor(Math.random() * listParsed.roasts.length)].submission
    },
} as ICommand