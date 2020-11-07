<template>
    <v-container fluid class="fill-height backgroundColor">
        <v-row align="center" justify="center">
            <v-flex xs3>

                <v-alert
                    v-model="alert"
                    prominent
                    dense
                    transition="scale-transition"
                    type="error"
                    icon="vpn_key">
                    {{ message }}
                </v-alert>

                <v-card class="elevation-10" width="800" height="500"><br>
                    <v-img class="logo mt-10" width="200" :src="logo"></v-img><br><br>
                    <v-card-text>
                        <div class="ml-6 mr-6">
                            <v-text-field
                                color="indigo"
                                v-model="dataLogin.username"
                                outlined
                                prepend-inner-icon="face"
                                label="Username">
                            </v-text-field>                        
                            <v-text-field
                                color="indigo"
                                v-model="dataLogin.password"
                                outlined
                                @keypress.enter="login()"
                                label="Password"
                                @click:prepend-inner="show = !show"
                                :prepend-inner-icon="show ? 'visibility_off' : 'visibility'"
                                :type="show ? 'text' : 'password'">
                            </v-text-field>
                            <v-btn
                                @click="login()"
                                :loading="loading"
                                block
                                large
                                dark>
                                Ingresar
                            </v-btn>
                            <br/>
                            <v-btn
                                class="other"
                                @click="loading = false; clear()"
                                text
                                >
                                Ingresar con otro usuario
                            </v-btn>
                        </div>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-row>
    </v-container>
</template>

<script>
    import axios from 'axios';
    import { environments } from '../environments/environments';

    export default {
        data: () =>({
            message: '',
            alert: false,
            show: false,
            loading: false,
            logo: require('../assets/logo.png'),
            dataLogin: {
                username: '',
                password: ''
            }
        }),
        methods: {
            async login(){
                this.loading = true;
                if(this.dataLogin.username !== ''  || this.dataLogin.password !== ''){
                    await axios.post(`${environments.API_BACKEND}/auth/signin`, this.dataLogin)
                    .then((response) =>{
                        if(response.status == 200){
                            this.$store.commit('setAuthentication', response.data.verify);
                            this.loading = false
                            this.$router.replace({ path: '/tasks' });
                        }

                    }).catch((err) => {
                        this.loading = false;
                        this.alert = true;
                        this.message = err.response.data.message;
                    })
                }else{
                    this.loading = false;
                    this.alert = true;
                    this.message = "Error de autenticación, los campos no deben estar vacíos.";
                }
            },
            clear(){
                this.dataLogin.username = '';
                this.dataLogin.password = '';
            }
        }
    }
</script>

<style scoped>
    .other {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
    .titleLogin {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-style: normal;
        font-weight: 300;
        font-size: 23px;
        line-height: 31px;
        color: #000000;
    }
    .logo{
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
    .backgroundColor{
        background-image: linear-gradient(to right bottom, #091129, #121d39, #1c2a49, #27375a, #31446c, #4c4b7c, #6a5188, #89568f, #b9537c, #d45d59, #d37a30, #b59e07);
    }
</style>