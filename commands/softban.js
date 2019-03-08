const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let bReason = args.join(" ").slice(22);

    //##### User Has permission (Error) #####
    let userHasPermissionError = new Discord.RichEmbed()
        .setDescription("##### Softban #####")
        .setAuthor(message.author.username, message.author.avatarURL)
        .setColor("#ff0000")
        .addField("Error", "This user cannot be banned!")
        .setFooter("Requested:")
        .setTimestamp();

    //##### No permission (Error) #####
    let noPermissionError = new Discord.RichEmbed()
        .setDescription("##### Softban #####")
        .setAuthor(message.author.username, message.author.avatarURL)
        .setColor("#ff0000")
        .addField("Error", "You do not have required permissions to perform this command!")
        .setFooter("Requested:")
        .setTimestamp();

    //##### User not found (Error) #####
    let userNotFoundError = new Discord.RichEmbed()
        .setDescription("##### Softban #####")
        .setAuthor(message.author.username, message.author.avatarURL)
        .setColor("#ff0000")
        .addField("Error", "User by the name " + bUser + " cannot be found! Double-check if you spelled everything right.")
        .setFooter("Requested:")
        .setTimestamp();

    //##### Channel not found (Error) #####
    let channelNotFoundError = new Discord.RichEmbed()
        .setDescription("##### Softban #####")
        .setAuthor(message.author.username, message.author.avatarURL)
        .setColor("#ff0000")
        .addField("Error", "Moderation-log channel cannot be found!")
        .setFooter("Requested:")
        .setTimestamp();

    let userSuccBanned = new Discord.RichEmbed()
        .setDescription("##### Softban #####")
        .setAuthor(message.author.username, message.author.avatarURL)
        .setColor("#ff0000")
        .addField("Banned user", `${bUser} with ID ${bUser.id}`)
        .addField("Moderator", `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Channel", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", bReason)
        .setFooter("Requested:")
        .setTimestamp();

    if(!bUser){
        message.channel.send(userNotFoundError);
        return;
    }
    if(!message.member.hasPermission("MANAGE_MESSAGES")){
        message.channel.send(noPermissionError);
        return;
    }
    if(bUser.hasPermission("MANAGE_MESSAGES")){
        message.channel.send(userHasPermissionError);
        return;
    }

    let kickChannel = message.guild.channels.find(`name`, "moderation-log");
    if(!kickChannel){
        message.channel.send(channelNotFoundError);
        return;
    }

    message.guild.member(bUser).ban(bReason);
    message.guild.unban(bUser);
    message.channel.send(userSuccBanned)
        .then(msg => {
            msg.delete(30000)
        }).catch();
    kickChannel.send(userSuccBanned);
    return;
}

module.exports.help = {
    name: "ban"
}
