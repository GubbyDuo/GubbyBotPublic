const Discord = require("discord.js");
const client = new Discord.Client();

module.exports = {
    name: 'cards',

    async execute(message, args, Cards, Users, UserCards) {
        const finduser = await Users.findOne({ where: { id: message.author.id } });
        const findusercards = await UserCards.findAll({
            where: { userId: message.author.id },
            order: [
                ['cardId', 'ASC']
            ],
            raw: true
        });
        if (finduser) {
            let ownedcards = finduser.get('ownedcards');
            if (ownedcards == 0) {
                message.channel.send("There are no cards, take off your clothes\n(type '>roll' to roll for cards bro)");
                return;
            }
            const updatecardamount = await finduser.update({ ownedcards: ownedcards });
            message.channel.send(`You currently have ${ownedcards} card(s)`);
            let realfinallist = [];
            let richembed = new Discord.RichEmbed()
                .setTitle(message.author.username + "'s Card(s)");

            for (var i = 0; i < findusercards.length; i++) {

                var findcards = await Cards.findOne({ where: { id: findusercards[i].cardId } });

                realfinallist.push("#" + findcards.id + " - " + findcards.name + "  -  " + findcards.rarity);
            }

            realfinallist.join("\n");
            richembed.setDescription(realfinallist);
            message.channel.send(richembed);
        }
    }
}