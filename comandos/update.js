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
        const channelProgress = client.channels.cache.find(channel => channel.id === '829544444700917780')
        var fazer = 1
        const order = await Data.findOne({
                id: args[0]
            }, (err, orderX) => {
                if (err) {
                    console.log(err)
                    fazer = 0
                }
            }
        )
        var messageAuthor = '<@' + message.author.id + '>'

        if (order !== null) {

            //PROBLEMA
            if (order.farmer !== '' && order.farmer.toString() !== messageAuthor.toString() && order.tipo === 'normal') {
                let embed = new MessageEmbed()
                    .setTitle('Erro')
                    .setThumbnail('https://cdn.discordapp.com/attachments/829538656279724056/829541607950385152/c3c501c6cc63c69c6b3e6b6eab5029ec94469860.png')
                    .setColor(0xCF0E0E)
                    .setDescription('Essa order já foi pega por ' + order.farmer)
                message.channel.send(embed)
            } else if (order.farmer !== '' && order.farmerEx !== '' && order.farmer.toString() !== messageAuthor.toString() && order.farmerEx.toString() !== messageAuthor.toString() && order.tipo === 'express' || order.tipo === 'Express') {

                let embed = new MessageEmbed()
                    .setTitle('Erro')
                    .setThumbnail('https://cdn.discordapp.com/attachments/829538656279724056/829541607950385152/c3c501c6cc63c69c6b3e6b6eab5029ec94469860.png')
                    .setColor(0xCF0E0E)
                    .setDescription('Essa order já foi pega por ' + order.farmer + ' e ' + order.farmerEx)
                message.channel.send(embed)

            } else {

                var idOrder = order.id
                var nome = order.carta
                var quantidade = order.quantidade
                var location = order.location
                var floor = order.floor
                var tipo = order.tipo
                var id_cliente = order.id_cliente
                var idMessageEmbed = order.messageEmbedid
                var farmer = order.farmer
                var farmerEx = order.farmerEx
                //EMBED DE PROGRESSO
                let embed = new MessageEmbed()
                if (args[1]) {
                    if (order.farmer === '' && order.tipo === 'express' || order.tipo === 'Express') {
                        farmer = message.author
                        embed
                            .setTitle('Progress')
                            .setThumbnail('https://cdn.discordapp.com/attachments/829538656279724056/830246323470467092/DZyAl6jXcAUpEHz.png')
                            .setColor(0x16F8FF)
                            .setDescription('Your orders progress:')
                            .addFields(
                                {name: 'Customer', value: '<@' + order.id_cliente + '>'},
                                {name: 'Card Name', value: nome},
                                {name: 'Progress', value: args[1] + '/' + quantidade},
                                {name: 'Farmer 1', value: farmer},
                                {name: 'Farmer 2', value: 'No one'}
                            )
                            .setFooter('id: ' + order.id)
                    } else if (order.farmer !== '' && order.farmerEx === '' && order.tipo === 'express' || order.tipo === 'Express') {
                        farmerEx = message.author
                        embed
                            .setTitle('Progress')
                            .setThumbnail('https://cdn.discordapp.com/attachments/829538656279724056/830246323470467092/DZyAl6jXcAUpEHz.png')
                            .setColor(0x16F8FF)
                            .setDescription('Your orders progress:')
                            .addFields(
                                {name: 'Customer', value: '<@' + order.id_cliente + '>'},
                                {name: 'Card Name', value: nome},
                                {name: 'Progress', value: args[1] + '/' + quantidade},
                                {name: 'Farmer 1', value: farmer},
                                {name: 'Farmer 2', value: farmerEx}
                            )
                            .setFooter('id: ' + order.id)
                    } else if (order.tipo === 'express' || order.tipo === 'Express') {
                        embed
                            .setTitle('Progress')
                            .setThumbnail('https://cdn.discordapp.com/attachments/829538656279724056/830246323470467092/DZyAl6jXcAUpEHz.png')
                            .setColor(0x16F8FF)
                            .setDescription('Your orders progress:')
                            .addFields(
                                {name: 'Customer', value: '<@' + order.id_cliente + '>'},
                                {name: 'Card Name', value: nome},
                                {name: 'Progress', value: args[1] + '/' + quantidade},
                                {name: 'Farmer 1', value: farmer},
                                {name: 'Farmer 2', value: farmerEx}
                            )
                            .setFooter('id: ' + order.id)
                    } else {
                        farmer = message.author
                        embed
                            .setTitle('Progress')
                            .setThumbnail('https://cdn.discordapp.com/attachments/829538656279724056/830246323470467092/DZyAl6jXcAUpEHz.png')
                            .setColor(0x16F8FF)
                            .setDescription('Your orders progress:')
                            .addFields(
                                {name: 'Customer', value: '<@' + order.id_cliente + '>'},
                                {name: 'Card Name', value: nome},
                                {name: 'Progress', value: args[1] + '/' + quantidade},
                                {name: 'Farmer', value: farmer}
                            )
                            .setFooter('id: ' + order.id)
                    }

                    if (idMessageEmbed !== '') {
                        channelProgress.messages.fetch(idMessageEmbed).then(message => message.edit(embed));
                    } else {
                        idMessageEmbed = await channelProgress.send(embed)
                        idMessageEmbed = idMessageEmbed.id
                    }


                    let embedSuccess = new MessageEmbed()
                        .setColor(0x16F8FF)
                        .setTitle('Update')
                        .setDescription('Success! The order was updated.')

                    message.channel.send(embedSuccess);

                    await Data.findOne({
                        id: args[0]
                    }).deleteOne().exec()

                    const newData = new Data({
                        id: idOrder,
                        carta: nome,
                        quantidade: quantidade,
                        location: location,
                        floor: floor,
                        tipo: tipo,
                        id_cliente: id_cliente,
                        messageEmbedid: idMessageEmbed,
                        farmer: farmer,
                        progress: args[1] + '/' + order.quantidade,
                        farmerEx: farmerEx
                    })
                    newData.save().catch(err => console.log(err));

                } else {
                    let embed = new MessageEmbed()
                        .setTitle('Erro')
                        .setThumbnail('https://cdn.discordapp.com/attachments/829538656279724056/829541607950385152/c3c501c6cc63c69c6b3e6b6eab5029ec94469860.png')
                        .setColor(0xCF0E0E)
                        .setDescription('Você não digitou o progresso!')
                    message.channel.send(embed)

                }
            }
        } else {
            let embed = new MessageEmbed()
                .setTitle('Erro')
                .setThumbnail('https://cdn.discordapp.com/attachments/829538656279724056/829541607950385152/c3c501c6cc63c69c6b3e6b6eab5029ec94469860.png')
                .setColor(0xCF0E0E)
                .setDescription('I couldnt find the order, please check the ID.')
            message.channel.send(embed)
        }

    } else {
        message.channel.send('se mata')
    }
}