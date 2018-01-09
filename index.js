const Discord = require('discord.js');
const client = new Discord.Client();
require("./conf.js");
global.botuser = null
client.on('ready', () => {
  console.log('I am ready!');
  botuser = client.user
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
    const embed = new Discord.RichEmbed()
  .setTitle("Verification: The public discord bot that acts like a social media verification thing.")
  .setDescription("This bot acts like what it does on social medias: Gives you a check mark at the end of your username in a server. But this bot also does add verified users to \"Verified Accounts\" role (if it exists!).")
  .addBlankField(true)
  .addField(prefix+"ping","ping pong!")
  .addField(prefix+"verifyuser", "Sets checkmark next to username then add user to predefined role \"Verified Accounts\".", true)
  .addField(prefix+"remverified", "Removes checkmark next to username and user from predefined role \"Verified Accounts\".", true)
  .addField(prefix+"help", "You're seeing this right now.", false);
    message.author.send({embed});
    message.reply("Check your DMs!");
  }
  if (cmd[0] == prefix+'verifyuser' && user.hasPermissions(8) == true && message.member.id != client.user.id) {
    message.delete();
    if(cmd[1] != null) {
      var username = message.mentions.members.first();
      const user = message.mentions.members.first();
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
        user.setNickname(user.displayName+" ✔");

        //399437752275304468 checkmark

        message.reply("User now verified! :white_check_mark:");
      }
    }
}
    if (cmd[0] == prefix+'remverified' && user.hasPermissions(8) == true && message.member.id != client.user.id) {
      message.delete();
      if(cmd[1] != null) {
        //var username = cmd[2].replace("@", "");
        const user = message.mentions.members.first();
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
          user.setNickname("");
          user.removeRole(r);
          //399437752275304468 checkmark
          message.reply("User unverified! *thumbs down*");
        }
      }
  }
});

client.login(token);
