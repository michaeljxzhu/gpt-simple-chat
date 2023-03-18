import { Buffer } from 'buffer';

class BackendSingleton {

    serverURL = 'https://streamerai-production.up.railway.app';
    // serverURL = 'http://127.0.0.1:5000/';
    username = '';
    password = '';

    constructor() {
        // 'Backend' is a singleton object
        if (BackendSingleton._instance) {
            return BackendSingleton._instance
        }
        BackendSingleton._instance = this;
    }

    loginUser(username, password, successCallback, errorCallback) {
        const base64encodedData = Buffer.from(username + ':' + password).toString('base64');
        fetch(
            this.serverURL + '/login',
            {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${base64encodedData}`,
                }
            }
          ).then(response => {
            if (response.ok) {
                this.username = username;
                this.password = password;
                successCallback();
            } else {
                errorCallback();
            }
          }).catch(err => {
            console.log('http err: ' + err);
            errorCallback();
          });
    }

    getGPTResponse(userMessage, conversationIdentifier, retrievalMethod, successCallback, errorCallback) {
        const base64encodedData = Buffer.from(this.username + ':' + this.password).toString('base64');
        fetch(
            this.serverURL + '/chat',
            {
                method:'POST',
                headers: {'Content-Type': 'application/json','Authorization': `Basic ${base64encodedData}`},
                body: JSON.stringify({
                    'message': userMessage,
                    'conversationIdentifier': conversationIdentifier,
                    'retrievalMethod': retrievalMethod
                })
            }
        ).then(r =>  r.json().then(data => ({status: r.status, body: data.message})))
        .then(responseBody => {
            console.log('responseBody body: ' + responseBody.body);
            console.log('responseBody status: ' + responseBody.status);
            if (responseBody['status'] === 200) {
                successCallback(responseBody.body);

            } else if (responseBody['status'] === 401) {
                errorCallback('Error! Need openai api key: ' + responseBody.body);

            } else {
                errorCallback('Error with response: ' + responseBody.body);
            }
        }).catch(err => {
            errorCallback('Error: ' + err);
        });
    }

    logoutUser() {
        this.username = ''
        this.password = ''
    }
}

export default BackendSingleton;