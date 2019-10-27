<template>
  <v-col cols="12">
    <v-text-field
      label="Введите сообщение"
      v-model="text"
      @keydown.enter="send"
      outlined
    ></v-text-field>
  </v-col>
</template>
<script>
  export default {
      data:()=>({
        text:''
      }),
      methods:{
          send(){
              this.$socket.emit('createMessage',{
                  text:this.text,
                  id:this.$store.state.user.id,
              },data=>{
                  if(typeof(data) === "string"){
                      console.log(data)
                  } else {
                      console.log('im here')
                      this.text = " "
                  }

              })
          }
      }
  }
</script>
