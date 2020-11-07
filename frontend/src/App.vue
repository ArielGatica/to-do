<template>
    <v-app style="background: #F0F0F0">
        <NavBar v-if="route !== 'Login'" />
        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
    import NavBar from './components/NavBar';

    export default {
        name: "App",
        components: {
            NavBar
        },
        data: () => ({
            //
        }),
        computed:{
            route(){
                return this.$route.name;
            }
        }
    };
</script>
