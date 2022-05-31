<template>
  <!-- Header Area -->
  <div class="header-area header-home">
    <div class="container">
      <!-- Header Content -->
      <div class="header-content header-style-five position-relative d-flex align-items-center justify-content-between">
        <!-- Logo Wrapper -->
        <div class="logo-wrapper">
          <!--  Slider con logos  -->
         <!--  <div v-if="listSliderLogos.length" style="width: 120px;">
            <Carousel :items-to-show="1" :autoplay="2000" :wrap-around="true">
              <Slide v-for="(item, index) in listSliderLogos" :key="index">
                <div class="carousel__item">
                  <img class="item-logo" :src="urlBaseFile + item.name_logo" :alt="item.title_logo">
                </div>
              </Slide>
            </Carousel>
          </div> v-else -->
          <router-link to="/">
            <img :src="eventStyles.home_img_logo ? urlBaseFile + eventStyles.home_img_logo : 'assets/img/logo-pm.png'" class="logo-event" alt="Logo event">
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
import { defineAsyncComponent } from '@vue/runtime-core';
import { getSendRequest } from '@/utils/using-axios';
//import 'vue3-carousel/dist/carousel.css';
//import {Carousel, Slide} from 'vue3-carousel';

export default {
  components: { 
    //Carousel,
    //Slide,
    NotificationComponent: defineAsyncComponent(() => import('@/modules/client/shared/components/NotificationComponent')),
  },
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
      //listSliderLogos: []
    }
  },
  methods: {
    async getSliderLogos() {
      if ( this.eventStyles.slider_logos == 0 ) return
      
      const responseLogos = await getSendRequest(`list-logos/${this.eventStyles.event_id}`) 

      if ( responseLogos ) {
        this.listSliderLogos = responseLogos;
      }
    }
  },
  //created() { },
  mounted() {
    //console.log('styles: ', this.eventStyles);
    //this.getSliderLogos()

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
  height: 60px;
  border-bottom: none !important;
}
.header-content {
  height: 60px;
}
.carousel__item {
  padding: 5px;
}
img.item-logo {
  width: auto;
  height: 50px;
  object-fit: contain;
}
.logo-event {
  max-height: 45px;
  width: auto;
  object-fit: contain;
}
</style>