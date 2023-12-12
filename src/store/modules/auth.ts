
import { defineStore } from 'pinia';
import { logout } from '@/services/auth';

interface AuthState {
    token?: string;
}

export const useAuthStore = defineStore({
    id: 'auth',
    state: (): AuthState => ({
        token: undefined,
    }),
    getters: {
        getToken: (state) => state.token,
        isLogin: (state): boolean => !!state.token,
        getAuthorization: (state) => {
            return state.token ? { authorization: `Bearer ${state.token}` } : {};
        },
    },
    actions: {

        /**
         * @description 登出
         */
        async loginOut(): Promise<any> {
            try {
                const res = await logout();
                return Promise.resolve(res);
            } catch (err: any) {
                return Promise.reject(err);
            }
        },
       
    },
});
