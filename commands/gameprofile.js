const Discord = require("discord.js");
const client = new Discord.Client();

module.exports = {
    name: 'gameprofile',

    async execute(message, args, Cards, Users) {

        const finduser = await Users.findOne({ where: { id: message.author.id } });
        const totalpoints = 10;

        var hp = finduser.get('healthPoints');
        var rp = finduser.get('regenPoints');
        var ap = finduser.get('armorPoints');
        var pp = finduser.get('powerPoints');
        var pointsUsed = hp + rp + ap + pp;
        if (pointsUsed > totalpoints) {
            hp = 0;
            pp = 0;
            rp = 0;
            ap = 0;
        }
        var pointsLeft = totalpoints - pointsUsed;

        let gameProfileRichEmbed = new Discord.RichEmbed()
            .setTitle(message.author.username + "'s game profile")
            .setThumbnail(message.author.avatarURL)
            .addField("Health Points: ", hp)
            .addField("Power Points: ", pp)
            .addField("Regen Points: ", rp)
            .addField("Armor Points: ", ap)
            .addField("Points remaining: ", pointsLeft);

        message.channel.send(gameProfileRichEmbed);
    }
}