import { defineStore } from 'pinia';
const { get, post, put } = useHttp();

export const useIDPStore = defineStore('IDPStore', {
    state(){
        return {
            reading: {
                loading: false,
                errorMessage: '',
                errors: [],
                model: {}
            },

            creating: {
                loading: false,
                created: false,
                errorMessage: '',
                errors: [],
                model: {}
            },

            updating: {
                loading: false,
                updated: false,
                errorMessage: '',
                errors: [],
                model: {}
            },

            deleting: {
                loading: false,
                deleted: false,
                errors: []
            },

            listing: {
                loading: false,
                per_page: 0,
                current_page: 0,
                total: 0,
                list: [] as Array<object>
            },

            notification: {
                message: ''
            }
        }
    },

    getters: {

        listingLoading: (state) => state.listing.loading,
        listingPerPage: (state) => state.listing.per_page,
        listingCurrentPage: (state) => state.listing.current_page,
        listingTotal: (state) => state.listing.total,
        listingCollection: (state) => state.listing.list,

        readLoading: (state) => state.reading.loading,
        readErrors: (state) => state.reading.errors,
        readErrorMessage: (state) => state.reading.errorMessage,
        readModel: (state) => state.reading.model,

        createLoading: (state) => state.creating.loading,
        createCreated: (state) => state.creating.created,
        createErrors: (state) => state.creating.errors,
        createErrorMessage: (state) => state.creating.errorMessage,
        createModel: (state) => state.creating.model,

        updateLoading: (state) => state.updating.loading,
        updateUpdated: (state) => state.updating.updated,
        updateErrorMessage: (state) => state.updating.errorMessage,
        updateErrors: (state) => state.updating.errors,
        updateModel: (state) => state.updating.model,

        deleteLoading: (state) => state.deleting.loading,
        deleteErrors: (state) => state.deleting.errors,

        notificationMessage: (state) => state.notification.message
    },

    actions: {

        async getCollection(params: {page: number, limit: number}): Promise<void>
        {
            this.listing.loading = true;

            try
            {
                const response = await get('/api/v1/idp/listing', params);

                this.listing.list = response.data;
                this.listing.per_page = response.per_page;
                this.listing.current_page = response.current_page;
                this.listing.total = response.total;
            }
            catch(e)
            {
                // @todo handle listing error(s) based on status code
            }

            this.listing.loading = false;
        },

        updateCollection()
        {
            // @ts-ignore
            let model = this.listing.list.find((item) => item?.id === this.updating.model.id);

            if(model)
            {
                this.listing.list.splice(this.listing.list.indexOf(model), 1, this.updating.model);
            }
        },

        async create(model: object): Promise<void>
        {
            this.creating.loading = true;
            this.creating.errors = [];

            try
            {
                const response = await post('/api/v1/idp', model);

                this.creating.created = true;
                this.creating.model = response;
            }
            catch(e)
            {
                // @ts-ignore
                if(e?.status === 422)
                {
                    // @ts-ignore
                    this.creating.errors = e?.data?.errors ?? [];
                    // @ts-ignore
                    this.creating.errorMessage = e?.data?.message ?? 'An error occurred';
                }
            }

            this.creating.loading = false;
        },

        async read(id: number): Promise<void>
        {
            this.reading.loading = true;
            this.reading.errors = [];
            this.reading.errorMessage = '';

            try
            {
                this.reading.model = await get(`/api/v1/idp/${id}`);
            }
            catch(e)
            {
                // @ts-ignore
                this.reading.errors = e?.data?.errors ?? [];
                // @ts-ignore
                this.reading.errorMessage = e?.data?.errorMessage ?? 'An error occurred';
            }

            this.reading.loading = false;
        },

        async update(model: {id: number}): Promise<void>
        {
            this.updating.loading = true;
            this.updating.errors = [];
            this.updating.updated = false;

            try
            {
                this.updating.model = await put(`/api/v1/idp/${model.id}`, model);

                this.updating.updated = true;
            }
            catch(e)
            {
                // @ts-ignore
                this.updating.errors = e?.data?.errors ?? [];
                // @ts-ignore
                this.updating.errorMessage = e?.data.errorMessage ?? 'An error occurred';
            }

            this.updating.loading = false;
        },

        async delete(): Promise<void>
        {},

        setUpdated(which: boolean): void
        {
            this.updating.updated = which;
        }
    }
});
