//Invite link
//
//https://discordapp.com/api/oauth2/authorize?client_id=374025658411646977&permissions=0&scope=bot
//
//All the required imports, words, users, etc
//Importing Packages
const Discord = require("discord.js");
const Sequelize = require("sequelize");
const config = require("./config.json");
const fs = require("fs");
//creating client
const client = new Discord.Client();
//naming swear words to censor
const swears = ["shit", "fuck", "dick", "cunt", "bitch"];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const Setup = require("./SetUp/setup.js");
let swearRegex = new RegExp(`(${swears.join('|')})`, 'i');
let prefix = config.prefix;
client.commands = new Discord.Collection();
//Makes the bot connect with the token
client.login(config.token);



//Creating tables and stuff in other files
const userCardsTable = Setup.CreateUserCardTable();
const Users = Setup.CreateUsers(userCardsTable);
console.log(Users);
const Cards = Setup.CreateCards(userCardsTable);
const UserCards = Setup.CreateUserCards(userCardsTable, Cards, Users);
const UserDecks = Setup.CreateUserDecks(userCardsTable, Cards, Users);



client.on('ready', async () => {
    console.log("Online!");
    client.user.setActivity("Content Maker 3000");
    await Users.sync();
    await Cards.sync();
});

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on("message", async (message) => {
    if (message.author.bot) return;
    let args = message.content.slice(prefix.length).trim().split(" ");
    let cmd = args.shift().toLowerCase();

    //every message searches if the user is registerd in the database
    let finput = message.content.slice(prefix.length).split(' ');
    let input = finput.shift();
    console.log(message.guild.name);
    console.log(message.author.id);
    const finduser = await Users.findOne({ where: { id: message.author.id } });
    let date = new Date("2015-01-01");
    //checks if the user already exists, if not, creates user
    if (finduser === null) {
        console.log("User not found");
        try {
            const users = await Users.create({
                id: message.author.id,
                name: message.author.username,
                ownedcards: 0,
                cardlist: null,
                nextclaim: date
            });
            console.log('new user added');
            await Users.sync();
        } 
        catch (e) {
            console.log(e);
        }
    }

    //rng for personalised messages
    client.commands.get('personalmsg').execute(message, args);

    //checks to make sure the message starts with the correct prefix from now on
    if (message.content.indexOf(prefix) !== 0) {
        return;
    }

    //checks for swears
    if (swearRegex.test(message.content)) {
        client.commands.get('swears').execute(message, args);
    }

    //checks for commands
    if (!client.commands.has(cmd)) return;
        client.commands.get(cmd).execute(message, args, Cards, Users, UserCards, UserDecks);
    
});