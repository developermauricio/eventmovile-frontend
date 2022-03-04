<template>
  <div class="container">
    <!-- Header Area -->
    <div class="header-area header-home" id="headerArea">
      <div class="container">
        <div class="header-content header-style-five position-relative d-flex align-items-center justify-content-between">
          <div @click="$router.go(-1)">
            <div class="back-button">
              <svg class="bi bi-arrow-left-short icon-back" width="32" height="32" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" data-v-76333a24="">
                <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" data-v-76333a24=""></path>
              </svg>
            </div>
          </div>

          <!-- <div class="page-heading text-center">
            <h6 class="mb-0 position-relative text-center fw-bold">Material Descargable</h6>
          </div> -->
          
          <!-- Filtro por  -->
          <div class="chat-user--info d-flex align-items-center">
            <div class="setting-wrapper">
              <div class="setting-trigger-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="28" fill="currentColor" class="bi bi-filter" viewBox="0 0 16 16">
                  <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                </svg>
              </div>
            </div>

            <!-- Imagen del usuario -->
            <router-link to="/profile">
              <div class="user-thumbnail-name  mx-3">
                <img :src="user.pic ? urlBaseFile + user.pic : '/assets/img/avatars/photo-user.png'" width="100" alt="Photo user">
              </div>
            </router-link>
          </div>
        </div>
        <!-- # Header Five Layout End -->
      </div>
    </div>

    <div class="container pe-0 ps-0">
      <img :src="eventstyles.home_img_banner ? urlBaseFile + eventstyles.home_img_banner : 'assets/img/img-generic.png'" class="img-respurces" alt="banner pricipal">
      <div class="text-center" style="margin-top: -40px;">
        <h5 class="text-center fw-bold">Material Descargable</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    user: {
      type: Object,
      default: function() {
        return {};
      }
    },
  },
  data() {
    return {
      eventstyles: {},
      urlBaseFile: process.env.VUE_APP_API_URL_FILES,
    }
  },
  created() {
    this.eventstyles = JSON.parse( localStorage.getItem('style-event') ) || {}
  }
}
</script>

<style scoped>
.header-area {
  background: transparent;
  border-bottom: none;
}
img.img-respurces {
  width: 100%;
  height: 30vh;
  object-position: center;
}
</style>