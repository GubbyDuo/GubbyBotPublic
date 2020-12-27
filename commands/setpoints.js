const Discord = require("discord.js");
const client = new Discord.Client();

module.exports = {
    name: 'setpoints',

    async execute(message, args, Cards, Users) {

        const finduser = await Users.findOne({ where: { id: message.author.id } });
        console.log(args);
        let pointtotal = 0;
        pointtotal = parseInt(args[0]) + parseInt(args[1]) + parseInt(args[2]) + parseInt(args[3]);
        console.log(pointtotal);
        if (pointtotal > 10) {
            return (message.channel.send("Too many points! Please only use 10 points."));
        }
        var hp = args[0];
        var pp = args[1];
        var rp = args[2];
        var ap = args[3];

        const addingPoints = await finduser.update({
            healthPoints: hp,
            powerPoints: pp,
            regenPoints: rp,
            armorPoints: ap
        });
    }
}