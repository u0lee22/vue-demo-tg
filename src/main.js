import Vue from 'vue';
import App from '@/App.vue';
import {store} from '@/store/index';
import router from '@/router/index';
import VueCookies from 'vue-cookies';

Vue.config.productionTip = false;
Vue.use(VueCookies)

new Vue({
    render: h => h(App),
    store,
    router,
}).$mount('#app')
