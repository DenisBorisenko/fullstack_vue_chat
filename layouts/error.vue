<template>
  <v-app dark>
    <v-content>
      <v-container fluid>
    <div class="d-flex flex-column">
      <div class="bg flex-fill">
        <div class="flex-center posotion-ref full-height">
          <div class="content mb-5">
            <div class="title text-light">
              <h1 v-if="error.statusCode === 404">
                {{ pageNotFound }}
              </h1>
              <h1 v-else>
                {{ otherError }}
              </h1>
            </div>
            <div class="link">
              <nuxt-link to="/">
                Home page
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>

      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  }
}
</script>

<style scoped>
  html,body{
    background: #fff;
    color:#636b6f;
    font-family: 'Nunito',sans-serif;
    font-weight: 200;
    height: 100vh;
    margin: 0;
  }
  .full-height{
    height: 100vh;
  }
  .flex-center{
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .content{
    text-align: center;
  }
  .title{
    font-size: 84px;
  }
  h1 {
    text-align: center;
    font-size: 50px;
  }
    .link{
      font-size: 40px;
      text-align: center;
    }
</style>
