const tmiClient = require('./modules/tmi-client');
const chat = require('./modules/chat')(tmiClient);
const command = require('./modules/command');

(()=>{
    tmiClient.on("chat", (channel, user, msg, self) => {
        const commandObj = command.validate(msg, user);

        if(commandObj) command.exec(commandObj, user, {chat});
    });
})();
