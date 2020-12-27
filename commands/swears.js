const verses = ["But now you must also rid yourselves of all such things as these: anger, rage, malice, slander, and filthy language from your lips. -Colossians 3:8 ",
    "Do not let any unwholesome talk come out of your mouths, but only what is helpful for building others up according to their needs, that it may benefit those who listen. -Ephesians 4:29",
    "Nor should there be obscenity, foolish talk or coarse joking, which are out of place, but rather thanksgiving. - Ephesians 5:4",
    "But I tell you that everyone will have to give account on the day of judgment for every empty word they have spoken. For by your words you will be acquitted, and by your words you will be condemned. -Matthew 12:36-37",
    "Jesus called the crowd to him and said, 'Listen and understand. What goes into someone’s mouth does not defile them, but what comes out of their mouth, that is what defiles them.' - Matthew 15:10-11",
    "Those who consider themselves religious and yet do not keep a tight rein on their tongues deceive themselves, and their religion is worthless. -James 1:26",
    "Out of the same mouth come praise and cursing. My brothers and sisters, this should not be. -James 3:10",
    "Avoid godless chatter, because those who indulge in it will become more and more ungodly. -2 Timothy 2:16",
    "Keep your tongue from evil and your lips from telling lies. Turn from evil and do good; seek peace and pursue it. -Psalm 34:13-14",
    "Set a guard over my mouth, LORD; keep watch over the door of my lips. -Psalm 141:3"];

module.exports = {
    name: 'swears',

    execute(message, args) {

        rng = Math.floor(Math.random() * 10);
        message.reply("WTH DO NOT SWEAR!!!!");
        message.channel.send(verses[rng]);

    }
}