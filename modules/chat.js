const command = require('./command');


class Chat {

    constructor(tmiClient) {
        
        this.tmiClient = tmiClient;

        //fila de msg para ser exibida no chat
        this.msgQueue = [];

        //tempo intervalo das interacoes do chatLoop
        this.loopInterval = 2000;
        
        //intervalo das interacoes do chat para evitar block por spam
        this.chatLoop = this.startLoop();
    }


    //loop responssavel por evitar block na api do twitch por enviar
    //muitas msg em pouco tempo
    startLoop() {
        return setInterval(() => {
            
            const firstMsg = this.msgQueue.shift();

            if ( ! firstMsg ) {
                clearInterval(this.chatLoop);
                this.chatLoop = false;
                return;
            }
            
            this.tmiClient.action("webv3", firstMsg);
                
        }, this.loopInterval);
    }

    
    //adiciona uma msg na fila para ser exibida no chat
    addMessage(message, priority = false){
        priority ? this.msgQueue.unshift(message) : this.msgQueue.push(message);

        //se o loop estiver parado, reinicia
        if( ! this.chatLoop ){
            this.chatLoop = this.startLoop();
        }
    }

}

module.exports = (tmiClient) => {
    return new Chat(tmiClient);
}
