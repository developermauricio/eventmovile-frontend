<template>
  <div>
  <Header/>
  <!--=====================================
         SECTION QR
    ======================================-->
  <div class="page-content-wrapper py-3 m-0">
    <div class="container pe-0 ps-0">
      <div class="card">
        <div class="card-body p-3">
          <div class="align-items-center text-center pt-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" class="bi bi-qr-code"
                 viewBox="0 0 16 16">
              <path d="M2 2h2v2H2V2Z"/>
              <path d="M6 0v6H0V0h6ZM5 1H1v4h4V1ZM4 12H2v2h2v-2Z"/>
              <path d="M6 10v6H0v-6h6Zm-5 1v4h4v-4H1Zm11-9h2v2h-2V2Z"/>
              <path
                  d="M10 0v6h6V0h-6Zm5 1v4h-4V1h4ZM8 1V0h1v2H8v2H7V1h1Zm0 5V4h1v2H8ZM6 8V7h1V6h1v2h1V7h5v1h-4v1H7V8H6Zm0 0v1H2V8H1v1H0V7h3v1h3Zm10 1h-1V7h1v2Zm-1 0h-1v2h2v-1h-1V9Zm-4 0h2v1h-1v1h-1V9Zm2 3v-1h-1v1h-1v1H9v1h3v-2h1Zm0 0h3v1h-2v1h-1v-2Zm-4-1v1h1v-2H7v1h2Z"/>
              <path d="M7 12h1v3h4v1H7v-4Zm9 2v2h-3v-1h2v-1h1Z"/>
            </svg>
          </div>
          <div class="row pt-4">
            <div class="col-12">
              <div class="d-flex">
                <!-- Thumbnail -->
                <div class="chat-user-thumbnail me-3">
                  <img class="img-circle" src="assets/img/bg-img/2.jpg" width="50" alt="">
                </div>
                <!-- Info -->
                <div class="chat-user-info pt-2">
                  <h6 class="text-truncate text-title mb-0">Rodrigo Rodriguez</h6>
                  <div class="last-chat">
                    <p class="mb-0 text-truncate text-subtitle">Empresa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--=====================================
         SECTION HORARIOS
    ======================================-->
  <div class="page-content-wrapper py-3 m-0 mb-5">
    <div class="container pe-0 ps-0 mb-1">
      <div class="card">
        <div class="card-body p-3">
          <div class="row pt-1">
            <div class="col-12">
              <!--=====================================
                CALENDAR
              ======================================-->
              <div class="d-flex">
                <!-- Thumbnail -->
                <div class="chat-user-thumbnail me-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-calendar-week icon-qr" viewBox="0 0 16 16">
                    <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                  </svg>
                </div>
                <!-- Info -->
                <div class="chat-user-info">
                  <h6 class="text-truncate mb-0 text-title">Sáb,  10 de octubre, 2021</h6>
                  <div class="last-chat">
                    <p class="mb-0 text-truncate text-subtitle">00:00 am</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row pt-4">
            <div class="col-12">
              <!--=====================================
                UBICACIÓN
              ======================================-->
              <div class="d-flex">
                <!-- Thumbnail -->
                <div class="chat-user-thumbnail me-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-geo-alt-fill icon-qr" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                  </svg>
                </div>
                <!-- Info -->
                <div class="chat-user-info">
                  <h6 class="text-truncate mb-0 text-title">Corferias</h6>
                  <div class="last-chat">
                    <p class="mb-0 text-truncate text-subtitle">Carrera 37 No 24 - 67 Bogotá </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
</template>

<script>
import {defineAsyncComponent} from "vue";

export default {
  name: "qr",
  components: {
    Header: defineAsyncComponent(() => import(/* webpackChunkName: "Header"*/ '@/modules/client/pages/qr/components/Header'))
  }
}
</script>

<style scoped>
.bi-qr-code {
  color: #49148C;
}
.text-title{
  font-weight: 600;
  color: #3D2895 !important;
}
.text-subtitle{
  color: #00000094;
}
.icon-qr{
  color: #9B27B0;
}
</style>