const Discord = require("discord.js");
const Axios = require("axios")

module.exports = {
	name: 'steam',

	execute(message, args) {
	    if (args[0] == undefined) {
	        message.channel.send("Please specify a user profile \n Syntax: >steam [User Profile]");
	        return;
	    }
		let profile = args[0];
		console.log(profile);
		message.delete();
		if (profile.includes("id")) {
			Axios.get(profile + '?xml=1')
			.then(response => {
				let prof = (response.data).substr(78, 17);
				getProfileGames(prof);

			})
			.catch(error => {
				console.log("error");
				console.log(error);
				message.channel.send("Please enter either of these two formats:");
				message.channel.send("https://steamcommunity.com/id/(USERNAME)/");
				message.channel.send("https://steamcommunity.com/profiles/(NUMBERS)/");
			});
		}
		else if (profile.includes("profiles")) {
			Axios.get(profile + '?xml=1')
			.then(response => {
				let prof = profile.substr(36, 17);
				getProfileGames(prof);
			})
			.catch(error => {
				console.log("error");
				console.log(error);
				message.channel.send("Please enter either of these two formats:");
				message.channel.send("https://steamcommunity.com/id/(USERNAME)/");
				message.channel.send("https://steamcommunity.com/profiles/(NUMBERS)/");
			});
		}

		function getProfileGames(prof) {
			console.log("prof: " + prof);
			Axios.get("http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=E1B4A1186D21C667D2DDD63A7E8EA220&steamid=" + prof + "&format=json")
			.then(response => {
				let gameCount = JSON.stringify(response.data.response.game_count);
				getProf(prof, gameCount);
			})
			.catch(error => {
				console.log(error);
			});
		}


		function getProf(prof, gameCount) {
			Axios.get("http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=E1B4A1186D21C667D2DDD63A7E8EA220&steamids=" + prof + "&format=json")
			.then(response => {
				let profileUrl = JSON.stringify(response.data.response.players[0].profileurl);
				let personaName = JSON.stringify(response.data.response.players[0].personaname);
				let steamPfp = JSON.stringify(response.data.response.players[0].avatarfull);

				let profileUrlf = profileUrl.substring(1, profileUrl.length - 1);
				let personaNamef = personaName.substring(1, personaName.length - 1);
				let steamPfpf = steamPfp.substring(1, steamPfp.length - 1);

				console.log(gameCount);
				createEmbed(gameCount, profileUrlf, personaNamef, steamPfpf);

			})
			.catch(error => {
			    console.log(error);
                message.channel.send("There was an error and whatnot which is most likely caused by a real name not being assigned.\n\nI'll fix it soon maybe if I can think of how but I'm not smart soo yea")
			});
		}

		function createEmbed(gameCount, profileUrlf, personaNamef, steamPfpf) {
		    const steamEmbed = new Discord.RichEmbed()
				.setAuthor(message.author.username + "'s Steam Profile", "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/512px-Steam_icon_logo.svg.png" ,profileUrlf)
				.setTitle("Steam Account name")
				.setDescription(personaNamef)
				.setThumbnail(steamPfpf)
				.addField( personaNamef + "'s game count", gameCount)
				.setFooter("This took me WAY too fucking long")

			message.channel.send(steamEmbed);
		}
	}
}