import { defineStore } from 'pinia';
import type { SSOApplication } from '~/api/types/v1/application';
const { get, post, put } = useHttp();

export const useApplicationStore = defineStore('ApplicationStore', {
    state() {
        return {
            types: {
                loading: false,
                list: Array<SSOApplication>
            }
        }
    },

    getters: {
        loadingAppTypes: (state) => state.types.loading,
        appTypes: (state) => state.types.list
    },

    actions: {
        async getAppTypes(): Promise<void>
        {
            this.types.loading = true;

            try
            {
                this.types.list = await get('/api/v1/application/types');
            }
            catch(e)
            {

            }

            this.types.loading = false;
        }
    }
});
