<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex xs12 sm8>
     <v-card min-width="400">
       <v-snackbar
         v-model="snackbar"
         :timeout="6000"
         top
         left
       >
         {{ message }}
         <v-btn
           dark
           text
           @click="snackbar = false"
         >
           Закрыть
         </v-btn>
       </v-snackbar>
       <v-card-title>
         <h1>Nuxt chat</h1>
       </v-card-title>
        <v-card-text>
         <v-form ref="form" v-model="valid" lazy-validation>

           <v-text-field v-model="name" :counter="16" :rules="nameRules" label="Имя" required></v-text-field>

           <v-text-field v-model="room" :rules="roomRules" label="Введите комнату" required></v-text-field>

           <v-btn :disabled="!valid" color="primary" class="mr-4" @click="submit">Войти</v-btn>

         </v-form>
        </v-card-text>
     </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
  import {mapMutations} from 'vuex'
    export default {

        layout:"empty",
        head:{
            title:'welcome'
        },
        sockets:{
            connect:function(){
                console.log('client io connected')
            },
        },
        data: () => ({
            snackbar:false,
            message:'',
            valid: true,
            name: '',
            nameRules: [
                v => !!v || 'Введите имя',
                v => (v && v.length <= 16) || 'Имя не должно превыщать 16 симолов',
            ],
            room: '',
            roomRules: [
                v => !!v || 'Введите комнату',
            ],
        }),
        methods: {
            ...mapMutations(['setUser']),
            submit () {
                if (this.$refs.form.validate()) {
                    const user = {
                        name: this.name,
                        room: this.room
                    };

                    this.$socket.emit('userJoined',user,data=>{
                        if(typeof data === "string"){
                            console.log(data)
                        } else {
                            user.id = data.userId
                            this.setUser(user)
                            this.$router.push('/chat')
                        }
                    })
                }
            }
        },
        mounted(){
            const {message} = this.$route.query
            if(message === 'noUser') this.message = 'Введите данные'
            else if(message === 'leftChat') this.message = 'Вы вышли из чата'

            this.snackbar = !!this.message
        }
    }
</script>
