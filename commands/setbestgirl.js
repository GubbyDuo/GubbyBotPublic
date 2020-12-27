const Discord = require("discord.js");
const client = new Discord.Client();
client.msgs = require("../Data/ServerWaifu.json");
const fs = require("fs");
const Sequelize = require("sequelize");

module.exports = {
    name: 'setbestgirl',

    execute(message, args) {


        try {
            let msg = args.join(" ").split(">");
            console.log(msg);
            console.log(msg[1]);
            let authname = message.author.username;

            client.msgs[message.author.username] = {
                bestgirl: msg[0].trim(),
                bestgirlurl: msg[1].trim()
            }
            fs.writeFile("./Data/ServerWaifu.json", JSON.stringify(client.msgs, null, 4), err => {
                if (err) throw err;
                message.delete();
                let _bestGirl = client.msgs[message.author.username].bestgirl;
                let _bestGirlUrl = client.msgs[message.author.username].bestgirlurl;
                let bestGirlEmbed = new Discord.RichEmbed()
                    .setTitle("Best Girl Set!")
                    .addField(authname + "'s Best Girl", _bestGirl)
                    .setImage(_bestGirlUrl);

                message.channel.send(bestGirlEmbed);
            });
        }
        catch (err) {
            if (msg[1] == undefined) {
                message.channel.send("Please include a name or URL. \n Syntax: >setbestgirl [name]>[URL]")
            }
        }
    }
}