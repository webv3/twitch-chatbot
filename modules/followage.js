const twitchHelixApi = require('./twitch-helix-api');
const moment = require('moment');


class Followage{

    constructor(){}
    
    _followAgeMessage(userName, days){
        return '@{{user}} segue o canal a {{days}} dias'
        .replace(/\{\{user\}\}/g,userName)
        .replace(/\{\{days\}\}/g,days);
    }

    
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
            dependencies.tmiClient.action('webv3', this._followAgeMessage(userName, followDays));
        }).catch(err=>{
            console.log(err);
        })
    }

}

module.exports = new Followage();
