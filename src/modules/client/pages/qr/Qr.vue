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
            <!-- Codigo QR -->
            <vue-qr :text="dataUser" :size="250"></vue-qr>
          </div>
          <div class="row pt-4">
            <div class="col-12">
              <div class="d-flex">
                <!-- Thumbnail -->
                <div class="chat-user-thumbnail me-3">
                  <img class="img-circle" :src="user.pic ? urlBaseFile + user.pic : '/assets/img/avatars/photo-user.png'" width="50" alt="Photo user">
                </div>
                <!-- Info -->
                <div class="chat-user-info pt-2">
                  <h6 class="text-truncate text-title mb-0">{{ fullName }}</h6>
                  <div class="last-chat">
                    <p class="mb-0 text-truncate text-subtitle">{{ user.user_type ? user.user_type : 'Por definir' }}</p>
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
                <div class="me-3 style-icon-location">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-calendar-week icon-qr" viewBox="0 0 16 16">
                    <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                  </svg>
                </div>
                <!-- Info -->
                <div class="chat-user-info">
                  <h6 class="text-truncate mb-0 text-title">{{ eventDate }}</h6>
                  <div class="last-chat">
                    <p class="mb-0 text-truncate text-subtitle">{{ eventDateHour }}</p>
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
                <div class="me-3 style-icon-location">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-geo-alt-fill icon-qr" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                  </svg>
                </div>
                <!-- Info -->
                <div class="chat-user-info">
                  <h6 class="text-truncate mb-0 text-title">Corferias</h6>
                  <div class="last-chat">
                    <p class="mb-0 text-truncate text-subtitle">{{ event.location ? event.location : 'Por definir' }}</p>
                    <p class="mb-0 text-truncate text-subtitle">{{ event.city ? event.city.name : 'Ciudad' }}</p>
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
import VueQr from 'vue-qr/src/packages/vue-qr.vue'
import {defineAsyncComponent} from "vue";

export default {
  name: "qr",
  components: {
    VueQr,
    Header: defineAsyncComponent(() => import('@/modules/client/pages/qr/components/Header'))
  },
  data(){
    return {
      urlBaseFile: process.env.VUE_APP_API_URL_FILES,
      event: {},
      user: {},
      fullName: '',
      dataUser: '',
    }
  },
  computed: {
    eventDate() {
      return this.$dayjs(this.event.start_date).format(`ddd DD MMMM, YYYY`);
    },
    eventDateHour() {
      return this.$dayjs(this.event.start_date).format('HH:mm a');
    }
  },
  methods() {

  },
  created() {
    this.event = JSON.parse( localStorage.getItem('event') ) || {}
    this.user = JSON.parse( localStorage.getItem('user') ) || {}
    this.fullName = this.user.name + ' ' + this.user.lastname
    /*****  Solo información relevante para el codigo QR *****/
    let infoUser = {
      id: this.user.id,
      email: this.user.email,
      name: this.user.name,
      lastname: this.user.lastname,
      nit: this.user.nit,
      phone: this.user.phone,
      user_type: this.user.user_type,
    }
    this.dataUser = JSON.stringify( infoUser )
  }
}
</script>

<style scoped>
.style-icon-location {
  display: flex;
  align-items: center;
}
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