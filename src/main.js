import Vue from 'vue';
import App from './App.vue';
import router from "./router";
import store from './store';
import '@/config/element.config';
import { http } from '@/plugin/http';
import request from '@/api';
import openModal  from './utils/Dialog';
import LemonIMUI from 'lemon-imui'
Vue.prototype.$openModal = openModal;
// 引入全局组件
const modules = import.meta.glob("/src/components/global/**");
Object.keys(modules).forEach((key) => {
    modules[key]().then((mod) => {
        const file = key.split('/').pop().replace(/.js$/, '').replace(/.vue$/, '');
        Vue.component(file, mod.default || mod[file]);
    });
});
console.log(12312)
Vue.use(http);
Vue.use(LemonIMUI)
new Vue({
    router,
    store,
    request,
    render: h => h(App)
}).$mount('#app');
