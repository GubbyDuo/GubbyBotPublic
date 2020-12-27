const Discord = require("discord.js");
const client = new Discord.Client();
client.msgs = require("../Data/ServerWaifu.json");

module.exports = {
    name: "profile",

    execute(message, args) {
        let accname = message.author.username;


        let profileEmbed = new Discord.RichEmbed()
            .setTitle(accname)
            .setDescription(message.author.tag)
            .setAuthor(accname + "'s Profile")
            .setThumbnail(message.author.avatarURL);


        message.channel.send(profileEmbed);
    }
}