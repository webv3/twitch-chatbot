const tmiClient = require('./modules/tmi-client');
const chat = require('./modules/chat')(tmiClient);


const app = () => {
    chat.addMessage("Bot conectado...");
}


app();
