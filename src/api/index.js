import { createApi } from './serve';
const request = {
    register: (params) => createApi('/users/register', 'post', { data: params }),
    login: (params) => createApi('/users/login', 'post', { data: params })
}
export default request