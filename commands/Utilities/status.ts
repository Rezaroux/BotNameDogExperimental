import { ICommand } from "wokcommands";

export default {
    category: 'Utilities',
    description: 'Sets the bots status | PLAYING = 0 STREAMING = 1 LISTENING = 2 WATCHING = 3 COMPETING = 5',

    slash: true,
    testOnly: true,
    ownerOnly: true,

    expectedArgs: '<activitytype> <status>',
    minArgs: 2,

    callback: ({ interaction: msgInt, client }) => {
        let activityType = msgInt.options.getString('activitytype')!;
        let statusMessage = msgInt.options.getString('status')!;
        if( activityType == '0' || activityType == '1' || activityType == '2' || activityType == '3' || activityType == '5'){
            try{
                client.user?.setActivity(statusMessage, { type: parseInt(activityType) })
            }catch(err){
                console.log(err)
                return `Failed!\n${err}`
            }
        }else{
            return 'Please enter a valid activity type'
        }
        return 'Bot activity set'
    },
} as ICommand