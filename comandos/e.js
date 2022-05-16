const Discord = require('discord.js');
const { Client, MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    function emoji (id){
        return client.emojis.cache.get(id).toString();
    }
    
    //const hornyJail = client.channels.cache.find(channel => channel.id === '755098963098599524')

    message.channel.messages.fetch({ limit: 15 }).then(messages => {
        let lastMessage = messages.first();
        
        messages.every(mensagem =>{
          if(mensagem.content.includes('https://twitter.com')){
            let novoLink

            if(args[0] == 'n' || args[0] == 'nitter' || args[0] == 'ni'){
              novoLink = mensagem.content.replace("https://twitter.com", "https://nitter.silkky.cloud")
            }else{
              novoLink = mensagem.content.replace("https://twitter.com", "https://vxtwitter.com")
            }

            message.channel.send(novoLink)
            return false
          }
          return true
        })
      })
      .catch(console.error);
}