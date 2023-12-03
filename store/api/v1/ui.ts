import { defineStore } from 'pinia';
import type { adminSidebarMenu } from '~/api/types/v1/ui';
const { get } = useHttp();

export const useUIStore = defineStore('UIStore', {
    state() {
        return {
            menu: [] as adminSidebarMenu,
            loaded: false as boolean,
            loadingMenu: false as boolean,
            idp: {
                table: {
                    loadingItems: false,
                    loadingHeaders: false,
                    loadedHeaders: false,
                    headers: [] as {}[]
                }
            }
        }
    },

    getters: {
        items: (state) => state.menu,
        loading: (state) => state.loadingMenu,
        isLoaded: (state) => state.loaded,
        loadingHeaders: (state) => state.idp.table.loadingHeaders,
        loadedHeaders: (state) => state.idp.table.loadedHeaders,
        loadingItems: (state) => state.idp.table.loadingItems,
        idpDatatableHeaders: (state) => state.idp.table.headers
    },

    actions: {
        async getSidebarMenuItems(): Promise<void>
        {
            this.loadingMenu = true;

            this.menu = await get('/api/v1/ui/menu');

            this.loadingMenu = false;

            this.loaded = true;
        },

        async getIdPListingTableHeaders()
        {
            if(this.idp.table.loadedHeaders) return void 0;

            this.idp.table.loadingHeaders = true;

            this.idp.table.headers = await get('/api/v1/ui/idp/listing/table/headers');

            this.idp.table.loadingHeaders = false;
            this.idp.table.loadedHeaders = true;
        }
    }
});