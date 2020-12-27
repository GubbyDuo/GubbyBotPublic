const ytdl = require("ytdl-core");
const queue = new Map();

module.exports = {
    name: 'play',
    description: 'plays some music',
    async execute(message, args) {
        const vc = message.member.voiceChannel;
        if (!vc) {
            message.channel.send("You aren't in a vc I think?");
            return;
        }

        const songInfo = await ytdl.getInfo(args[0]);
        console.log(songInfo);

        const song = {
        }

    }
};