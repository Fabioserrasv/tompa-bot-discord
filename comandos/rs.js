const Discord = require('discord.js');
const {Client, MessageEmbed} = require('discord.js');
//const config = require("../config.json")
const mongoose = require("mongoose");

function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}

//mongoose.connect(config.mongopass, {
    mongoose.connect(process.env.mongopass, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    //models
const Data = require("../models/quaverUser.js");

module.exports.run = async (client, message, args) => {
    if (message.member.hasPermission('ADMINISTRATOR') || message.member.roles.cache.has('829543074803744829') || message.member.roles.cache.has('755106314367270915') || message.member.roles.cache.has('758130026347888640') ) {
        
        let mode = 1
        if(args[0] == '7k'){
            mode = 2
        }

        let autorMsg = (await Data.findOne({
            id_discord: message.author.id
        }).exec())

        if(autorMsg != null){
            let yourUrl = "https://api.quavergame.com/v1/users/scores/recent?id="+autorMsg.id_quaver+'&mode='+mode;

            const axios = require('axios')

            axios
            .get(yourUrl)
            .then(res => {        
                var result = Object.entries(res.data.scores)
                let score = (result)[0][1];
                let mapa
                axios.get('https://api.quavergame.com/v1/maps/'+score.map.id).then(res2 => {
                    mapa = Object.entries(res2.data)[1][1]
                    //console.log(mapa)

                    let data = new Date(score.time)
                    data = data.getDate() + '/' + ((data.getMonth() + 1)) + '/' + data.getFullYear()

                    let embed = new MessageEmbed()
                    .setTitle('Score recente: ')
                    .setThumbnail('https://static.quavergame.com/img/logo.png')
                    .setColor(0xBC55FF)
                    .setDescription('**1. ['+ mapa.title + '](https://quavergame.com/mapset/map/'+ mapa.id +') [' + mapa.difficulty_name + '] '+' ('+String(mapa.difficulty_rating).substr(0,4)+'★)**')
                    .addFields(
                    {name: 'Detalhes ', 
                        value: '**Score**: '+ kFormatter((score.total_score)) + '\n' +
                            '**Performance Rating**: '+ String(score.performance_rating).substr(0,6) + '\n' +
                            '**Combo**: '+ score.max_combo + '\n' +
                            '```ACCURACY: '+ String(score.accuracy).substr(0,5) +'%\nMarv: (' + score.count_marv + ') Perf: (' + score.count_perf + ') Great: (' + score.count_great + ') Good: (' + score.count_good + ') Okay: (' + score.count_okay + ') Miss: ('+ score.count_miss+')```' + '\n' + 
                            'Data: ' + data
                            } 
                    )

                    message.channel.send(embed)
                }) 
            })
            .catch(error => {
                console.error(error)
            })
        }else{
            message.channel.send('Você não tem uma conta sincronizada, utilize ,syncQuaver <Nome no Quaver> <Steam Username>.')
        }
    }
}
