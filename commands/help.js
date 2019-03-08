const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    //##### Info Embeds #####
    let help = new Discord.RichEmbed()
        .setDescription("##### Help #####")
        .setAuthor(message.author.username, message.author.avatarURL)
        .setColor("#15f153")
        .addField("Help", "**!ban** | Bans a selected user \n" +
        "**!kick** | Kicks a selected user \n" +
        "**!softban** | Bans and immediately unbans selected user")
        .setFooter("Vyžádáno:")
        .setTimestamp();

    message.channel.send(help);
}

module.exports.help = {
    name: "help"
}
