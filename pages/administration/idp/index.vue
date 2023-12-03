<template>
    <v-card>
        <v-card-title>
            Identity Providers
        </v-card-title>
        <v-card-text>
            <v-btn @click="dialog.create = !dialog.create">
                Create Identity Provider
            </v-btn>
        </v-card-text>

        <!-- Dialog for creating new IdP -->
        <v-dialog v-model="dialog.create" width="1024" persistent>
            <IdpCreate
                @close="dialog.create = false"
                @create="createIdP"
                :protocols="protocols"
                :errors="createErrors"
                :creating="createLoading"
            ></IdpCreate>
        </v-dialog>

        <!-- Dialog for editing the IdP -->
        <v-dialog v-model="dialog.edit" width="1024" persistent>
            <IdpEdit
                @close="dialog.edit = false"
                @update="triggerUpdateIdP"
                :protocols="protocols"
                :reading="readLoading"
                :updating="updateLoading"
                :updated="updateUpdated"
                :serverModel="readModel"
                :errors="readErrors"
            >
            </IdpEdit>
        </v-dialog>

        <!-- snackbar that notifies IdP was created -->
        <v-snackbar v-model="dialog.snackbar" timeout="3000">
            Identity provider <strong>{{ createModel.title }}</strong> created successfully
            <template v-slot:actions>
                <v-btn color="secondary" variant="text" @click="dialog.snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>

        <!-- Datatable wit IdP list -->
        <template v-if="loadedHeaders">
            <v-data-table
                :headers="idpDatatableHeaders"
                :loading="listingLoading"
                :items="listingCollection"
                :items-length="listingTotal"
            >
                <template v-slot:item.is_default="{ item }">
                    <v-chip v-if="item.is_default" size="small" color="green" label>Yes</v-chip>
                    <v-chip v-else size="small" label>No</v-chip>
                </template>

                <template v-slot:item.actions="{ item }">
                    <v-btn variant="text" @click="triggerEditing(item)">Edit</v-btn>

                    <v-btn variant="text" color="red">Delete</v-btn>
                </template>
            </v-data-table>
        </template>

    </v-card>
</template>

<script setup lang="ts">

import { definePageMeta } from '#imports';
import { reactive, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useIDPStore } from '#imports';
import { useProtocolStore } from '#imports';
import { useUIStore } from '#imports';

definePageMeta({
    layout: 'administration'
});

useHead({
    title: 'IDPForge | Identity Providers'
});

let dialog = reactive({
    create: false,
    edit: false,
    snackbar: false
});

const protocolStore = useProtocolStore();
const idpStore = useIDPStore();
const uiStore = useUIStore();

const getCollectionParams = reactive({page: 0, limit: 10});

await protocolStore.getDefinedProtocols();
await uiStore.getIdPListingTableHeaders();
await idpStore.getCollection(getCollectionParams);

let { protocols, loading } = storeToRefs(protocolStore);
let { loadingHeaders, loadedHeaders, idpDatatableHeaders } = storeToRefs(uiStore);
let {
    createLoading, createCreated, createErrors, createErrorMessage, createModel,
    readLoading, readErrors, readErrorMessage, readModel,
    updateLoading, updateUpdated, updateErrors, updateModel,
    deleteLoading, deleteErrors,
    listingLoading, listingPerPage, listingCurrentPage, listingTotal, listingCollection
} = storeToRefs(idpStore);

const createIdP = async (model: {}) => await idpStore.create(model);
const headersLoaded = computed(() => !loadingHeaders && loadedHeaders);

async function triggerEditing(item: {id: number})
{
    await idpStore.read(item.id);

    dialog.edit = true;
}

async function triggerUpdateIdP(model: {id: number})
{
    await idpStore.update(model);
}

watch(updateUpdated, (value: boolean) =>
{
    if(value)
    {
        idpStore.setUpdated(false);

        idpStore.updateCollection();

        dialog.edit = false;
    }
});

watch(createCreated, async (value: boolean) =>
{
    if(!value) return void 0;

    // Close dialog if created
    dialog.create = false;

    // Re-load the list of IdP's
    await idpStore.getCollection(getCollectionParams);

    // show snackbar
    dialog.snackbar = true;
});

watch(headersLoaded, async (value: boolean) => {
    if(value)
    {
        await idpStore.getCollection(getCollectionParams);
    }
});

</script>
