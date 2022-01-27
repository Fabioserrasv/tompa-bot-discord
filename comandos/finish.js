const Discord = require('discord.js');
const {Client, MessageEmbed} = require('discord.js');
const mongoose = require("mongoose");
//const config = require("../config.json")

//CONNECT TO DATABASE
//mongoose.connect(config.mongopass, {
mongoose.connect(process.env.mongopass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//models
const Data = require("../models/data.js");

module.exports.run = async (client, message, args) => {
    if (message.member.hasPermission('ADMINISTRATOR') || message.member.roles.cache.has('829543074803744829') || message.member.roles.cache.has('755106314367270915')) {
        const channelDelivery = client.channels.cache.find(channel => channel.id === '829544260986077204')
        var desconto = 0
        const order = await Data.findOne({
                id: args[0]
            }, (err, orderX) => {
                if (err) console.log(err);
            }
        )
        if(args[1]){
            desconto = parseInt(args[1])
        }
        client.channels.cache.get('829544444700917780').messages.fetch(order.messageEmbedid).then(message => message.delete())
        var valor = 0
        if (order.tipo === 'normal' || order.tipo === 'Normal') {
            valor = (order.quantidade * 50) - ((order.quantidade * 50)* (desconto * 0.01))
        }else{
            valor = (order.quantidade * 60) - ((order.quantidade * 60) * (desconto * 0.01))
        }
        let embed = new MessageEmbed()
            .setTitle('Finished!')
            .setThumbnail('https://cdn.discordapp.com/attachments/829538656279724056/829541607950385152/c3c501c6cc63c69c6b3e6b6eab5029ec94469860.png')
            .setColor(0x16F8FF)
            .setDescription('')
            .addFields(
                {name: 'Customer', value: '<@' + order.id_cliente + '>'},
                {name: 'Card Name', value: order.carta},
                {name: 'Progress', value: 'Completed!'},
                {name: 'Total Cost:', value: valor},
                {name: 'Farmer', value: order.farmer},
            )
            .setFooter('id: ' + order.id)
        channelDelivery.send('<@' + order.id_cliente + '> Your order is ready! Ping '+order.farmer+' to collect the cards.')
        channelDelivery.send(embed)


    }
}
