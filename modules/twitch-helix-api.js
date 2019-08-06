const request = require('request');
const environment = require('../environment/environment');

class TwitchHelixApi {

    constructor({ baseUrl, baseHeaders, channelId }) {
        this.baseUrl = baseUrl;
        this.baseHeaders = baseHeaders;
        this.channelId = channelId;
    }

    
    _get(queryString) {
        const url = this.baseUrl + queryString;

        return new Promise((resolv, reject) => {
            request.get(url, { json: true, headers: this.baseHeaders }, (error, response, body) => {

                if (response.statusCode != 200) {
                    reject({ error, response, body });
                    return false;
                }
                resolv({ error, response, body });
            });
        });
    }


    //retorna um obj com info do @userName
    getUserInfo(userName) {
        return new Promise((resolv, reject) => {
            this._get(`users?login=${userName}`).then(res => {
                if (res.response.statusCode != 200) {
                    reject(res.body);
                    return;
                }
                resolv(res.body);
            }).catch(err=>reject(err));
        });
    }


    //retorna a data que @userId se inscreveu no canal @channelId
    //caso nao for inscrito, retorna false
    getFollowedDate(userId, channelId = this.channelId) {
        return new Promise((resolv, reject) => {
            this._get(`users/follows?from_id=${userId}&to_id=${channelId}`).then(res=>{
                if (res.response.statusCode != 200 || !res.body.total) {
                    reject(res.body);
                    return false;
                }
                resolv(res.body.data[0].followed_at);
            }).catch(err=>reject(err));
        });
    }


}

module.exports = new TwitchHelixApi({
    baseUrl: 'https://api.twitch.tv/helix/',
    baseHeaders: { 'Client-ID': environment.twitch.clientID },
    channelId: environment.twitch.channelID
});
