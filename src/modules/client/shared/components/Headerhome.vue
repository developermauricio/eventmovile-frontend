<template>
  <!-- Header Area -->
  <div class="header-area header-home">
    <div class="container">
      <!-- Header Content -->
      <div class="header-content header-style-five position-relative d-flex align-items-center justify-content-between">
        <!-- Logo Wrapper -->
        <div class="logo-wrapper">
          <router-link to="/">
            <img :src="eventStyles.home_img_logo ? urlBaseFile + eventStyles.home_img_logo : 'assets/img/logo-pm.png'" alt="Logo event">
          </router-link>
        </div>
        <!-- Navbar Toggler -->
        <div class="chat-user--info d-flex align-items-center">
          <!-- Notification -->
          <div class="setting-wrapper">
            <notification-component></notification-component>
          </div>
          <!-- Imagen del usuario -->
          <router-link to="/profile">
            <div class="user-thumbnail-name  ms-4">
              <img :src="dataUser.pic ? urlBaseFile + dataUser.pic : '/assets/img/avatars/photo-user.png'" width="100" alt="Photo user">
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NotificationComponent from './NotificationComponent.vue';
export default {
  components: { NotificationComponent },
  name: "Headerhome",
  props: {
    dataUser: {
      type: Object,
      default: function() {
        return {};
      }
    },
    eventStyles: {
      type: Object,
      default: function() {
        return {};
      }
    },
  },
  data() {
    return {
      urlBaseFile: process.env.VUE_APP_API_URL_FILES,
    }
  },
  //methods: { },
  //created() { },
  mounted() {
    let settingButton, settingCard, settingOverlay, settingCardClose;
    settingButton = document.getElementById("settingTriggerBtn");
    settingCard = document.getElementById("settingCard");
    settingOverlay = document.getElementById("setting-popup-overlay");
    settingCardClose = document.getElementById("settingCardClose");

    if (settingButton) {
      settingButton.addEventListener("click", function () {
        settingCard.classList.toggle("active");
        settingOverlay.classList.toggle("active");
      });
    }

    if (settingCardClose) {
      settingCardClose.addEventListener("click", function () {
        settingCard.classList.remove("active");
        settingOverlay.classList.remove("active");
      });
    }
  }
}
</script>

<style scoped>
.header-area.header-home {
  border-bottom: none !important;
}
</style>