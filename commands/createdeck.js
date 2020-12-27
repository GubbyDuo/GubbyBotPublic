const Discord = require("discord.js");
const client = new Discord.Client();
const Functions = require("../SetUp/cardfunctions");

module.exports = {
    name: 'createdeck',

    async execute(message, args, Cards, Users, UserCards, UserDecks) {
        const finddeck = await UserDecks.findAll({ where: { userId: message.author.id } });

        for (var i = 0; i < finddeck.length; i++) {
            await finddeck[i].destroy();
        }

        const cardlist = await UserCards.findAll({ where: { userId: message.author.id } });
        let userscardlist = new Array;
        let embedList = new Array;
        if (args.length >= 20) {
            message.channel.send("Deck too long, please keep your deck below 20 cards");
            return;
        }
        //creating decklist in a new array
        //if cardlists get REALLY long I might need to fix this
        for (var i = 0; i < cardlist.length; i++) {
            userscardlist.push(cardlist[i].cardId);
        }

        for (var i = 0; i < args.length; i++) {
            var card = args[i];

            try {
                var arrayIndex = userscardlist.indexOf(card);

            }
            catch{
                message.channel.send("Please only use cards you own");
                return;
            }

            userscardlist.splice(arrayIndex, 1);

            UserDecks.create({ userId: message.author.id, cardId: card });

            var newcard = await Cards.findOne({ where: { id: card } });

            embedList.push("#" + newcard.id + " - " + newcard.name + " - " + newcard.rarity);
        }

        Functions.sendDeck(embedList, message);
    }
}