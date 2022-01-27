const Discord = require('discord.js');
const { Client, MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    let i = Math.floor(Math.random() * args.length)
    message.channel.send(args[i])
}