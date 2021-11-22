import { ICommand } from "wokcommands";
import { GuildMember, MessageEmbed, VoiceChannel } from "discord.js";
import yts from 'yt-search';
import * as music from '@koenie06/discord.js-music';


export default {
    category: 'Music',
    description: 'Plays requested song',

    slash: true,
    testOnly: true,

    expectedArgs: '<song>',
    minArgs: 1,

    permissions: ['CONNECT', 'SPEAK'],

    callback: async ({ interaction: msgInt }) => {
        const member = msgInt.member as GuildMember // || message.member
        const song = msgInt.options.getString('song')!;
        const voiceChannel = member.voice.channel as VoiceChannel;
        if(!voiceChannel) return msgInt.reply({ content: 'You need to be in a voice channel!', ephemeral: true });
        let r = await yts(song)
        console.log(r.videos[0])
        // const videos = r.videos.slice( 0, 3 )
        // videos.forEach( function ( v: any ) {
        //     const views = String( v.views ).padStart( 10, ' ' )
        //     console.log( `${ views } | ${ v.title } (${ v.timestamp }) | ${ v.author.name }` )
        // } )
        await msgInt.deferReply();
        const musicEmbed = new MessageEmbed()
            .setTitle("WIP");


        console.log(r.videos[0].url)
        music.play({
            interaction: msgInt,
            channel: voiceChannel,
            song: r.videos[0].url,
        })
        .then(() => {
            musicEmbed.setTitle(r.videos[0].title)
            musicEmbed.setThumbnail(r.videos[0].thumbnail)
            musicEmbed.setURL(r.videos[0].url)
            musicEmbed.setDescription('Song added to queue!')
            musicEmbed.setFooter('Duration: ' + r.videos[0].duration)
            musicEmbed.setColor(0xEB4444)
            musicEmbed.setAuthor(r.videos[0].author.name,'https://i.imgur.com/nWYciKQ.png' , r.videos[0].author.url)
            msgInt.editReply({
                embeds: [musicEmbed]
            })
        })
        
        //const isResumed = await music.isResumed({ interaction: msgInt });
        //if(!isResumed){
        //    music.resume({ interaction: msgInt });
        //}
        
        // msgInt.reply({
        //     content: 'Loading...',
        //     embeds: [musicEmbed]
        // }).then(() => {
        //     msgInt.editReply({
        //         content: 'Added song to queue!',
        //         embeds: [musicEmbed]
        //     })
        // })


        
        
    },
} as ICommand