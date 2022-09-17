import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toaster from '@meforma/vue-toaster';

createApp(App)
    .use(Toaster, {
        position: 'top'
    })
    .use(router).mount('#app')

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"
import 'bootstrap-icons/font/bootstrap-icons.css'