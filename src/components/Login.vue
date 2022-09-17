<template>
    Login
    <div class="p-5 bg-dark text-light row">
        <div class="container-fluid py-1">
            <div class="row justify-content-center">
                <div class="col-md-4">
                    <h1 class="mt-3">Login</h1>
                    <hr>
                    <form @submit.prevent="submitHandler" class="add-form">

                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input
                                v-model="email"
                                type="email"
                                name="email"
                                required="true"
                                class="form-control">
                        </div>

                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input
                                v-model="password"
                                name="password"
                                type="password"
                                required="true"
                                class="form-control">
                        </div>

                        <hr>
                        <input type="submit" class="btn btn-primary" value="Login">
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Security from './security.js'
import { store } from './store.js'
import router from './../router/index.js'

export default {
    name: 'Login',
    components: {

    },
    data() {
        return {
            email: "",
            password: "",
            store,
        }
    },
    methods: {
        submitHandler() {
            const payload = {
                email: this.email,
                password: this.password
            }

            fetch(`${process.env.VUE_APP_API_URL}/auth/login`, Security.requestOptions(payload))
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.metaData.code == 200) {
                    this.$toast.info(responseData.metaData.message);

                    store.token = responseData.data.access_token;
                    store.user = {
                        id: responseData.data.user.id,
                        name: responseData.data.user.name,
                        email: responseData.data.user.email,
                        role: responseData.data.user.role,
                    }

                    //set local storage
                    localStorage.setItem("token", responseData.data.access_token);
                    localStorage.setItem("email", responseData.data.user.email);
                    localStorage.setItem("role", responseData.data.user.role);

                    //set the cookie
                    document.cookie = "_site_data="
                    + JSON.stringify(responseData.data)
                    + "; "
                    + "path=/; SameSite=strict; Secure;"

                    if (store.user.role == 'admin') {
                        router.push("/report")
                    } else {
                        router.push("/plat")
                    }
                } else {
                    this.$toast.error(responseData.metaData.message);
                    this.$toast.error('Wrong password or email');
                }
            })
            .catch((error) => {
                this.$toast.error(error);
            })
        }
    },
}
</script>
