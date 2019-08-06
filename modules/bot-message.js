
//menssagens padrao do sistema
class BotMessage {

    constructor() {
        this.messages = [
            {
                name: 'followage',
                message: '@{{userName}} segue o canal a {{days}} dias!',
                params: []
            },
            {
                name: 'link-in-message',
                message: '@{{userName}} não é permitido mandar link!',
                params: []
            },
            {
                name: 'uppercase-message',
                message: '@{{userName}} não GRITA!!!',
                params: []
            },
            {
                name: 'long-message',
                message: '@{{userName}} menssagem muito longa!',
                params: []
            },
            {
                name: 'badword-in-message',
                message: '@{{userName}} palavra proibida!',
                params: []
            },
        ];
    }
    

    //recebe uma string e da replace com base no vars=[{name:"varName",value:1}]
    _replaceMessageVars(message, vars=[]) {
        let replacedMessage = message;

        vars.map(varItem => {
            let regex = new RegExp("{{" + varItem.name + "}}", "g");
            replacedMessage = replacedMessage.replace(regex, varItem.value);
        });

        return replacedMessage;
    }


    //retorna uma string com a msg solicitada pelo name
    //vars recebe um array de obj com name/value das variaveis para dar replace
    getMessage(name, vars=[]) {
        const baseMessage = this.messages.filter(m => m.name == name)[0];
        if (!baseMessage) return false;
        
        const finalMessage = this._replaceMessageVars(baseMessage.message, vars);

        return finalMessage;
    }

}

module.exports = new BotMessage();
