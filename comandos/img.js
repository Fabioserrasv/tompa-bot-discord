const Discord = require('discord.js');
const axios = require('axios')
const jsdom = require("jsdom");
const pagination = require('discord.js-pagination')
const {
  JSDOM
} = jsdom;
const {
  Client,
  MessageEmbed
} = require('discord.js');
module.exports.run = async (client, message, args) => {
  function emoji(id) {
    return client.emojis.cache.get(id).toString();
  }
  message.channel.messages.fetch({
      limit: 15
    }).then(messages => {
      messages.every(mensagem => {
        if (mensagem.content.includes('https://')) {
          if(args[0] == 'big'){
            bigboobs(mensagem)
          }

          return false
        }
        return true
      })
    })
    .catch(console.error);
}

function bigboobs(mensagem) {
  let japan = mensagem.content.match(/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/)
  let linkEncode = japan ? encodeURI(mensagem.content) : mensagem.content
  const pages = []
  const reactEmoji = ["⬅️", "➡️"]
  JSDOM.fromURL(linkEncode).then(dom => {
    let allImages = dom.window.document.getElementsByClassName('attachment-large')
    if(allImages.length == 0){allImages = dom.window.document.getElementsByClassName('peg-photo')}
    if(allImages.length == 0){mensagem.channel.send('Não foi possivel realizar o procedimento.');return;}
    Array.from(allImages).forEach((image) => {
      pages.push(new MessageEmbed().setImage(image.src))
    });
    pagination(mensagem, pages, reactEmoji, '100000')
  });
}