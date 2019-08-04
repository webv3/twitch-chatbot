
const followage = require('./followage');

class Command{

    constructor(){
        this.commandList = {
            followage: {
                followMode: true,
                subMode: false,
                timeout: 0,
                exec: ( commandObj, user, dependencies ) =>{
                    followage.run(commandObj, user, dependencies);
                }
            }
        }
    }

    //recebe uma menssagem:String e verifica se tem um command nela (!commandExample)
    //caso tenha um command, verifica se ele esta registrado
    validate(message) {
        if ( !message.startsWith("!") ) return false;
        
        const commandQuery = message.split(' ');
        const commandName = commandQuery[0].substring(1, commandQuery[0].length).toLowerCase();

        //verifica se esse command esta registrado
        if( ! this.commandList[commandName] ) return false;

        return {
            commandName,
            params: commandQuery.filter((item, index) => index > 0)
        };
    }

    //execulta um command
    exec( commandObj, user, dependencies ){
        if(! commandObj ) return false;
        this.commandList[commandObj.commandName].exec(commandObj, user, dependencies);
    }
}


module.exports = new Command();