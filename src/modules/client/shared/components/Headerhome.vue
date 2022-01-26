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
            <div class="setting-trigger-btn" id="settingTriggerBtn">
              <svg class="bi bi-bell" width="18" height="18" viewBox="0 0 16 16" fill="url(#gradientSettings)" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="gradientSettings" spreadMethod="pad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0" style="stop-color: #000000; stop-opacity:1;"></stop>
                    <stop offset="100%" style="stop-color: #767676; stop-opacity:1;"></stop>
                  </linearGradient>
                </defs>
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
              </svg>
              <span></span>
            </div>
          </div>

          <!-- Notification Popup Overlay -->
          <div id="setting-popup-overlay"></div>
          <!-- notification Popup Card -->
          <div class="card setting-popup-card shadow-lg" id="settingCard">
            <div class="card-body">
              <div class="container">
                <div class="setting-heading d-flex align-items-center justify-content-between mb-3">
                  <p class="mb-0">Notificaciones</p>
                  <div class="btn-close" id="settingCardClose"></div>
                </div>                
              </div>
            </div>
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
export default {
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