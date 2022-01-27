const Discord = require('discord.js');
const niveisSr = [0,10,28,51,80,111,146,185,226,270,316,364,415,468,523,580,640,700,763,828,894,962,1031,1103,1175,1250,1325,1402,1481,1561,1643,1726,1810,1895,1982,2070,2160,2250,2342,2435,2529,2625,2721,2819,2918,3018,3119,3222,3325,3430,3535,3642,3749,3858,3968,4078,4190,4303,4417,4513];
const { Client, MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
        if (!args.length){
            let embed1 = new MessageEmbed();
            embed1.setColor(0xff0000);
            embed1.setTitle('ERRO!');
            embed1.setDescription('Você não colocou nada');
            message.channel.send(embed1);
        }else{
        let nivel = args[1];
        let total = 0;
        let r = 0;
        let uc = 0;
        let c = 0;
        //SOMA TOTAL DE XP DO PERSONAGEM A PARTIR DO NIVEL QUE ELE ESTA
        for(var i = 0; i < nivel; i++){
                total += niveisSr[i];
        }
        //ADICIONA XP QUE A CARTA JA POSSUI
        if(args[3]){
            total += parseInt(args[3])
        }
        //VERIFICA RARIDADE DA CARTA E SUBTRAI DO TOTAL DE XP DA RARIDADE, DEPOIS DIVIDE PELO XP DE R,UC,C
        if(args[0] === 'ur'){
                total = 109180 - total
        }else if(args[0] === 'sr'){
                total = 68927 - total
        }
        if(args[2] === 'igual' || args[2] === 'i'){
                r = Math.ceil(total/(300*3))
                uc = Math.ceil(total/(200*3))
                c = Math.ceil(total/(100*3))
        }else{
                r = Math.ceil(total/300)
                uc = Math.ceil(total/(200))
                c = Math.ceil(total/(100))
        }
        //EMBED
        let embed2 = new MessageEmbed()
            .setTitle('Calculo')
            .setColor(0x16F8FF)
            .setDescription('Você precisa de ' +total+' de xp')
            .addFields(
                {name: 'Rares: ', value: r + '\n'},
                {name: 'Uncommons: ', value: uc + '\n'},
                {name: 'Commons: ', value: c + '\n'},
            )
        //ENVIA MENSAGEM
        message.channel.send(embed2);
    
}}