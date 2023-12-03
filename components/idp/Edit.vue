<template>
    <v-card :loading="reading">
        <v-toolbar color="secondary" title="Edit Identity Provider">
            <v-btn icon="mdi-close" variant="text" @click="triggerClose" />
        </v-toolbar>

        <v-card-text>
            <v-card-text>
                <v-autocomplete
                    v-model="model.type_id"
                    :error-messages="errors.type_id"
                    label="Protocol Type"
                    hint="Select protocol type"
                    :items="protocols"
                    item-value="id"
                    item-title="title"
                    persistent-hint
                    clearable
                    chips
                    variant="underlined"
                />

                <v-checkbox
                    v-model="model.is_default"
                    label="Set as default"
                />

                <v-text-field
                    v-model="model.title"
                    :error-messages="errors.title"
                    label="Title"
                    hint="Identity provider title"
                    persistent-hint
                    clearble
                    variant="underlined"
                    @keyup.ctrl.enter="triggerUpdate"
                />

                <v-text-field
                    v-model="model.description"
                    :error-messages="errors.description"
                    label="Description"
                    hint="Identity provider description"
                    persistent-hint
                    clearble
                    variant="underlined"
                    @keyup.ctrl.enter="triggerUpdate"
                />
            </v-card-text>

          <v-card-actions>
            <v-spacer />

            <v-btn @click="triggerClose">Cancel</v-btn>
            <v-btn color="secondary" @click="triggerUpdate" :loading="updating">Edit</v-btn>
          </v-card-actions>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">

import type { SingleSignOnProtocol } from '~/api/types/v1/protocol';
import { reactive, defineEmits } from 'vue';

const {reading, serverModel, protocols, errors} = defineProps<{
    reading: boolean,
    updating: boolean,
    updated: boolean,
    serverModel: {
        id: number,
        type_id: number,
        is_default: boolean,
        title: string,
        description: string,
        config: Record<string, any>
    },
    protocols: Array<SingleSignOnProtocol>,
    errors: {type_id: [], title: [], description: []}
}>();

const emit = defineEmits(['close', 'update']);

let model = reactive(Object.assign({}, serverModel));

function triggerClose()
{
    emit('close');
}

function triggerUpdate()
{
    emit('update', model);
}

</script>