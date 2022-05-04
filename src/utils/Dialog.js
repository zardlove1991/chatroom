import Dialog from '../components/global/Dialog.vue';
import Vue from 'vue';
const modules = Object.entries(import.meta.glob("../components/modal/**.vue"));
let DialogConstructor = Vue.extend(Dialog);
let instance = null;
export default function openModal (options = {}) {
    return new Promise((resolve, reject) => {
        const index = modules.findIndex((item) => item[0].includes(options.name + '.vue'));
        const name = options.name;
        options.resolve = resolve;
        options.reject = reject;
        instance = new DialogConstructor({
            el: document.createElement('div'),
            data() {
                return {
                    ...options
                };
            },
            components:  {
                [name] : modules[index][1]
            }
            });
        let dom = document.getElementById('message-body') || document.body;
        dom.appendChild(instance.$el);
        Vue.nextTick(() => {
            instance.DialogVisible = true;
        });
    });
}