<template>
  <v-app id="inspire">
    <v-navigation-drawer app v-model="drawer">
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
            <v-icon :color="u.id===2 ? 'primary':'grey'">mdi-message-text</v-icon>
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

    <v-content>
      <nuxt/>
    </v-content>


  </v-app>
</template>

<script>
    import {mapState,mapMutations} from 'vuex'
    export default {
        computed:mapState(['user']),
        data:()=>({
            drawer:true,
            users:[
                {id:1,name:"User 1"},
                {id:2,name:"User 2"},
            ],
        }),
        methods:{
            ...mapMutations(['clearData']),
            exit(){
                this.$router.push('/?message=leftChat')
                this.clearData()
            }
        }
    }
</script>
