<template>
  <!--=====================================
      HEADER TITLE
  ======================================-->
  <div class="pt-4 align-items-end container mb-3">
    <router-link to="/photos">
      <p class="float-end mt-1 text-more">VER TODAS</p>
      <h3 class="text-photos-event">Fotos del evento</h3>
    </router-link>
  </div>
  <div class="container" >
    <div class="card" v-if="gallery.length === 0">
      <div class="card-body">
        <div class="container">
          <div>
            No hay fotografías disponibles para este evento
          </div>
        </div>
      </div>
    </div>
    <div class="slide-photo-event" v-if="gallery.length > 0">
      <div class="items-photo-event gallery-img">
        <a :href="urlBaseFile+item.picture" class="ingle-gallery-item" v-for="item in gallery" :key="item.id">
          <img style="width:400px; height:100px;" class="rounded" :src="urlBaseFile+item.picture" alt="">
        </a>
      </div>
    </div>
  </div>

</template>

<script>
import baguetteBox from 'baguettebox.js';

export default {
  name: "Photosevent",
  data() {
    return {
      gallery: [],
      urlBase: process.env.VUE_APP_API_URL,
      urlBaseFile: process.env.VUE_APP_API_URL_FILES,
      eventID: null,
    }
  },
  methods: {
    getDataGallery() {
      let resp = this
      setTimeout(() => {
        window.axios.get(`${this.urlBase}/get-data-gallery-home/${resp.eventID}`).then(response => {
          resp.gallery = response.data
          localStorage.setItem(
              "galleryHome",
              JSON.stringify(resp.gallery)
          );
          setTimeout(() => {
            if (document.querySelectorAll(".slide-photo-event").length > 0) {
              window.tns({
                container: ".items-photo-event",
                items: 2,
                gutter: this.gallery.length,
                center: false,
                slideBy: "page",
                autoplay: false,
                fixedWidth: 150,
                loop: false,
                autoplayButtonOutput: false,
                autoplayTimeout: 4000,
                speed: 1000,
                mouseDrag: true,
                controls: false,
                nav: false,
                navPosition: "bottom",
                controlsContainer: document.querySelector('.controls-slide-schedule'),
              });
            }

            baguetteBox.run(".gallery-img", {
              captions: true,
              fullScreen: false,
              animation: "slideIn", // Also available 'fadeIn' or 'false' options
              overlayBackgroundColor: "rgba(15,7,15,0.7)"
            });
          }, 1000)


        }).catch(err => {
          console.log(err)
        })
      }, 50)

    }
  },
  mounted() {
    this.eventID = localStorage.getItem('eventId')
    this.gallery = JSON.parse(
        localStorage.getItem("galleryHome") || "[]"
    );
    if (document.querySelectorAll(".slide-photo-event").length > 0) {
      window.tns({
        container: ".items-photo-event",
        items: 2,
        gutter: this.gallery.length,
        center: false,
        slideBy: "page",
        autoplay: false,
        fixedWidth: 150,
        loop: false,
        autoplayButtonOutput: false,
        autoplayTimeout: 4000,
        speed: 1000,
        mouseDrag: true,
        controls: false,
        nav: false,
        navPosition: "bottom",
        controlsContainer: document.querySelector('.controls-slide-schedule'),
      });
    }

    baguetteBox.run(".gallery-img", {
      captions: true,
      fullScreen: false,
      animation: "slideIn", // Also available 'fadeIn' or 'false' options
      overlayBackgroundColor: "rgba(15,7,15,0.7)"
    });
    this.getDataGallery()

  }
}
</script>

<style scoped>
.text-photos-event {
  font-weight: 600;
}

.text-more {
  font-size: 0.9rem;
  color: #AA47BC;
}

.icon-grid svg {
  color: #AA47BC !important;
}

.slide-photo-event #tns2-mw {
  overflow: inherit !important;
}
</style>