<template>
    <v-app id="inspire">

        <v-app-bar flat color="black">
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

            <v-app-bar-title>Application</v-app-bar-title>
        </v-app-bar>

        <v-navigation-drawer>

            <template v-slot:prepend>
                <v-list-item
                    lines="two"
                    title="IDP Forge"
                ></v-list-item>

                <v-divider />
            </template>

            <v-progress-circular v-if="loading" indeterminate color="primary" />

            <v-list v-if="!loading">
                <template v-for="item in items">
                    <template v-if="item.submenu && item.submenu.length">
                        <v-list-group :value="item.title">
                            <template v-slot:activator="{ props }">
                                <v-list-item
                                    v-bind="props"
                                    :title="item.title"
                                ></v-list-item>
                            </template>

                            <v-list-item v-for="subitem in item.submenu" :to="subitem.url">
                                {{ subitem.title }}
                            </v-list-item>

                        </v-list-group>
                    </template>
                    <template v-else>
                        <v-list-item :to="item.url">
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item>
                    </template>
                </template>
            </v-list>

        </v-navigation-drawer>

        <v-main>
            <!--  -->
            <slot/>
        </v-main>
    </v-app>
</template>

<script setup>
import { useUIStore } from '~/store/api/v1/ui.ts';
import { storeToRefs } from 'pinia';

const store = useUIStore();

store.getSidebarMenuItems();

const { items, loading } = storeToRefs(store);

</script>


<script>
export default {
    data: () => ({drawer: null}),
}
</script>