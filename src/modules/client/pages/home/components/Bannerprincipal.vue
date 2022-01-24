<template>
  <div class="content-banner-principal container ps-0 pe-0">
    <img :src="eventStyles.wa_banner_one ? urlBaseFile + eventStyles.wa_banner_one : 'assets/img/img-generic.png'" alt="">
  </div>
</template>

<script>
export default {
  name: "Bannerprincipal",
  props: {
    eventStyles: {
      type: Object,
      default: function() {
        return {};
      }
    },
  },
  data() { // assets/img/principal-banner.png
    return {
      urlBaseFile: process.env.VUE_APP_API_URL_FILES,
    }
  },
}
</script>

<style scoped>
.content-banner-principal {
  position: relative;
  width: 100%;
  height: 320px;
}

.content-banner-principal img{
  width: 100% !important;
  height: 100%;
}

@media (max-width: 375px) and (min-width: 320px) {
  .content-banner-principal {
    height: 200px;
  }
}

@media (max-width: 767px) and (min-width: 488px) {
  .content-banner-principal {
    height: 350px;
  }
}

@media (max-width: 1024px) and (min-width: 768px) {
  .content-banner-principal {
    height: 380px;
  }
}

@media  (min-width: 1024px) {
  .content-banner-principal {
    height: 490px;
  }
}
</style>