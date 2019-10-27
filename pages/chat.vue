<template>
  <div class="c-wrap">
    <div class="c-chat" ref="block">
      <Message
        v-for="m in messages"
        :key="m.text"
        :name="m.name"
        :text="m.text"
        :owner="m.id === user.id"
      />
    </div>
    <div class="c-form">
      <ChatForm/>
    </div>

  </div>
</template>
<style scoped>
  .c-wrap{
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .c-form{
    position: absolute;
    bottom:0;
    left:0;
    right: 0;
    padding: 1rem;
    height: 80px;
    background: #212121;
  }
  .c-chat{
    position: absolute;
    top: 0;
    left:0;
    right: 0;
    bottom: 60px;
    padding: 1rem;
    overflow-y:auto ;
  }
</style>
<script>
  import {mapState} from 'vuex'
  import Message from '@/components/message'
  import ChatForm from '@/components/chatForm'

  export default{
      layout:"default",

      head(){
        return {title:`Комната ${this.user.room}`};
      },
      watch:{
          messages(){
              setTimeout(() => {
                  this.$refs.block.scrollTop = this.$refs.block.scrollHeight
              })
          }
      },

      components:{ChatForm, Message },
      middleware:['chat'],
      computed:mapState(['user','messages']),
  }
</script>
