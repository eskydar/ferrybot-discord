
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');


client.on("ready", () => {
    client.user.setGame('Minecraft');
    var servers = client.guilds.array().map(g =>g.name).join('.');
    console.log('-------------------\n-[!] Connexion au serveur en cours...\n[!] Veuillez patienter...\nJe suis prête mon capitaine !');
});

client.on('message', message => {
        var tabHello = ['Bonjour','Salut','Hello', 'Guten tag', 'Buenos Dias'];
        var tabAnsw = ['Bonjour votre majesté.','Salutations jeune Douzien !','Ouais, ouais. T\'es qui déjà ?', 'Bonjour ' + message.author + ', comment vas-tu aujourd\'hui ?'];

        if (tabHello.indexOf(message.content) > -1  && message.isMentioned(client.user)){
            var row = Math.floor(Math.random() * tabAnsw.length);
            message.channel.sendMessage(tabAnsw[row]);
        }  
    
});

client.login(config.token);
