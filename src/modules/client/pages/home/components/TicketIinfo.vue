<template>
  <!-- Ticket Slide -->
  <div class="partner-logo-slide-wrapper container pe-0" style="margin-top: -40px;">
    <div class="partner-slide">
      <!-- Partner Slide Card -->
      <div>
        <div class="partner-slide-card my-2">
          <router-link to="/networking" class="content-a">
            <img src="assets/img/img-ticket.png" alt="">
            <div class="content-info">
              <img class="pb-1" src="assets/img/icon-streaming-1.png" width="30" alt="">
              <h3>Streaming</h3>
              <p>Encuentra aquí todas las transmisiones</p>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Partner Slide Card -->
      <div>
        <div class="partner-slide-card my-2">
          <a class="content-a" href="#"><img src="assets/img/img-ticket.png" alt="">
            <div class="content-info">
              <img class="pb-1" src="assets/img/icon-ondemand-video.png" width="30" alt="">
              <h3>On Demand</h3>
              <p>Todas la grabaciones para que no te pierdas de nada.</p>
            </div>
          </a>
        </div>
      </div>

      <div>
        <div class="partner-slide-card my-2">
          <router-link to="/mapa" class="content-a"> 
            <img src="assets/img/img-ticket.png" alt="">
            <div class="content-info">
              <img class="pb-2" src="assets/img/icon-map.png" width="20" alt="">
              <h3>Mapa del Evento</h3>
              <p>Ubica todas nuestras zonas y actividades</p>
            </div>
          </router-link>
        </div>
      </div>

      <div>
        <div class="partner-slide-card my-2">
          <router-link to="/resources" class="content-a"> 
            <img src="assets/img/img-ticket.png" alt="">
            <div class="content-info">
              <img class="pb-2" src="assets/img/icon-resources.png" width="25" alt="">
              <h3>Recursos</h3>
              <p>Todo el contenido de apoyo disponible para descaga</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="">
      <nav aria-label="Page navigation example">
        <ul class="pagination pagination-two controls">
          <li class="page-item"><a class="page-link ps-0" href="#" aria-label="Previous">
            <svg class="bi bi-chevron-left" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"></path>
            </svg></a></li>
          <li class="page-item"><a class="page-link" href="#" aria-label="Next">
            <svg class="bi bi-chevron-right" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>
            </svg></a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "TicketIinfo",

  mounted() {
    if (document.querySelectorAll(".partner-logo-slide-wrapper").length > 0) {
      window.tns({
        container: ".partner-slide",
        items: 2,
        gutter: 1,
        center: false,
        slideBy: "page",
        autoplay: true,
        fixedWidth: 300,
        loop: true,
        autoplayButtonOutput: false,
        autoplayTimeout: 4000,
        speed: 1000,
        mouseDrag: false,
        controls: true,
        nav: false,
        navPosition: "bottom",
        controlsContainer: document.querySelector('.controls'),
      });
    }
  }
}
</script>

<style scoped>
.content-info {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  padding: 1.8rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.content-info p {
  text-align: center;
}

.content-info h3 {
  text-align: center;
  font-weight: 600;
}

.content-a {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-a img{
  max-width: none;
}
.controls .page-link{
  color: rgba(0, 0, 0, 0.58);
  background-color: transparent !important;
}
</style>