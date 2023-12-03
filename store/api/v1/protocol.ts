import { defineStore } from 'pinia';
import type { SingleSignOnProtocol } from '~/api/types/v1/protocol';
const { get } = useHttp();

export const useProtocolStore = defineStore('ProtocolStore', {
    state: () => ({
        availableProtocols: [] as Array<SingleSignOnProtocol>,
        isLoading: false
    }),

    getters: {
        loading: (state) => state.isLoading,
        protocols: (state) => state.availableProtocols
    },

    actions: {
        async getDefinedProtocols(): Promise<void>
        {
            this.isLoading = true;

            this.availableProtocols = await get('/api/v1/protocols');

            this.isLoading = false;
        }
    }
});
