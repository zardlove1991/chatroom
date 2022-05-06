import Vue from 'vue';
import VueRouter from 'vue-router';
// import Layouts from '@/components/global/Layouts.vue';
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import jwt from 'jsonwebtoken';
import { getItem } from '@/utils/storage'
// 注册路由插件
Vue.use(VueRouter);
const routes = [
    {
        path: '/',  
        redirect: '/Home',
    },
    {
        path: '/Home',  //登录
        name:'Home',
        component: () => import('../views/Home.vue'),
    },
];
console.log(routes);
const router = new VueRouter({
    linkActiveClass: 'active',
    // 暂时先用不使用history路由，否则打包之后css,js文件访问不到
    // mode: 'history',
    routes
});
router.beforeEach(async(to, from, next) => {
    // start progress bar
    NProgress.start();
    const token = getItem('access_token')
    console.log(jwt)
    // const isValid = jwt.verify(token, 'zard1991',(err,data) => data)
    if(to.path !='/Home' && !isValid) {
        this.$message({
          message: '登陆过期,请重新登录',
          type: 'error'
        });
        next('/Home')
    } else {
        next()
    }
});
router.afterEach(() => {
    // finish progress bar
    NProgress.done();
});
export default router;
