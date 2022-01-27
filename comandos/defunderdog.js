const Discord = require('discord.js');
const { Client, MessageEmbed } = require('discord.js');
module.exports.run = async (client, message, args) => {
    function emoji (id){
        return client.emojis.cache.get(id).toString();
    }
    
    let embed = new MessageEmbed()
        .setTitle('Build:')
        .setThumbnail('https://cdn.discordapp.com/emojis/827642789428592640.png?v=1')
        .setColor(0x16F8FF)
        .setDescription('Build contra Def Underdog')
        .addFields(
            {name: 'Life sap ' + emoji('827642789244174336'), value: 'Iris :sparkles:'},
            {name: 'Life sap ' + emoji('827642789244174336'), value: 'Iris :sparkles:'},
            {name: 'Def Berserker ' + emoji('827642788740988969'), value: 'Kurapika :sunny:\n Mayuri :fire:'},
        )

        message.channel.send(embed);
}