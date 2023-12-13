
import { getBaseUrl } from '@/utils/env';
import { Toast } from '@/utils/uniapi/prompt';
import storage from '@/utils/storage';
import { useUserStore } from '@/store/modules/user';
import { router } from '@/router';

interface RequestOptions {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS';
    data?: Record<string, any>;
    header?: Record<string, string>;
  }

const BASE_URL = getBaseUrl();

const toLogin = () => {
    // useUserStore()
    // .logout()
    // .then(() => {
    //     router.push({ name: 'Visitor' });
    // });
};

const request = async({ url, method='GET', data, header = { 'Content-Type': 'application/x-www-form-urlencoded' } }:RequestOptions):Promise<any> => {
    return new Promise((reslove, reject) => {
        uni.request({
            url: BASE_URL + url,
            method: method,
            header: header,
            timeout: 10000,
            data: data || {},
            success: successData => {
                const { data: responseData = {}, header = {}, statusCode } = successData;
                if (statusCode === 200) {
                    if (header['Set-Cookie']) {
                        const sessionid = header['Set-Cookie'].split(';')[0];
                        storage.set('sessionid', sessionid);
                    }
                    reslove(responseData);
                } else if (statusCode === 401) {
                    toLogin();
                } else {
                    const { msg = '网络连接失败，请稍后重试' } = responseData as {msg?:string};
                    Toast(msg);
                    reject(data);
                }
            },
            fail: msg => {
                Toast('网络连接失败，请稍后重试');
                reject(msg);
            }
        });
    });
};

const http:Record<string,any>={request};

['options', 'get', 'post', 'put', 'head', 'delete',].forEach(method => {
    http[method] = (url:string, params:Record<string,any>) => request({url,method:method.toUpperCase() as any,data:params});
});

export default http;
