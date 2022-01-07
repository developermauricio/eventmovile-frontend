<template>
  <!--=====================================
      HEADER TITLE
  ======================================-->
  <div class="pt-4 align-items-end container mb-3">
    <a href="">
      <p class="float-end mt-1 text-more">VER TODAS</p>
      <h3 class="text-photos-event">Fotos del evento</h3>
    </a>
  </div>
  <div class="container slide-photo-event">
    <div class="items-photo-event gallery-img">
      <a href="assets/img/bg-img/19.png" class="ingle-gallery-item"><img class="rounded" src="assets/img/bg-img/19.png" alt=""></a>
      <a href="assets/img/bg-img/19.png" class="ingle-gallery-item"><img class="rounded" src="assets/img/bg-img/19.png" alt=""></a>
      <a href="assets/img/bg-img/19.png" class="ingle-gallery-item"><img class="rounded" src="assets/img/bg-img/19.png" alt=""></a>
    </div>

  </div>
</template>

<script>
import baguetteBox from 'baguettebox.js';
export default {
  name: "Photosevent",

  mounted() {
    if (document.querySelectorAll(".slide-photo-event").length > 0) {
      window.tns({
        container: ".items-photo-event",
        items: 2,
        gutter: 5,
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

    if (document.querySelectorAll(".gallery-img").length > 0) {
      window.addEventListener("load", function () {
        baguetteBox.run(".gallery-img", {
          captions: true,
          fullScreen: false,
          animation: "slideIn", // Also available 'fadeIn' or 'false' options
          overlayBackgroundColor: "rgba(15,7,15,0.7)"
        });
      });
    }
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

.slide-photo-event #tns2-mw{
  overflow: inherit !important;
}
</style>