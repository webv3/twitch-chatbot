//https://api.twitch.tv/helix/users/follows?to_id=52614128


class FollowAlert{

    constructor(config){
    
        this.messageList = [];

        this.pushMessage('webv3');
        this.pushMessage('webv4');
        this.pushMessage('webv5');

        this.alertInterval = setInterval(() => {
            
            //se tiver alguma msg na fila
            if (this.messageList.length) {
                
                console.log(this.messageList[0].message);
                //remove o primeiro item da fila
                this.messageList.shift();

                //se nao tiver mais msg na fila
                if(! this.messageList.length ){
                    clearInterval(this.alertInterval);
                    this.alertInterval = false;
                    console.log('INTERVAL LIMPO');
                }
            }
        }, config.alertDuration);
    }


    pushMessage(userName){
        this.messageList.push({
            userName,
            message: `${userName} seguiu o canal!`
        });
    }
}

module.exports = (config={alertDuration}) => {
    return new FollowAlert(config);
};