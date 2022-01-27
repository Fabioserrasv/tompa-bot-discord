const Discord = require('discord.js');
const { Client, MessageEmbed } = require('discord.js');
module.exports.run = async (client, message, args) => {
    function emoji (id){
        return client.emojis.cache.get(id).toString();
    }
    
    let embed = new MessageEmbed()
    .setTitle('Build:')
    .setThumbnail('https://cdn.discordapp.com/emojis/827642789189517372.png?v=1')
    .setColor(0x16F8FF)
    .setDescription('Build contra Poison (passa uma fome mas da)')
    .addFields(
        {name: 'Pain for Power ' + emoji('827642789121884192'), value: 'Roy Mustang :fire:\n Takasugi Shinsuke :sparkles:'},
        {name: 'Def Berserker ' + emoji('827642788740988969'), value: 'Kurapika :sunny:\n Mayuri :fire:'},
        {name: 'Blood Surge ' + emoji('827642789058969630'), value: 'Zombieman :crescent_moon:\n Dio Brando :zap:'},
    )

    message.channel.send(embed);
}