const DISCORD = require("discord.js");
const FS = require("fs");
const BOT = new DISCORD.Client();

const GREETINGS_REGEX = /^((H((I)|(EY)|(ELLO)))|(GREETINGS))[!\.]*((\s.+)?)$/;
const HOW_ARE_YOU_REGEX = /HOW ARE YOU,? BOT\??$/;
const NAME_REGEX = /WHAT IS YOUR NAME,? BOT\??$/
const PING_BOT_REGEX = /^<@270007987857260544>/;
const GET_PREV_MESSAGE_CMD = "get_prev_message";
const GET_ONLINE_PEOPLE_CMD = "get_online_people";

const HOW_ARE_YOU_REPLIES = ["Horrible...", 
        "Not bad.", 
        "Great!", 
        "Would be much better if Elite Barbarians were NERFED!"];

var previous_message = null;

BOT.on('message', (message) => {
    if (message.content.toUpperCase().match(GREETINGS_REGEX)) {
        message.reply("Hey!");
    }
    if (message.content.toUpperCase().match(HOW_ARE_YOU_REGEX)) {
        message.reply(HOW_ARE_YOU_REPLIES[
                Math.floor(Math.random() * HOW_ARE_YOU_REPLIES.length)]);
    }
    if (message.content.toUpperCase().match(NAME_REGEX)) {
        message.reply("I'm \"Test Bot!\"");
    }
    if (message.content.match(PING_BOT_REGEX)) {
        message.reply("What do you want me for?");
    }
    if (message.content.charAt(0) == '>') {
        var command = message.content.substring(1);
        if (command == GET_PREV_MESSAGE_CMD) {
            message.channel.sendMessage("**The previous message was:**\n*#"
                     + previous_message.channel.name + " - "
                     + previous_message.author.username + ":* "
                     + previous_message.content);
        } else if (command == GET_ONLINE_PEOPLE_CMD) {
            var list = "";
            var count = 0;
            message.channel.members.array().forEach((member) => {
                if (member.presence.status == "online") {
                    list += member.displayName + '\n';
                    count++;
                }
            }, this);
            message.channel.sendMessage(
                    "**People online (" + count + "):**\n" + list);
        }
        return;
    }

    var info = "";

    if (previous_message == null
            || message.channel.id != previous_message.channel.id) {
        info += message.channel.id + ',';
        info += message.channel.name + '\n';
    }
    if (previous_message == null
            || message.author.id != previous_message.author.id) {
        info += message.author.id + ',';
        info += message.author.username + '\n';
    }
    info += message.content + '\n' + message.createdAt + '\n';
    previous_message = message;

    FS.appendFile('\messages.log', info, (error) => {
        if (error) {
            console.error(error);
        }
    });
});

BOT.login("MjcwMDA3OTg3ODU3MjYwNTQ0.C1yFHw.moq7ri4UkeOK6CjCkEP7f1mol64");

/*BOT..fetchMessage(message.channel.lastMessageID).then(msg => {
    previous_message = msg;
});*/