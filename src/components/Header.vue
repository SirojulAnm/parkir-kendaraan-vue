<template>
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Bounche </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
                <router-link class="nav-link" aria-current="page" to="/">Home</router-link>
            </li>

            <li v-if="store.token !== '' && store.user.role == 'user'" class="nav-item">
                <router-link class="nav-link" to="/plat">Parkir</router-link>
            </li>

            <li v-if="store.token !== '' && store.user.role == 'admin'" class="nav-item">
                <router-link class="nav-link" to="/report">Report</router-link>
            </li>

            <li class="nav-item">
                <router-link v-if="store.token == ''" class="nav-link" to="/login">Login</router-link>
                <a href="javascript:void(0);" v-else class="nav-link" @click="logout">Logout</a>
            </li>
        </ul>
        <span class="navbar-text text-light">
            {{ store.user.email }}
        </span>
        <span class="navbar-text text-light">
            &nbsp;&nbsp;&nbsp;
        </span>
        <span class="navbar-text text-light">
            {{ store.user.role }}
        </span>
        <span class="navbar-text text-light">
            &nbsp;&nbsp;&nbsp;
        </span>
        <form class="d-flex" role="search">
            <button class="btn btn-outline-light" type="submit"><i class="bi bi-search"></i></button>
        </form>
        </div>
    </div>
    </nav>
</template>

<script>
import { store } from './store.js'
import router from './../router/index.js'
import Security from './security.js'

export default {
    data() {
        return {
            store
        }
    },
    beforeMount() {
        store.token = localStorage.getItem("token");
        store.user.email = localStorage.getItem("email");
        store.user.role = localStorage.getItem("role");
    },
    methods: {
        logout() {
            fetch(process.env.VUE_APP_API_URL + "/auth/logout", Security.requestOptions(""))
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.metaData.code == 200) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("email");
                    localStorage.removeItem("role");

                    store.token = "";
                    store.user = {};

                    document.cookie = '_site_data=; Path=/; ' +
                    'SameSite=Strict; Secure; ' +
                    'Expires=Thu, 01 Jan 1970 00:00:01 GMT;'

                    this.$toast.info(responseData.metaData.message);
                    router.push("/login")
                } else {
                    this.$toast.error(responseData.metaData.message);
                    router.push("/login")
                }
            })
        }
    }
}
</script>
