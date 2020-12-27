const Discord = require("discord.js");
const client = new Discord.Client();
client.msgs = require("../Data/ServerWaifu.json");

module.exports = {
    name: 'bestgirl',

    execute(message, args) {
        if (args[0] == undefined) {
            let personName = message.author.username;
            createEmbed(personName);
        }
        else {
            let person = message.mentions.users.first();
            let personName = person.username;
            console.log(personName);
            createEmbed(personName);
        }

        function createEmbed(personName) {
            try {
                console.log(client.msgs[personName].bestgirl);
                let _bestGirl = client.msgs[personName].bestgirl;
                let _bestGirlUrl = client.msgs[personName].bestgirlurl;
                createEmbed(_bestGirl, _bestGirlUrl);
            }
            catch {
                message.channel.send("Best girl not found \nYou need to set a best girl with >setbestgirl (link)")
            }

            function createEmbed(_bestGirl, _bestGirlUrl) {
                try {
                    let bestGirlEmbed = new Discord.RichEmbed()
                        .addField(personName + "'s Best Girl", _bestGirl)
                        .setImage(_bestGirlUrl);

                    message.channel.send(bestGirlEmbed);

                }
                catch (err)
                {
                    console.log(err);
                    message.channel.send("Error of some sort etc etc \nare you sure you've set a bestgirl?")
                }
            }
        }
    }
}