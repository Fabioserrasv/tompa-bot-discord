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

        let ver = (await Data.findOne({ 
            id_discord: message.author.id
        }).exec())

        if(ver == null){
            let yourUrl = "https://api.quavergame.com/v1/users/search/"+ args[0];

            const axios = require('axios')

            axios
            .get(yourUrl)
            .then(res => {
                axios.get('http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key='+process.env.steam_key/*config.steam_key*/+'&vanityurl='+args[1]).then(res2 =>{
                    let result = Object.entries(res.data.users)
                    let sucesso = 0
                    let result2 = Object.entries(res2.data)
                    let steamIdRes = result2[0][1].steamid
                    
                    result.forEach((user) => {
                        if(user[1].steam_id == steamIdRes){
                            //INSERINDO DADOS NO MONGODB
                            const newData = new Data({
                                id_discord: message.author.id,
                                id_steam: steamIdRes,
                                id_quaver: user[1].id
                            })
                            newData.save().catch(err => console.log(err));
                            message.channel.send('Sua conta foi sincronizada com sucesso!')
                            sucesso = 1
                        }
                    })
        
                    if(sucesso == 0){
                        message.channel.send('Usuário não encontrado, por favor tente novamente.')
                    }
                })
            })
            .catch(error => {
                console.error(error)
            })
        }else{
            message.channel.send('Você já tem um ID cadastrado.')
        }
    }
}
