import './assets/main.css'
import './assets/view-design.css'
import './assets/anim.scss'
import VueCookies from 'vue-cookies'
import router from './router'

import { createApp } from 'vue'
import App from './App.vue'
import QrcodeReaderVue3 from "qrcode-reader-vue3";
import MediaRecorder from 'vue-media-recorder';
import VQrcode from 'qrcode-vuejs';


document.querySelector('meta[name="permissions-policy"]')?.setAttribute('content', 'camera=(self https://amongus.inforgeserver.de)');

const app = createApp(App)
app.use(VueCookies)
app.use(router)
app.use(VQrcode);
app.use(QrcodeReaderVue3)
app.use(MediaRecorder)
app.mount('#app')
