const tmi = require('tmi.js');
const environment = require('../environment/environment');

var tmiClient = function(){

    const tmiClient = new tmi.client({
        channels: environment.twitch.channels,
        identity: {
            username: environment.twitch.username,
            password: environment.twitch.oauth
        },
        connection: {
            reconnect: true
        },
        options : {
            debug: true
        }
    });

    tmiClient.connect();
    
    return tmiClient;
}

module.exports = tmiClient();
