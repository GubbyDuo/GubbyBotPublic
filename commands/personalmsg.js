const Discord = require('discord.js');

module.exports = {
    name: 'personalmsg',

    execute(message, args) {

        let rng = Math.floor(Math.random() * (150 - 1) + 1);
        console.log("Random number (out of 150): " + rng);
        if (rng == 1) {
            console.log(message.author.id);
            //Gubby
            if (message.author.id == 162710559156862977) {
                message.channel.send("WHY WOULD YOU CREATE ME YOU PIECE OF SHIT FUCK YOU");
            }
            //Gimhan
            if (message.author.id == 562190497247133696) {
                message.channel.send("SHUT THE FUCK UP GIMHAN");
            }
            //Alyssa
            if (message.author.id == 325210733430177792) {
                message.channel.send("FUCKING E-GIRL SHUT THE FUCK UP");
            }
            //Jacob
            if (message.author.id == 231641894805962752) {
                message.channel.send("GO BACK TO PLAYING MELEE YOU FUCKING FUCK");
            }
            //Elliot
            if (message.author.id == 248395843961356288) {
                message.channel.send("GO STREAM SOME GAY SHIT YOU MOIST FUCK");
            }
        }
    }
}