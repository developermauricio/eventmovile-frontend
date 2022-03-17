<template>
  <!-- Header Area -->
    <div class="header-area">
      <div class="container">
        <!-- Header Content -->
        <div class="header-content header-style-five position-relative d-flex align-items-center justify-content-between">
          <!-- Back Button -->
          <div class="back-button">
            <div @click="goBack()">
              <svg class="bi bi-arrow-left-short" width="32" height="32" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"></path>
              </svg>
            </div>
          </div>
          
          <!-- Photo user -->
          <router-link to="/profile">
            <div class="content-photo">
              <img :src="user.pic ? urlBaseFile + user.pic : '/assets/img/avatars/photo-user.png'" class="img-circle img-photo-user" alt="Photo profile">
            </div>         
          </router-link>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      user: {},
      urlBaseFile: process.env.VUE_APP_API_URL_FILES,
    }
  },
  methods:{
    goBack(){
      this.$router.back()
    }
  },
  created() {
    this.user = JSON.parse( localStorage.getItem('user') ) || {}
  }
}
</script>

<style scoped>
.img-photo-user {
  width: 35px;
  height: 35px;
}
</style>