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
    const channelSG = client.channels.cache.find(channel => channel.id === '829557786160791592')
    const channelSGFarm = client.channels.cache.find(channel => channel.id === '831181887236997151')
    let i = 0;
    let nome = '';
    var patt2 = /[a-zA-Z]/g;
    let para = 0;
    while (para === 0) {
        var letters = args[i].match(patt2);
        if (letters === null) {
            para = 1;
        } else {
            nome += args[i] + ' ';
            i++;
        }
    }
    if (args.length - (i - 1) !== 5) {
        let embed1 = new MessageEmbed()
            .setColor(0xff0000)
            .setTitle('ERRO!')
            .setThumbnail('https://cdn.discordapp.com/attachments/829538656279724056/829554350169915424/6707486-6338182700-9df82.png')
            .setDescription('Something went wrong. Please Try again.')
        message.channel.send(embed1);
    } else {
        //INSERINDO DADOS NO MONGODB
        const newData = new Data({
            id: message.id,
            carta: nome,
            quantidade: args[i],
            location: args[i + 1],
            floor: args[i + 2],
            tipo: args[i + 3],
            id_cliente: message.author.id,
            messageEmbedid: '',
            farmer: '',
            progress: '',
            farmerEx: ''
        })

        newData.save().catch(err => console.log(err));
        //EMBED PRA NOIS
        let embed = new MessageEmbed()
            .setTitle('Order')
            .setThumbnail('https://cdn.discordapp.com/attachments/829538656279724056/829541607950385152/c3c501c6cc63c69c6b3e6b6eab5029ec94469860.png')
            .setColor(0x16F8FF)
            .setDescription('Dados passados pelo cliente:')
            .addFields(
                {name: 'Nome da carta', value: nome},
                {name: 'Quantidade', value: args[i]},
                {name: 'Location/Floor', value: args[i + 1] + '/' + args[i + 2]},
                {name: 'Tipo do pedido', value: args[i + 3]},
                {name: 'Cliente', value: message.author}
            )
            .setFooter('id: ' + message.id)
        channelSG.send(embed);
        channelSGFarm.send(embed);

        //SUCESSO APARECE PRO CLIENTE
        let embed3 = new MessageEmbed()
            .setTitle('Order')
            .setThumbnail('https://cdn.discordapp.com/attachments/829538656279724056/829554808175853619/328159114037211.png')
            .setColor(0x16F8FF)
            .setDescription('Success! We received your order.')

        message.channel.send(embed3)

        //,order "Nome" "Qnts" "loc" "fl" "type"
    }

}