import { createPinia, PiniaVuePlugin } from 'pinia'
import Vue from 'vue'
import './style.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'

Vue.use(PiniaVuePlugin)
Vue.use(ElementUI);
const pinia = createPinia()
new Vue({
    render: h => h(App),
    pinia
}).$mount('#app')