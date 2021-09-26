import { ICommand } from "wokcommands";
import { GuildMember, MessageEmbed } from "discord.js";
const yts = require('yt-search');
const music = require('@koenie06/discord.js-music');


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
        const song = msgInt.options.getString('song');
        const voiceChannel = member.voice.channel;
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
            .setTitle("WIP")

        music.play({
            interaction: msgInt,
            channel: voiceChannel,
            song: song
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