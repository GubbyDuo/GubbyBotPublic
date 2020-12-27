const Discord = require("discord.js");
const client = new Discord.Client();
const Functions = require("../SetUp/cardfunctions");

module.exports = {
    name: 'deck',

    async execute(message, args, Cards, Users, UserCards, UserDecks) {

        const finddeck = await UserDecks.findAll({ where: { userId: message.author.id } });
        console.log(finddeck[0]);
        let embedList = new Array;
        if (finddeck[0] == null) {
            message.channel.send("You currently have no deck, start rolling to earn cards!");
            return;
        }

        for (var i = 0; i < finddeck.length; i++) {
            var card = finddeck[i].cardId;
            console.log(card);
            var newcard = await Cards.findOne({ where: { id: card } });
            embedList.push("#" + newcard.id + " - " + newcard.name + " - " + newcard.rarity);
        }

        Functions.sendDeck(embedList, message);
    }
}