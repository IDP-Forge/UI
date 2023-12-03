<template>
    <v-card :loading="creating">
        <v-toolbar color="primary" title="Create Application">
            <v-btn icon="mdi-close" variant="text" @click="triggerClose" />
        </v-toolbar>

        <v-card-text>
            <v-text-field
                v-model="model.title"
                :items="applicationTypes"
                :error-messages="errors?.title"
                label="Title"
                hint="Application title"
                item-value="id"
                item-title="title"
                persistent-hint
                variant="underlined"
                clearble
                chips
            >
            </v-text-field>

            <v-autocomplete
                v-model="model.type_id"
                :error-messages="errors?.type_id"
                label="Application type"
                clearable
                chips
            ></v-autocomplete>
        </v-card-text>

        <v-card-actions>
            <v-spacer/>

            <v-btn>Cancel</v-btn>
            <v-btn @click="triggerCreate" color="primary" :loading="creating">Create</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">

import { reactive, defineProps, defineEmits } from 'vue';
import type { SSOApplication } from '~/api/types/v1/application';

const { applicationTypes, creating, errors } = defineProps<{
    applicationTypes: Array<SSOApplication>,
    creating: boolean,
    errors: Array<{title: Array<string>, type_id: Array<string>}>
}>();

const emit = defineEmits(['close', 'create']);

const model = reactive({
    type_id: 0,
    title: '',
    description: '',
});

function triggerClose(): void
{
    emit('close');
}

function triggerCreate(): void
{
    emit('create', model);
}

</script>
