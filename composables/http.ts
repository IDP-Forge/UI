import { ofetch } from 'ofetch';

export const useHttp = () =>
{
    const http= ofetch.create({
        async onResponseError({ request, response, options }) {
            if([401, 403].includes(response.status))
            {
                await navigateTo('/login');
            }
        }
    });

    return {
        async get(url: string, params?: {}) {
            return await http(url, {query: params});
        },

        async post(url: string, params?: {}) {
            return await http(url, {
                method: 'POST',
                body: params
            });
        },

        async put(url: string, params?: {}) {
            return await http(url, {
                method: 'PUT',
                body: params
            });
        },

        async patch(url: string, params?: {}) {
            return await http(url, {
                method: 'PATCH',
                body: params
            });
        },

        async delete(url: string, params?: {}) {
            return await http(url, {
                method: 'DELETE',
                query: params
            });
        },
    }
}