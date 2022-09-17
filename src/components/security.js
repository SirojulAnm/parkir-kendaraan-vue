import {store} from './store.js'
import router from './../router/index.js'

let Security = {
    //make sure user is authenticated
    requireToken: function () {
        store.token = localStorage.getItem("token");
        if (store.token === null) {
            router.push("/login")
            return false
        }
    }, 

    //create request options and send them back
    requestOptions: function(payload) {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer "+store.token);

        return {
            method: "POST",
            body: JSON.stringify(payload),
            headers: headers,
        }
    },

    //check token
    checkToken: function() {
        store.token = localStorage.getItem("token");
        if (store.token !== "") {

            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Authorization", "Bearer "+store.token);

            let requestOptions = {
                method: "GET",
                headers: headers,
            }

            fetch(process.env.VUE_APP_API_URL + "/auth/user-profile", requestOptions)
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.metaData.code == 200) {
                    console.log(responseData.metaData.message);
                } else {
                    store.token = "";
                    store.user = {},
                    document.cookie = '_site_data=; Path=/; '
                        + 'SameSite=strict; Secure; '
                        + 'expires_in=Thu, 01 jan 1970 00:00:01 GMT;'
                }
            })
        }
    }
}

export default Security;