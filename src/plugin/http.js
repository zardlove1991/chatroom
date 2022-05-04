export const http = {
    install (Vue) {
        Vue.mixin({
            beforeCreate() {
                if (this.$options.request) {
                    Vue._request = this.$options.request;
                }
            }
        });
        Object.defineProperty(Vue.prototype, '$minApi', {
            get: function () {
                return Vue._request;
            }
        });
    }
};