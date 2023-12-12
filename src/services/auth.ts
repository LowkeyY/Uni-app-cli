

import http from '@/utils/request';

const LOGIN = '/login';
const LOGIN_OUT = '/logout';


/**
 * 登录
 * @param params
 */
export function login(data: LoginParams) {
    return http.request({
        url:LOGIN,
        data
    });
}

/**
 * 登出
 */
export function logout() {
    return http.request({
        url:LOGIN_OUT,
    });
}

