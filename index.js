const Discord = require("discord.js"); //Conexão com a livraria Discord.js
const client = new Discord.Client(); //Criação de um novo Client
//const config = require("./config.json"); //Pegando o prefixo do bot para respostas de comandos LOCAL

//client.login(config.token); //Ligando o Bot caso ele consiga acessar o token LOCAL
client.login(process.env.token)

client.on("ready", () =>{
    console.log('Bot ligado com sucesso às' + new Date())
})
//
client.on('message', message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    if (!message.content.toLowerCase().startsWith(process.env.prefix.toLowerCase())) return;
    //if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
    if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

   const args = message.content
       .trim().slice(process.env.prefix.length)
       //.trim().slice(config.prefix.length)
       .split(/ +/g);
   const command = args.shift().toLowerCase();

   try {
       const commandFile = require(`./comandos/${command}.js`)
       commandFile.run(client, message, args);
   } catch (err) {
   console.error('Erro:' + err);
 }
});