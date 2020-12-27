const Discord = require("discord.js");
const client = new Discord.Client();
const Functions = require("../SetUp/cardfunctions");

module.exports = {
    name: 'roll',

    async execute(message, args, Cards, Users, UserCards) {

        const finduser = await Users.findOne({ where: { id: message.author.id } });


        //check timer
        let fdate = new Date();
        let date = fdate.toUTCString();
        let claimDate = finduser.get('nextclaim');
        let x = new Date(date);
        let y = new Date(claimDate);
        if (message.author.id == '162710559156862977') {
            message.channel.send("you can only roll once a day!");
            message.channel.send("w-wait... GubbyDuo?? Yeah okay, you can roll again.");
        }
        else if (+x <= +y) {
            message.channel.send("you can only roll once a day!");
            return;
        }
        let newDate = Functions.addDays(x, 1);
        //randomly choose rarity
        let roll = Math.floor(Math.random() * (350 - 1) + 1);
        console.log(roll);
        var findrandcard;
        var crarity;



        if (roll >= 1 && roll <= 5) {
            //secret rare
            getCardRarityRef("secret", "SECRET");
        }
        else if (roll >= 6 && roll <= 15) {
            //ultra rare
            getCardRarityRef("ur", "UR");
        }
        else if (roll >= 16 && roll <= 45) {
            //super rare
            getCardRarityRef("sr", "SR");
        }
        else if (roll >= 46 && roll <= 105) {
            //rare
            getCardRarityRef("r", "R");
        }
        else if (roll >= 106 && roll <= 350) {
            //common
            getCardRarityRef("c", "C");
        }
        ownedcardnum = finduser.ownedcards;
        ownedcardnum++;
        const updateownedcards = await finduser.update({
            ownedcards: ownedcardnum
        });

        var result = Functions.addDays(date, 1);
        const changeclaimtime = await finduser.update({
            nextclaim: result
        });


        function getCardRarityRef(rar, rarcaps) {
            Functions.getCardRarity(rar, rarcaps, findrandcard, crarity, roll, Cards, message, finduser, UserCards);
        }

    }
}

