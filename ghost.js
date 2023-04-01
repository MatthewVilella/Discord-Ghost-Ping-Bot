//Discord JS Package
const Discord = require('discord.js');

//Creates Client named bot
const bot = new Discord.Client({
  intents: [
    'Guilds',
    'GuildMessages',
    'MessageContent',
    'GuildMembers'
  ],
  //Deleted Messages
  partials: ['MESSAGE']
})

//Bot token
const botToken = process.env;

//Starts bot
bot.on("ready", () => {
  //Checks to see if any Reminder needs to be sent out
  setInterval(checkReminder, 1000);
  //Tells you the bot has log onto Discord
  console.log(`Logged in as ${bot.user.tag}!`);
});

//Ghost ping
//If a Message is Deleted while the bot is on.
bot.on('messageDelete', deletedMessage => {
  //Gets the Channel Id the @Ping was deleted at.
  let deletedMessageChannelId = deletedMessage.channelId;
  channel = bot.channels.cache.get(deletedMessageChannelId);
  //Checks to see if the Message was a @Ping for a Person or a @everyone Ping or a @role Ping.
  if (deletedMessage.mentions.members.size || deletedMessage.mentions.everyone || deletedMessage.mentions.roles.size) {
    //Checks to see if the @Ping was deleted.
    if (!deletedMessage.partial) {
      //Sends Menu to Channel the @Ping was deleted.
      if (channel) {
        //Creates Menu
        let embed = new Discord.EmbedBuilder()
          //Menu Title
          .setTitle('Ghost Ping')
          //Shows Person who Ghost Pinged.
          .setAuthor({
            name: deletedMessage.author.username, person:
              deletedMessage.author
          })
          //Shows Person who was Ghost Pinged.
          .setDescription(deletedMessage.content)
          //Time the Person was Ghost Pinged.
          .setTimestamp()
        //Sends Ghost Ping Menu.
        channel.send({ embeds: [embed] });
      }
    }
  }
});

//Bots Token
//leave at last line
bot.login(botToken.token);