<template>
    <div class="p-5 bg-dark text-light row">
        <div class="container-fluid py-1">
            <div class="row justify-content-center">
                <h1 class="mt-4 text-center">Report</h1>
                <form @submit.prevent="submitFilter" class="add-form text-center">
                    <div class="form-group row">
                        <div class="mb-3 col-6">
                            <label for="startCheckIn" class="form-label">Date Start</label>
                            <input
                                v-model="startCheckIn"
                                type="text"
                                name="startCheckIn"
                                required="true"
                                placeholder="2022-09-10"
                                class="form-control">
                        </div>

                        <div class="mb-3 col-6">
                            <label for="toCheckOut" class="form-label">Date Finish</label>
                            <input
                                v-model="toCheckOut"
                                type="text"
                                name="toCheckOut"
                                required="true"
                                placeholder="2022-09-11"
                                class="form-control">
                        </div>
                    </div>
                    <input type="submit" class="btn btn-primary" value="Filter">&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" class="btn btn-primary col-2" @click="downloadReport">download report</a><br><br>
                </form>
                <hr>
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
    name: 'report',
    components: {

    },
    data() {
        return {
            startCheckIn: "2022-09-10",
            toCheckOut: "2022-09-11",
            listPlat: {},
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

        fetch(process.env.VUE_APP_API_URL + "/plat?start_check_in", requestOptions)
        .then((response) => response.json())
        .then((responseData) => {
            if (responseData.metaData.code == 200) {
                this.listPlat = responseData.data
            } 
        })
    },
    methods: {
        submitFilter() {
            store.token = localStorage.getItem("token");
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Authorization", "Bearer "+store.token);

            let requestOptions = {
                method: "GET",
                headers: headers,
            }

            fetch(process.env.VUE_APP_API_URL + `/plat?start_check_in=${this.startCheckIn}&to_check_in=${this.toCheckOut}`, requestOptions)
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                if (responseData.metaData.code == 200) {
                    this.listPlat = responseData.data
                    this.$toast.info(responseData.metaData.message);
                } 
            })
        },
        downloadReport() {
            location.href = process.env.VUE_APP_API_URL + `/report`;
        }
    }
};
</script>