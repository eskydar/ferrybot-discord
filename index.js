const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const commands = require('./commands');
const prefix = config.prefix;

const broadcast = client.createVoiceBroadcast();
const commandExecuter = new commands();

client.on("ready", () => {
    client.user.setGame('Hoer simulator');
    const servers = client.guilds.array().map(g => g.name).join('.');
    console.log('Bot started');
});

client.on('message', message => {
    //Check if its a command
    isBotCommand(message, (parsedMessageConfig) => {
        //If it is, lets execute it if we can
        if ( parsedMessageConfig ) {
            commandExecuter.execute(message, client, parsedMessageConfig, broadcast);
        }
    });
});

const parseMessage = message => {
    //Lets first get the command
    const command = message.content.replace(/\<\@.[^\>]+\>/g, '').trim();
    //check if we are being mentioned
    const mentionedBot = message.isMentioned(client.user);
    //return this data
    return {
        command,
        mentionedBot
    }
};

const isBotCommand = (message, callback) => {
    const parsedMessageConfig = parseMessage(message);
    //Get the first char of the message
    const firstChar = parsedMessageConfig.command.charAt(0);
    //If it does not equal our prefix answer that it's not a bot command
    if (firstChar !== prefix) return callback(false)
    //Remove that first char from our string
    parsedMessageConfig.command = parsedMessageConfig.command.substring(1);
    //We got here, so it seems to be a command
    return callback(parsedMessageConfig);
};

client.login(config.token);
