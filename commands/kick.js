const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let kReason = args.join(" ").slice(22);

  //##### User Has permission (Error) #####
  let userHasPermissionError = new Discord.RichEmbed()
  .setDescription("##### Kick #####")
  .setAuthor(message.author.username, message.author.avatarURL)
  .setColor("#ff0000")
  .addField("Error", "This user cannot be kicked!")
  .setFooter("Requested:")
  .setTimestamp();

  //##### No permission (Error) #####
  let noPermissionError = new Discord.RichEmbed()
  .setDescription("##### Kick #####")
  .setAuthor(message.author.username, message.author.avatarURL)
  .setColor("#ff0000")
  .addField("Error", "You do not have required permissions to perform this command!")
  .setFooter("Requested:")
  .setTimestamp();

  //##### User not found (Error) #####
  let userNotFoundError = new Discord.RichEmbed()
  .setDescription("##### Kick #####")
  .setAuthor(message.author.username, message.author.avatarURL)
  .setColor("#ff0000")
  .addField("Error", "User by the name " + kUser + " cannot be found! Double-check if you spelled everything right.")
  .setFooter("Requested:")
  .setTimestamp();

  //##### Channel not found (Error) #####
  let channelNotFoundError = new Discord.RichEmbed()
  .setDescription("##### Kick #####")
  .setAuthor(message.author.username, message.author.avatarURL)
  .setColor("#ff0000")
  .addField("Error", "Moderation-log channel cannot be found!")
  .setFooter("Requested:")
  .setTimestamp();

  let userSuccKicked = new Discord.RichEmbed()
  .setDescription("##### Kick #####")
  .setAuthor(message.author.username, message.author.avatarURL)
  .setColor("#ff0000")
  .addField("Kicked user", `${kUser} with ID ${kUser.id}`)
  .addField("Moderator", `<@${message.author.id}> with ID ${message.author.id}`)
  .addField("Channel", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", kReason)
  .setFooter("Requested:")
  .setTimestamp();

  if(!kUser){
    message.channel.send(userNotFoundError);
    return;
  }
  if(!message.member.hasPermission("MANAGE_MESSAGES")){
    message.channel.send(noPermissionError);
    return;
  }
  if(kUser.hasPermission("MANAGE_MESSAGES")){
    message.channel.send(userHasPermissionError);
    return;
  }

  let kickChannel = message.guild.channels.find(`name`, "moderation-log");
  if(!kickChannel){
    message.channel.send(channelNotFoundError);
    return;
  }

  message.guild.member(kUser).kick(kReason);
  message.channel.send(userSuccKicked)
      .then(msg => {
        msg.delete(30000)
      }).catch();
  kickChannel.send(userSuccKicked);
  return;
}

module.exports.help = {
  name: "kick"
}
