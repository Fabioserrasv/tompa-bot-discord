const Discord = require('discord.js');
const { Client, MessageEmbed } = require('discord.js');
module.exports.run = async (client, message, args) => {
    function emoji (id){
        return client.emojis.cache.get(id).toString();
    }
    
let embed = new MessageEmbed()
        .setTitle('Build:')
        .setThumbnail('https://cdn.discordapp.com/emojis/827642789218353153.png?v=1')
        .setColor(0x16F8FF)
        .setDescription('Build contra Regeneration')
        .addFields(
            {name: 'Regeneration ' + emoji('827642789218353153'), value: 'Edward Elric  :zap:\n Machi Komacine :mountain: \n Alice Zuberg :sunny:'},
            {name: 'Blaze ' + emoji('827642788651728917'), value: 'Demiurge :fire:\n Fairy King Harlequin :leaves:'},
            {name: 'Underdog Def ' + emoji('827642789428592640'), value: 'Kurapika :sunny:\n Mayuri :fire:'},
        )

        message.channel.send(embed);
}