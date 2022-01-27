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


module.exports.run = async (client, message, args, db) => {
    if (!args[0]) {
        let embed1 = new MessageEmbed()
            .setColor(0xff0000)
            .setTitle('ERRO!')
            .setThumbnail('https://cdn.discordapp.com/attachments/829538656279724056/829554350169915424/6707486-6338182700-9df82.png')
            .setDescription('Something went wrong. Please Try again.')
        message.channel.send(embed1);
    } else {

        const order = await Data.findOne({
                id: args[0]
            }, (err, orderX) => {
                if (err) console.log(err);
            }
        )

        let embed = new MessageEmbed()
            .setTitle('Order')
            .setThumbnail('https://media0.giphy.com/media/on9LDLF5JskaQ/giphy.gif')
            .setColor(0x16F8FF)
            .addFields(
                {name: 'Card name', value: order.carta},
                {name: 'Amount', value: order.quantidade},
                {name: 'Location/Floor', value: order.location + '/' + order.floor},
                {name: 'Type', value: order.tipo},
                {name: 'Customer', value: '<@' + order.id_cliente + '>'},
                {name: 'Farmer', value: order.farmer}
            )
            .setFooter('id: ' + order.id)
        message.channel.send(embed)
    }
}