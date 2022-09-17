<template>
    <div class="p-5 bg-dark text-light row">
        <div class="container-fluid py-1">
            <div class="row justify-content-center">
                <h1 class="mt-4 text-center">Parkir</h1>
                <hr>
                <div id = "intro" style = "text-align:center;">
                    <h1>{{ timestamp }}</h1>
                </div>
                <div class="col-md-6">
                    <form @submit.prevent="submitCheckIn" class="add-form text-center">
                        
                        <div class="mb-3">
                            <h5>Parkir Check In</h5>
                            <label for="name" class="form-label">Input No Polisi</label>
                            <input
                                v-model="name"
                                type="text"
                                name="name"
                                required="true"
                                class="form-control">
                        </div>

                        <input type="submit" class="btn btn-primary" value="Submit">
                        <hr>
                    </form>
                </div>
                <div class="col-md-6">
                    <form @submit.prevent="submitCheckOut" class="add-form text-center">

                        <div class="mb-3">
                            <h5>Parkir Check Out</h5>
                            <label for="unique_code" class="form-label">Input Kode Unik</label>
                            <input
                                v-model="unique_code"
                                type="text"
                                name="unique_code"
                                required="true"
                                class="form-control">
                        </div>

                        <input type="submit" class="btn btn-primary" value="Submit">
                        <hr>
                    </form>
                </div>
                <table class="table table-compact text-light mt-3">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Kode Unik</th>
                            <th>No Polisi</th>
                            <th>Check In</th>
                            <th>Check Out</th>
                            <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in this.listPlat" v-bind:key="item.id">
                            <td>{{index+1}}</td>
                            <td>{{item.unique_code}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.check_in}}</td>
                            <td>{{item.check_out}}</td>
                            <td>{{item.cost}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import Security from "./security.js"
import { store } from './store.js'

export default {
    name: 'Plat',
    data() {
        return {
            timestamp: "",
            name: "",
            unique_code: "",
            listPlat: {},
            store,
        }
    },
    mounted() {
        Security.requireToken();

        store.token = localStorage.getItem("token");
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer "+store.token);

        let requestOptions = {
            method: "GET",
            headers: headers,
        }

        fetch(process.env.VUE_APP_API_URL + "/plat", requestOptions)
        .then((response) => response.json())
        .then((responseData) => {
            console.log(responseData);
            if (responseData.metaData.code == 200) {
                this.listPlat = responseData.data
                console.log(this.listPlat);
            } 
        })
    },
    created() {
        setInterval(this.getNow, 1000);
    },
    methods: {
        submitCheckIn() {
            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var date_time = date + ' ' + time;
            const payload = {
                name: this.name,
                check_in: date_time,
            }
            fetch(process.env.VUE_APP_API_URL + "/plat", Security.requestOptions(payload))
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.metaData.code == 200) {
                    this.$toast.info(responseData.metaData.message);
                    location.reload();
                } else {
                    this.$toast.error(responseData.metaData.message);
                }
            })
        },
        submitCheckOut() {
            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var date_time = date + ' ' + time;
            const payload = {
                unique_code: this.unique_code,
                check_out: date_time,
            }
            fetch(process.env.VUE_APP_API_URL + "/plat/update", Security.requestOptions(payload))
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.metaData.code == 200) {
                    this.$toast.info(responseData.metaData.message);
                    location.reload();
                } else {
                    this.$toast.error(responseData.metaData.message);
                }
            })
        },
        getNow: function() {
            const today = new Date();
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const dateTime = date +' '+ time;
            this.timestamp = dateTime;
        }
    }
};
</script>
