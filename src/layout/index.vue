<template>
    <v-app dark>
        <v-content>
            <v-container fluid>
                <app-main></app-main>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import { AppMain } from './components'
    export default {
        name: 'Layout',
        created() {
            this.$vuetify.theme.dark = true
        },
        components: {
            AppMain,
        }
    }
</script>

<style lang="scss" scoped>

</style>