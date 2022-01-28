const desenvolvimento = false

if(desenvolvimento == false){
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
        
        let autorMsg = (await Data.findOne({
            id_discord: message.author.id
        }).exec())

        let mode = 1
                    if(args[0] == '7k'){
                        mode = 2
                    }

        if(autorMsg != null){
            let yourUrl = "https://api.quavergame.com/v1/users/scores/best?id="+autorMsg.id_quaver+'&mode='+mode;

            const axios = require('axios')

            axios
            .get(yourUrl)
            .then(res => {
                axios.get('https://api.quavergame.com/v1/users/full/'+autorMsg.id_quaver).then(res2 => {

                    let result2 = Object.entries(res2.data.user)

                    var result = Object.entries(res.data.scores)

                    let um = result[0][1]
                    let dois = result[1][1]
                    let terceiro = result[2][1]
                    let quarto = result[3][1]
                    let cinco = result[4][1]

                    let data1 = new Date(um.time)
                    data1 = data1.getDate() + '/' + ((data1.getMonth() + 1)) + '/' + data1.getFullYear()

                    let data2 = new Date(dois.time)
                    data2 = data2.getDate() + '/' + ((data2.getMonth() + 1)) + '/' + data2.getFullYear()

                    let data3 = new Date(terceiro.time)
                    data3 = data3.getDate() + '/' + ((data3.getMonth() + 1)) + '/' + data3.getFullYear()

                    let data4 = new Date(quarto.time)
                    data4 = data4.getDate() + '/' + ((data4.getMonth() + 1)) + '/' + data4.getFullYear()

                    let data5 = new Date(cinco.time)
                    data5 = data5.getDate() + '/' + ((data5.getMonth() + 1)) + '/' + data5.getFullYear()

                    let embed = new MessageEmbed()
                    .setTitle('Top Quaver Scores de ' + message.author.username)
                    .setThumbnail(result2[0][1].avatar_url)
                    .setColor(0xBC55FF)
                    //.setDescription('**1. ['+ mapa.title + '](https://quavergame.com/mapset/map/'+ mapa.id +') [' + mapa.difficulty_name + '] '+' ('+String(mapa.difficulty_rating).substr(0,4)+'★)**')
                    .addFields(
                    {name: '\u200b', 
                        value: '1. [**' + um.map.title + '**](https://quavergame.com/mapset/map/'+ um.map.id +') ['+ um.map.difficulty_name +']' + ' • ' + kFormatter(um.total_score) + ' • ' + data1 + '\n' +
                            'Performance Rating: ' + String(um.performance_rating).substr(0,6) + ' • ' + um.max_combo + 'x ' + '\n' +
                            '```ACCURACY: '+ String(um.accuracy).substr(0,5) +'%\nMarv: (' + um.count_marv + ') Perf: (' + um.count_perf + ') Great: (' + um.count_great + ') Good: (' + um.count_good + ') Okay: (' + um.count_okay + ') Miss: ('+ um.count_miss+')```' + '\n' + 
                            '2. [**' + dois.map.title + '**](https://quavergame.com/mapset/map/'+ dois.map.id +') ['+ dois.map.difficulty_name +']' + ' • ' + kFormatter(dois.total_score) + ' • ' + data2 + '\n' +
                            'Performance Rating: ' + String(dois.performance_rating).substr(0,6) + ' • ' + dois.max_combo + 'x ' + '\n' +
                            '```ACCURACY: '+ String(dois.accuracy).substr(0,5) +'%\nMarv: (' + dois.count_marv + ') Perf: (' + dois.count_perf + ') Great: (' + dois.count_great + ') Good: (' + dois.count_good + ') Okay: (' + dois.count_okay + ') Miss: ('+ dois.count_miss+')```'
                    },
                    {name: '\u200b',
                            value: '3. [**' + terceiro.map.title + '**](https://quavergame.com/mapset/map/'+ terceiro.map.id +') ['+ terceiro.map.difficulty_name +']' + ' • ' + kFormatter(terceiro.total_score) + ' • ' + data3 + '\n' +
                            'Performance Rating: ' + String(terceiro.performance_rating).substr(0,6) + ' • ' + terceiro.max_combo + 'x ' + '\n' +
                            '```ACCURACY: '+ String(terceiro.accuracy).substr(0,5) +'%\nMarv: (' + terceiro.count_marv + ') Perf: (' + terceiro.count_perf + ') Great: (' + terceiro.count_great + ') Good: (' + terceiro.count_good + ') Okay: (' + terceiro.count_okay + ') Miss: ('+ terceiro.count_miss+')```' + '\n' + 
                            '4. [**' + quarto.map.title + '**](https://quavergame.com/mapset/map/'+ quarto.map.id +') ['+ quarto.map.difficulty_name +']' + ' • ' + kFormatter(quarto.total_score) + ' • ' + data4 + '\n' +
                            'Performance Rating: ' + String(quarto.performance_rating).substr(0,6) + ' • ' + quarto.max_combo + 'x ' + '\n' +
                            '```ACCURACY: '+ String(quarto.accuracy).substr(0,5) +'%\nMarv: (' + quarto.count_marv + ') Perf: (' + quarto.count_perf + ') Great: (' + quarto.count_great + ') Good: (' + quarto.count_good + ') Okay: (' + quarto.count_okay + ') Miss: ('+ quarto.count_miss+')```' + '\n' + 
                            '5. [**' + cinco.map.title + '**](https://quavergame.com/mapset/map/'+ cinco.map.id +') ['+ cinco.map.difficulty_name +']' + ' • ' + kFormatter(cinco.total_score) + ' • ' + data5 + '\n' +
                            'Performance Rating: ' + String(cinco.performance_rating).substr(0,6) + ' • ' + cinco.max_combo + 'x ' + '\n' +
                            '```ACCURACY: '+ String(cinco.accuracy).substr(0,5) +'%\nMarv: (' + cinco.count_marv + ') Perf: (' + cinco.count_perf + ') Great: (' + cinco.count_great + ') Good: (' + cinco.count_good + ') Okay: (' + cinco.count_okay + ') Miss: ('+ cinco.count_miss+')```'
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
}
