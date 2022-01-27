const Discord = require('discord.js');
const { Client, MessageEmbed } = require('discord.js');
module.exports.run = async (client, message, args) => {
    function emoji (id){
        return client.emojis.cache.get(id).toString();
    }
    
    let embed = new MessageEmbed()
    .setTitle('Build:')
    .setThumbnail('https://cdn.discordapp.com/emojis/827642789058969630.png?v=1')
    .setColor(0x16F8FF)
    .setDescription('Build contra surge')
    .addFields(
        {name: 'Endurance ' + emoji('827642789118214165'), value: 'Kagura  :mountain:\n Naomi Misora :droplet:'},
        {name: 'Def Berserker ' + emoji('827642788740988969'), value: 'Kurapika :sunny:\n Mayuri :fire:'},
        {name: 'Life sap ' + emoji('827642789244174336'), value: 'Iris :sparkles:'},
    )

    message.channel.send(embed);
}