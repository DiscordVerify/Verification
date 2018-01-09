const Discord = require('discord.js');
const client = new Discord.Client();
const token = "" // Recommended to load from json file.
const prefix = "."
global.botuser = null
client.on('ready', () => {
  console.log('I am ready!');
  botuser = client.user;
  client.user.setGame('Verification at your service!');
});

client.on('message', message => {
  var cmd = message.content.split(' ');
  var user = message.member;
  if (cmd[0] == prefix+'ping' && message.member.id != client.user.id) {
    message.delete();
    message.reply('pong!');
  }
  if(cmd[0] == prefix+'help' && user.hasPermissions(8) == true && message.member.id != client.user.id) {
    message.delete();
    message.reply("Hi! I'm Verification, the public discord bot that acts like a social media verification thing.");
    message.channel.sendMessage("Anyways, commands are:");
    message.channel.sendMessage(prefix+"help - You're seeing this right now!");
    message.channel.sendMessage(prefix+"ping - ping pong!");
    // TODO : message.reply(prefix+"help-on-role - How to create \"Verified Accounts\" role.");
    message.channel.sendMessage(prefix+"verifyuser <userid> - Add this user to role \"Verified Accounts\" and checkmark user.");
    message.channel.sendMessage(prefix+"remverified <userid> - Remove this user from role \"Verified Accounts\" and uncheckmarked.");
  }
  if (cmd[0] == prefix+'verifyuser' && user.hasPermissions(8) == true && message.member.id != client.user.id) {
    message.delete();
    if(cmd[1] != null) {
      var username = cmd[1].replace("@", "");
      const user = message.guild.member(cmd[1])
      if(!user){
        message.reply("No username found!");
      } else if(user) {
        const r = message.guild.roles.find("name", "Verified Accounts");
        if(!r) {
          message.reply(
            'Please create a new role named exactly "Verified Accounts".'
          );
          return;
        }
        const isinrole = user.roles.find("name", "Verified Accounts");
        if(isinrole)
        {
          message.reply("This username is already Verified!");
          return;
        }
        user.addRole(r);
        message.guild.members.get(cmd[1]).setNickname(message.guild.members.get(cmd[1]).displayName+" ✔");

        //399437752275304468 checkmark

        message.reply("User now verified! :white_check_mark:");
      }
    }
}
    if (cmd[0] == prefix+'remverified' && user.hasPermissions(8) == true && message.member.id != client.user.id) {
      message.delete();
      if(cmd[1] != null) {
        //var username = cmd[2].replace("@", "");
        const user = message.guild.member(cmd[1])
        if(!user){
          message.reply("No username found!");
        } else if(user) {
          const r = message.guild.roles.find("name", "Verified Accounts");
          if(!r) {
            message.reply(
              'Please create a new role named exactly "Verified Accounts".'
            );
            return;
          }
          const isinrole = user.roles.find("name", "Verified Accounts");
          if(!isinrole)
          {
            message.reply("This username has not been Verified!");
            return;
          }
          message.guild.members.get(cmd[1]).setNickname("");
          user.removeRole(r);
          //399437752275304468 checkmark
          message.reply("User unverified! *thumbs down*");
        }
      }
  }
});

client.login(token);
