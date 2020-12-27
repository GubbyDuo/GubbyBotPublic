const Discord = require("discord.js");



module.exports = {
    name: 'say',

    execute(message, args) {
        let msg = args.join(" ");
        message.delete();
        message.channel.send(msg);
    }
}