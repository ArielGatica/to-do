<template>
    <v-container fluid grid-list-md text-xs-left>
        <v-layout row wrap align-center justify-center>
            <v-flex xs11 mt-11>

                <v-toolbar dark>
                    <v-toolbar-title class="headline"><v-icon>people</v-icon> Usuarios</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn 
                        :disabled="!this.selected[0]"
                        icon 
                        @click="dialogRemove = true">
                        <v-icon>delete</v-icon>
                    </v-btn>
                    <v-btn
                        @click="dialogAdd = true" 
                        icon> 
                        <v-icon>add</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card>

                    <v-data-table
                        item-key="_id"
                        v-model="selected"
                        :headers="headers"
                        :items="items"
                        :loading="loading"
                        :footer-props="{
                            prevIcon: 'arrow_back_ios',
                            nextIcon: 'arrow_forward_ios'
                        }"
                        loading-text="Cargando registros..."
                        no-data-text="Sin registros  😒"
                        no-results-text="No se encontraron resultados  😞"
                        show-select
                        single-select>

                    </v-data-table>
                </v-card>

                <!--DIALOG ADD-->
                <v-form
                    ref="form"
                    v-model="valid">                
                    <v-dialog v-model="dialogAdd" width="550" persistent>
                        <v-card>
                            <v-card-title class="headline">Agregar</v-card-title>
                            <v-card-text>
                                <v-row>
                                    <v-col sm="12">
                                        <v-text-field                                            
                                            v-model="dataUsers.name"
                                            :rules="requiredRules"
                                            label="Nombre">
                                        </v-text-field>
                                    </v-col>
                                    <v-col sm="6">
                                        <v-text-field                                            
                                            v-model="dataUsers.username"
                                            :rules="requiredRules"
                                            label="Username">
                                        </v-text-field>
                                    </v-col>
                                    <v-col sm="6">
                                        <v-text-field                                            
                                            v-model="dataUsers.password"
                                            :rules="requiredRules"
                                            type="password"
                                            label="Contraseña">
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    @click="dialogAdd = false; reset()"
                                    dark
                                    text
                                    color="#007BD5">
                                    Cancelar
                                </v-btn>
                                <v-btn
                                    @click="addUser();"
                                    :disabled="!valid"
                                    style="color:#FFF"
                                    rounded
                                    color="#000">
                                    Agregar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-form>

                <!--DIALOG DELETE-->
                <v-dialog v-model="dialogRemove" max-width="450" persistent>
                    <v-card>
                        <v-card-title>
                            <span class="headline"><v-icon class="mr-1">delete_outline</v-icon> Eliminar</span>
                        </v-card-title>
                        <v-card-text class="body-1" v-if="this.selected[0] !== undefined">
                            ¿Está seguro que desea eliminar el registro <b>{{ this.selected[0].name }}</b> de Usuarios?
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer/>
                            <v-btn
                                @click="dialogRemove = false"
                                dark
                                text
                                color="#007BD5"
                                >
                                Cancelar
                            </v-btn>
                            <v-btn
                                @click="removeUser()"
                                dark
                                rounded
                                color="#000">
                                Eliminar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>


            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import axios from 'axios'
    import { environments } from '../environments/environments'

    export default {
        data: () =>({
            valid: true,
            dialogAdd: false,
            dialogRemove: false,
            loading: false,
            selected: [],
            items: [],
            headers: [
                { text: 'Nombre', value: 'name' },
                { text: 'Username', value: 'username' }
            ],
            dataUsers: {
                username: '',
                name: '',
                password: ''
            },
            requiredRules: [ v => !! v || 'Campo es requerido' ]
        }),
        beforeMount(){
            this.getUsers()
        },
        methods:{
            async getUsers(){
                this.loading = true;

                await axios.get(`${environments.API_BACKEND}/users`)
                .then(response =>{
                    if(response.status == 200){
                        this.items = response.data.data
                        this.loading = false
                    }

                })
                .catch(err => { console.log(`Error: ${err}`) })
            },
            async addUser(){
                await axios.post(`${environments.API_BACKEND}/users/save`, this.dataUsers)
                .then(response =>{
                    if(response.status == 200){
                        this.getUsers()
                        this.dialogAdd = false
                        this.reset()
                    }
                })
                .catch(err => { console.log(`Error: ${err}`) })
            },
            async removeUser(){
                const idUser = this.selected[0]._id

                await axios.delete(`${environments.API_BACKEND}/users/delete/${idUser}`)
                .then(response =>{
                    if(response.status == 200){
                        this.getUsers()
                        this.dialogRemove = false
                    }
                })
                .catch(err => { console.log(`Error: ${err}`) })
            },
            reset(){
                this.$refs.form.reset()
            }
        }
    }
</script>