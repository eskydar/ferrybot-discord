const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };

const botCommandExecuter = function() {}

const findCommandFromStack = (command, callback) => {
    //Find the command in the commands array
    commands.some((iteratedCommand) => {
        //If our keyword is inside the currently iterated command object we have a match
        if ( iteratedCommand.keywords.indexOf(command) > -1 ) {
            //Call the callback and break the loop
            callback(iteratedCommand.action);
            return true;
        }
    });
}

botCommandExecuter.prototype.execute = (messageInstance, client, parsedMessageContent, broadcastInstance) => {
    //Find the command
    findCommandFromStack(parsedMessageContent.command, (commandToExecute) => {
        //Execute the command we found
        commandToExecute(messageInstance, client, parsedMessageContent.mentionedBot, broadcastInstance);
    });
}

//List of commands
const commands = [
    {
        keywords: ['Toet', 'Toeter', 'boat sound', 'Boat sound'],
        action: (message, client, mentionedBot, broadcast) => {
            const voiceChannelConnection = message.member.voiceChannel.connection;
            if ( voiceChannelConnection ) {
                const stream = ytdl('https://www.youtube.com/watch?v=BwDuKTvNRBc', { filter : 'audioonly' });
                broadcast.playStream(stream);
                const dispatcher = voiceChannelConnection.playBroadcast(broadcast);
            }
        }
    },
    {
        keywords: ['Join', 'Kom nou'],
        action: (message, client, mentionedBot) => {
            const voiceChannel = message.member.voiceChannel;
            if ( voiceChannel !== undefined ) {
                voiceChannel.join()
                .then(connection => {
                    console.log('connected');
                    message.channel.send('Ja ja ja ja, rustig, ik kom er al weer aan.. lul');
                })
                .catch(error => {
                    console.error(error);
                    message.channel.send('Nee, ik heb nu geen zin om te joinen hoor.')
                })
            }
        }
    },
    {
        keywords: ['ga weg', 'Ga weg', 'rot op', 'Rot op'],
        action: (message, client, mentionedBot) => {
            const voiceChannelConnection = message.member.voiceChannel.connection;
            if ( voiceChannelConnection ) {
                voiceChannelConnection.disconnect()
                message.channel.send('Oke ik ga dan wel weer, doet altijd zo lullig');
            }
        }
    },
    {
        keywords: ['help', 'Help', 'Ferry handboek', 'ferry handboek'],
        action: (message, client, mentionedBot) => {
            message.channel.send('\n\r!Join|!Kom nou - Dan kom ik naar je toe hoor! \n\r !Ga weg|!Rot op - Nou dan ga ik wel weer \n\r !Toet|!Toeter|!Boat sound|!boat sound - Dan ga ik lekker toeteren hoor.');
        }
    },
    {
        keywords: ['Mongol', 'mongol'],
        action: (message, client, mentionedBot) => {
            const responses = [
                'al die mongols die met nieuw jaar weer gaan sporten',
                'Lees id gvdmr',
                'Ga vandaag wel lekker alles lezen over deamon hunter als ik dan de volgende keer speel ben ik niet een mongol'
            ]
            message.channel.send(responses[Math.floor(Math.random()*responses.length)]);
        }
    },
    {
        keywords: ['Koop dan', 'koop dan'],
        action: (message, client, mentionedBot) => {
            const responses = [
                'Nee ik koop niets van jou',
                'Nee daar ga ik geen geld aan uitgeven',
                'Jullie zeggen altijd dat ik iets moet kopen en dan spelen jullie het niet meer'
            ]
            message.channel.send(responses[Math.floor(Math.random()*responses.length)]);
        }
    }
];

module.exports = botCommandExecuter;