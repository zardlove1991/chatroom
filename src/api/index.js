import { createApi } from './serve';
const request = {
    register: (params) => createApi('/users/register', 'post', { data: params })
}
export default request