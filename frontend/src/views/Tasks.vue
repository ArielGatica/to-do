<template>
    <v-container>
       
                   
            <v-flex mt-12>
                <v-toolbar dark>
                    <v-toolbar-title class="headline">To Do</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="dialogAdd = true">
                        <v-icon>add</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-row>
                    <v-col
                        align-center
                        cols="12" 
                        sm="4" 
                        v-for="item in items" 
                        :key="item._id">
                        <v-card>
                            <v-card-title>{{ item.name }}</v-card-title>
                            <v-card-text>{{ item.description }}</v-card-text>
                            <v-card-actions>
                                <v-btn @click="doneTasks(item)" icon class="mb-5 ml-5">
                                    <v-icon size="50" :color="item.status == true ? 'green': 'primary'">{{ item.status == true ? 'check_circle' : 'access_time' }}</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-flex>

            <v-form
                ref="form"
                v-model="valid">                
                <v-dialog v-model="dialogAdd" width="650" persistent>
                    <v-card>
                        <v-card-title class="headline">Agregar</v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col sm="12">
                                    <v-text-field                                            
                                        v-model="dataTasks.name"
                                        :rules="requiredRules"
                                        label="Título">
                                    </v-text-field>
                                </v-col>
                                <v-col sm="12">
                                    <v-textarea
                                        v-model="dataTasks.description"
                                        :rules="requiredRules"
                                        label="Descripción">
                                    </v-textarea>
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
                                @click="addTasks();"
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
            

    </v-container>
</template>

<script>
    import axios from 'axios'
    import { environments } from '../environments/environments'


    export default {
        data:() =>({
            valid: false,
            dialogAdd: false,
            items: [],
            status: '',
            dataTasks:{
                name: '',
                description: ''
            },
            requiredRules: [ v => !! v || 'Campo es requerido' ]
        }),
        beforeMount(){
            this.getTasks();
        },
        methods:{
            async getTasks(){
                await axios.get(`${environments.API_BACKEND}/tasks`)
                .then(response =>{
                    if(response.status == 200)
                        this.items = response.data.data
                })
                .catch(err => { console.log(`Error ${err}`)})
            },
            async doneTasks(item){
                const taskId = item._id

                if(item.status == true)
                    this.status = false
                else if(item.status == false)
                    this.status = true

                await axios.patch(`${environments.API_BACKEND}/tasks/done/${taskId}`, { status: this.status })
                .then(response =>{
                    if(response.status == 200)
                        this.getTasks()
                })
                .catch(err => { console.log(`Error ${err}`)})
            },
            async addTasks(){
                await axios.post(`${environments.API_BACKEND}/tasks/save`, this.dataTasks)
                .then(response =>{
                    if(response.status == 200){
                        this.dialogAdd = false
                        this.getTasks()
                    }
                })
                .catch(err => { console.log(`Error ${err}`)})
            },
            reset(){

            }
        }
    }
</script>