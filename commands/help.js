const Discord = require("discord.js");
let gubbyPfp = require("../config.json").pfp;

module.exports = {
    name: 'help',

    execute(message, args) {
        const helpEmbed = new Discord.RichEmbed()
            .setColor("#0099ff")
            .setThumbnail(gubbyPfp)
            .setTitle("GubbyBot")
            .addField("GubbyBot Help Menu", "Prefix: >")
            .addField("Help", "Displays this menu")
            .addField("Ping", "Pong :)")
            .addField("SetBestGirl", "Sets your own personal waifu! \n Syntax: >setbestgirl [name]>[image url]")
            .addField("BestGirl", "Displays your best girl (MUST BE SET)")
            .addField("Say", "Says whatever comes after the command")
            .addField("Profile", "(WIP) Displays your epic profile!")
            .addField("Steam", "Displays some steam statistics \n Syntax: >Steam [user profile link]")
            .setFooter("Created by GubbyDuo");
        message.channel.send(helpEmbed);
    }
}