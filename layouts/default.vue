<template>
  <v-app id="inspire">
    <v-navigation-drawer app v-model="drawer" mobile-break-point="650">
      <v-list subheader>
        <v-subheader>Список людей в комнате</v-subheader>

        <v-list-item
          v-for="u in users"
          :key="u.id"
          @click.prevent
        >
          <v-list-item-content>
            <v-list-item-title>{{u.name}}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon :color="u.id===user.id ? 'primary':'grey'">mdi-message-text</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn icon @click="exit">
        <v-icon white>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Чат комнаты {{user.room}}</v-toolbar-title>
    </v-app-bar>

    <v-content style="height:100%">
      <nuxt/>
    </v-content>


  </v-app>
</template>

<script>
    import {mapState,mapMutations} from 'vuex'
    export default {
        computed:mapState(['user','users']),
        data:()=>({
            drawer:true,
        }),
        methods:{
            ...mapMutations(['clearData']),
            exit(){
                this.$socket.emit('userLeft',this.user.id,() => {
                    this.$router.push('/?message=leftChat')
                    this.clearData();
                })

            }
        }
    }
</script>
