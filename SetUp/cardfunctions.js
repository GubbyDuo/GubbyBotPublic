const Discord = require("discord.js");
const Sequelize = require("sequelize");

module.exports = {
    addDays: function (date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    },

    sendDeck: function (embedList, message) {
        let deckembed = new Discord.RichEmbed()
            .setTitle(message.author.username + "'s Decklist")
            .setThumbnail(message.author.avatarURL);

        embedList.join("\n");
        deckembed.setDescription(embedList);
        message.channel.send(deckembed);
    },

    getCardRarity: async function (rarity, rarityCaps, findrandcard, crarity, roll, Cards, message, finduser, UserCards) {
        crarity = rarity;
        console.log(crarity);
        findrandcard = await Cards.findOne(
            {
                where: { rarity: rarityCaps },
                order: Sequelize.literal('RANDOM()')
            });
        console.log(findrandcard.name);
        message.channel.send("you rolled " + roll + " and got a " + findrandcard.name + " (" + crarity + ")");

        UserCards.create({ userId: finduser.id, cardId: findrandcard.id });
    }
}