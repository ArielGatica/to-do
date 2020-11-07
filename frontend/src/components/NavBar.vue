<template>
    <div>
        <v-app-bar color="#31446c" height="90">
            <v-toolbar-title style="color: #FFF" class="headline"><b>AGILE</b>SOFT</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn class="mr-5" dark text router to="/tasks">Tareas</v-btn>
            <v-btn dark text router to="/users">Usuarios</v-btn>
            <v-btn @click="dialogLogout = true" dark class="ml-12" icon>
                <v-icon>logout</v-icon>
            </v-btn>
        </v-app-bar>


         <!--LOGOUT DIALOG-->
        <v-dialog v-model="dialogLogout" width="450" persistent>
            <v-card>
                <v-card-title class="headline"><v-icon class="mr-1">logout</v-icon>Cerrar Sesión</v-card-title>
                <v-card-text class="body-1">
                    ¿Estás seguro que deseas salir?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        @click="dialogLogout = false"
                        text
                        color="#007BD5"
                        >
                        Cancelar
                    </v-btn>
                    <v-btn
                        @click="logout()"
                        dark
                        rounded
                        color="#000">
                        Aceptar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


    </div>
</template>

<script>
    export default {
        data: () =>({
            dialogLogout: false
        }),
        methods:{
            logout(){
                window.location.replace("/")
            }
        }
    }
</script>