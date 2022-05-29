<template>
  <div class="content-banner-principal container ps-0 pe-0">
    <!-- mostrar video streming -->
    <div v-if="event.code_streaming && event.code_streaming != 0" v-html="event.code_streaming" class="content-streaming"></div>

    <!-- mostrar banner del evento -->
    <img v-else :src="eventStyles.wa_banner_one ? urlBaseFile + eventStyles.wa_banner_one : 'assets/img/img-generic.png'" alt="">
  </div>
</template>

<script>
export default {
  name: "Bannerprincipal",
  props: {
    event: {
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

.content-streaming {
  width: 100%;
  height: 92%;
}

@media (min-width: 320px) and (max-width: 375px) {
  .content-banner-principal {
    height: 200px;
  }
  .content-streaming {
    height: 85%;
  }
}

@media (min-width: 488px) and (max-width: 767px) {
  .content-banner-principal {
    height: 350px;
  }
  .content-streaming {
    height: 90%;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .content-banner-principal {
    height: 380px;
  }
}

@media  (min-width: 1024px) {
  .content-banner-principal {
    height: 490px;
  }
  .content-streaming {
    height: 94%;
  }
}
</style>