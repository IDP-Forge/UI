<template>
    <v-card>
        <v-card-title>Applications</v-card-title>
        <v-card-text>
            <v-btn @click="dialog.quickCreate = true" @close="dialog.quickCreate = false">Create Application</v-btn>
        </v-card-text>

        <!-- Dialog for quick-create app -->
        <v-dialog v-model="dialog.quickCreate" width="1024" persistent>
            <ApplicationQuickCreate

            ></ApplicationQuickCreate>
        </v-dialog>
    </v-card>

</template>

<script setup lang="ts">

import { definePageMeta } from '#imports';
import { reactive } from 'vue';

definePageMeta({
    layout: 'administration'
});

useHead({
    title: 'IDPForge | Applications'
});

const dialog = reactive({
    quickCreate: false
});

</script>
