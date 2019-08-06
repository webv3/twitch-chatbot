const twitchHelixApi = require('./twitch-helix-api');
const moment = require('moment');
const botmessage = require('./bot-message');


class Followage{

    constructor(){}
    
    //retorna o numero de dias que @userName segue o canal, ou false em caso de erro
    async _getFollowageDays(userName) {
        
        try {
            let userInfo = await twitchHelixApi.getUserInfo(userName);
            userInfo = userInfo.data[0];

            const followedDate = await twitchHelixApi.getFollowedDate(userInfo.id);
            const currentDate = moment();
            const days = moment.duration(currentDate.diff(followedDate));
    
            return parseInt(days.asDays());
        } catch (err) {
            return err;
        }
    }


    //execulta a funcao principal do command followage
    run( commandObj, user, dependencies ){
        const userName = user['display-name'];

        this._getFollowageDays(userName).then(followDays=>{
            console.log(followDays);
            if(!followDays) return;
            const vars = [
                {name: 'userName', value: userName},
                {name: 'days', value: followDays}
            ];
            dependencies.tmiClient.action('webv3', botmessage.getMessage('followage',vars));
        }).catch(err=>{
            console.log(err);
        })
    }

}

module.exports = new Followage();
