class BackendSingleton {

    serverURL = 'http://www.yahoo.com';
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
        const base64encodedData = btoa(`${this.username}:${this.password}`).toString('base64');
        fetch(
            this.serverURL + '/login',
            {
                method:'POST',
                mode: 'no-cors',
                headers: {'Content-Type': 'application/json','Authorization': `Basic ${base64encodedData}`}
            }
          ).then(
            response=>response.json()
          ).then(responseBody => {
            console.log('http response: ' + responseBody);
            if (responseBody['status'] === 200) {
                this.username = username;
                this.password = password;
                successCallback();
            } else {
                errorCallback();
            }
          }).catch(err => {
            console.log('http err: ' + err);
            // for now, just login b/c we have no endpoint
            if (username === 'test' && password === '123') {
                this.username = username;
                this.password = password;
                successCallback();
            } else {
                errorCallback();
            }
          });
    }

    getGPTResponse(userMessage, successCallback, errorCallback) {
        const base64encodedData = btoa(`${this.username}:${this.password}`).toString('base64');
        fetch(
            this.serverURL + '/chat',
            {
                method:'POST',
                mode: 'no-cors',
                headers: {'Content-Type': 'application/json','Authorization': `Basic ${base64encodedData}`},
                body: {'message': userMessage}
            }
        ).then(
            response=>response.json()
        ).then(responseBody => {
        console.log('http response: ' + responseBody);
            if (responseBody['status'] === 200) {
                successCallback('success! TODO: will be done soon');
            } else {
                errorCallback('Error with response: ' + responseBody);
            }
        }).catch(err => {
            errorCallback('Error: ' + err);
        });
    }

    logoutUser() {

    }
}

export default BackendSingleton;