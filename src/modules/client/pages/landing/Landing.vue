<template>
  <div>
    <!-- Header Area -->
    <div class="header-area header-home" id="headerArea">
      <div class="container">
        <div class="header-content header-style-five position-relative d-flex align-items-center justify-content-between">
          <!-- Logo Wrapper -->
          <div class="logo-wrapper">
            <a href="#">
              <img src="assets/img/logo-pm.png" alt="logo">
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="img-ticket-container">
        <img src="/assets/img/principal-banner.png" alt="banner del evento">
        <div class="pt-4">
          <!--=====================================
                      CALENDAR
          ======================================-->
          <div class="d-flex">
            <div class="chat-user-thumbnail me-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-calendar-week icon-qr" viewBox="0 0 16 16">
                <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
              </svg>
            </div>
            <!-- Info -->
            <div class="chat-user-info">
              <!-- <h6 class="text-truncate mb-0 text-title"> Sáb, 10 de octubre, 2021</h6> -->
              <h6 class="text-truncate mb-0 text-title">{{ startDate }}</h6>
              <div class="last-chat">
                <!-- <p class="mb-0 text-truncate text-subtitle">00:00 am</p> -->
                <p class="mb-0 text-truncate text-subtitle">{{ startDateHour }}</p>
              </div>
            </div>
          </div>
          <!--=====================================
                    UBICACIÓN
          ======================================-->
          <div class="d-flex pt-3">
            <div class="chat-user-thumbnail me-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-geo-alt-fill icon-qr" viewBox="0 0 16 16">
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
              </svg>
            </div>
            <!-- Info -->
            <div class="chat-user-info">
              <h6 class="text-truncate mb-0 text-title">{{ event.location ?  event.location : 'Por confirmar' }}</h6>
              <!-- <h6 class="text-truncate mb-0 text-title">Corferias</h6> -->
              <div class="last-chat">
                <p class="mb-0 text-truncate text-subtitle">{{ event.location ?  event.location : 'Por confirmar' }}</p>
                <!-- <p class="mb-0 text-truncate text-subtitle">Carrera 37 No 24 - 67 Bogotá </p> -->
              </div>
            </div>
          </div>
          <!--=====================================
                  INFORMACIÓN DEL EVENTO
          ======================================-->
          <div class="info-event pt-4">
            <h3 class="text-info">Acerca del Evento</h3>
            <p> {{ event.description }} </p>
          </div>
        </div>
      </div>
    </div>

    <!--=====================================
             FOOTER
    ======================================-->
    <div class="footer-nav-area" id="footerNav">
      <div class="container px-0">
        <div class="footer-nav position-relative">
          <ul class="h-100 d-flex align-items-center justify-content-between ps-0">
            <li>
              <router-link to="/login">INICIA SESIÓN</router-link></li>
            <li>
              <a class="btn m-1 btn-primary" href="#">REGISTRATE</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Landing",
  props: {
    webAppPath: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      event: {},
      eventId: 0,
      onLogin: false,
      onRegister: false,
      styles: [],
      // uriImg: process.env.VUE_APP_API_URL_FILES,
    }
  },  
  computed: {
    startDate() {
      return this.$dayjs(this.event.start_date).format(`ddd DD MMMM, YYYY`);
    },
    startDateHour() {
      return this.$dayjs(this.event.start_date).format('HH:mm a');
    }
  },
  mounted() {
    if (this.webAppPath !== '') {
      localStorage.setItem('webAppPath', this.webAppPath)
    }
    let validPath = localStorage.getItem('webAppPath')
    if (validPath !== '') {
      this.validWebApp(validPath)
    } else {
      this.validWebApp(this.webAppPath)
    }
    // setTimeout(() => this.validNotifications(), 5000);
  },
  methods: {
    validWebApp(path_web_app) {
      let data = new FormData
      data.append('path_wep_app', path_web_app)

      window.axios.post('validPathEvent', data)
        .then(res => {
          this.eventId = res.data[0].id
          localStorage.setItem('eventId', this.eventId)
          console.log('data:.. ', res.data)
          //cargamos los styles
          // this.getStyles(res.data[0].id)
          //traemos la info del evento
          this.getEvent()
        }).catch(err => {
          // this.$swal("No existe evento asociado a este dominio")
          console.log(err)
          this.$router.push({name: "notFoundPage"})
        })
    },
    getEvent() {
      window.axios.get(`showEvent/${this.eventId}`)
        .then(response => {
          console.log('data:.. ', response.data)
          this.event = response.data[0]
        })
    },
  }
}
</script>

<style scoped>
.img-ticket-container{
  background-image: url('/assets/img/img-ticket-vertical.png');
  background-repeat: no-repeat !important;
  background-size: 100% 100%;
  padding: 1.8rem;
  margin-top: 5rem;
  margin-bottom: 5rem;

}
.img-ticket-container img{
  width: 100% !important;
}
.footer-nav {
  background-color: #ffffff !important;
}

.footer-nav-area {
  background-color: #ffffff !important;

}

.btn-primary {
  color: #ffffff;
  padding: 1rem;
}

.info-event p {
  text-align: justify;
}

.text-info {
  font-weight: 600;
  color: #691B9A !important;
}

.text-title {
  font-weight: 600;
  color: #3D2895 !important;
}

.text-subtitle {
  color: #00000094;
}

.icon-qr {
  color: #9B27B0;
}

.ticket {
  position: relative;
  box-sizing: border-box;
  /*width: 100%;*/
  /*height: 100%;*/
  padding: 20px;
  border-radius: 10px;
  background: #FBFBFB;
}

.ticket:before,
.ticket:after {
  content: '';
  position: absolute;
  left: 0.1%;
  height: 6px;
  width: 100%;
}

.ticket:before {
  top: -5px;
  background: radial-gradient(circle, transparent, transparent 50%, #FBFBFB 50%, #FBFBFB 100%) -7px -8px / 15px 15px repeat-x;
}

.ticket:after {
  bottom: -5px;
  background: radial-gradient(circle, transparent, transparent 50%, #FBFBFB 50%, #FBFBFB 100%) -7px -2px / 15px 15px repeat-x;
}

.ticket__content {
  box-sizing: border-box;
  /*height: 100%;*/
  /*width: 100%;*/
}
</style>