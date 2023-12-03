<template>
    <v-card :loading="creating">
        <v-toolbar color="primary" title="Create Identity Provider">
            <v-btn icon="mdi-close" variant="text" @click="triggerClose" />
        </v-toolbar>

        <v-card-text>
            <v-autocomplete
                v-model="model.type_id"
                :items="protocols"
                :error-messages="errors.type_id"
                label="Protocol Type"
                hint="Select protocol type"
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
                :value="1"
            />

            <v-text-field
                v-model="model.title"
                :error-messages="errors.title"
                label="Title"
                hint="Identity provider title"
                persistent-hint
                clearble
                variant="underlined"
                @keyup.ctrl.enter="triggerCreate"
            />

            <v-text-field
                v-model="model.description"
                :error-messages="errors.description"
                label="Description"
                hint="Identity provider description"
                persistent-hint
                clearble
                variant="underlined"
                @keyup.ctrl.enter="triggerCreate"
            />

        </v-card-text>

        <v-card-actions>
            <v-spacer />

            <v-btn @click="triggerClose">Cancel</v-btn>
            <v-btn color="primary" @click="triggerCreate" :loading="creating">Create</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">

import type { SingleSignOnProtocol } from '~/api/types/v1/protocol';
import { reactive, defineEmits } from 'vue';

const { protocols, errors, creating } = defineProps<{
    protocols: Array<SingleSignOnProtocol>,
    errors: {type_id: Array<string>, title: Array<string>, description: Array<string>},
    creating: boolean
}>();

const emit = defineEmits(['create', 'close']);

const model = reactive({
    type_id: null,
    is_default: 0,
    title: '',
    description: ''
});

function triggerClose() {
    emit('close');
}

function triggerCreate() {
    emit('create', model);
}

</script>
