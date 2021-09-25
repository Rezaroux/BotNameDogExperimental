import { ICommand } from "wokcommands";

export default {
    category: 'Fun',
    description: 'Answers question',

    slash: 'both',
    testOnly: true,

    expectedArgs: '<question>',
    minArgs: 1,

    callback: ({ args, message }) => {


        let question = message || args[0]
        let answer
        let number = Math.floor(Math.random() * 15);
        let number2 = Math.floor(Math.random() * 10);
        switch(number){
            case 0:
                answer =  'Oh ***heck*** yes'
                break;

            case 1:
                answer =  'I would say so'
                break;

            case 2:
                answer =  'Yep'
                break;

            case 3:
                answer =  'I think so'
                break;

            case 4:
                answer =  'I mean why not'
                break;

            case 5:
                answer =  'Yeast'
                break;

            case 6:
                answer =  'Yurple'
                break;

            case 7:
                answer =  'Of course'
                break;

            case 8:
                answer =  'Sure'
                break;

            case 9:
                answer =  'Absolutely'
                break;

            case 10:
                answer =  "Hell no"
                break;

            case 11:
                answer =  '*No*'
                break;
                
            case 12:
                answer =  "Probably not"
                break;

            case 13:
                answer =  "Nope"
                break;

            case 14:
                if(number2 === 1){
                    answer =  'Did I ask'
                }else{
                    answer =  'Dear god no'
                }
                break;

        }
        console.log("Q: " + question + "\nA: " + answer)
        return answer
    },
} as ICommand