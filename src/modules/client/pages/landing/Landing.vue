<template>
  <div>
    <!-- Header Area -->
    <div class="header-area header-home" id="headerArea">
      <div class="container">
        <div class="header-content header-style-five position-relative d-flex align-items-center justify-content-between">
          <!-- Logo Wrapper -->
          <div class="logo-wrapper">
            <a href="#">
              <img :src="getLogo" alt="Logo evento">
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="container" ref="containerLoarder">
      <div class="img-ticket-container">
        <img class="p-2" :src="getBanner" alt="">
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
              <h6 class="text-truncate mb-0 text-title">{{ startDate }}</h6>
              <div class="last-chat">
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
              <div class="last-chat">
                <p class="mb-0 text-truncate text-subtitle">{{ event.location ?  event.location : 'Por confirmar' }}</p>
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
              <router-link to="/login">INICIA SESIÓN</router-link>
            </li>
            <li>
              <router-link to="/register" class="btn m-1 btn-primary">REGISTRATE</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSendRequest, postSendRequest } from '@/utils/using-axios';
import { updateEvent, updateStyles } from '@/utils/update-local-storage';

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
      styles: null,
      urlBaseFile: process.env.VUE_APP_API_URL_FILES,
      fullPage: false,
      loader: null,
    }
  },  
  computed: {
    getLogo() {
      if ( this.styles ) {
        return this.styles.home_img_logo ? this.urlBaseFile + this.styles.home_img_logo : 'assets/img/img-generic.png'
      } else {
        return 'assets/img/img-generic.png'
      }
    },
    getBanner() {
      if ( this.styles ) {
        return this.styles.wa_banner_one ? this.urlBaseFile + this.styles.wa_banner_one : 'assets/img/img-generic.png'
      } else { 
        return 'assets/img/img-generic.png'
      }
    },
    startDate() {
      return this.$dayjs(this.event.start_date).format(`ddd DD MMMM, YYYY`);
    },
    startDateHour() {
      return this.$dayjs(this.event.start_date).format('HH:mm a');
    }
  },
  created() {
    this.loader = this.$loading.show({
      container: this.fullPage ? null : this.$refs.containerLoarder,
      canCancel: false,
    });

    window.onload = async () => {
      console.log('se recargo la pagina javascript')
      await updateEvent()
      await updateStyles()

      this.validWebApp(this.webAppPath)
    };
    
    if ( this.webAppPath ) {
      localStorage.setItem('webAppPath', this.webAppPath)
      this.validWebApp(this.webAppPath)
    } 
  },
  methods: {
    async validWebApp(path_web_app) {      

      let data = new FormData
      data.append('path_wep_app', path_web_app)

      /***  Se comprueba que exista el evento  ***/
      const validPatnEvent =  await postSendRequest('validPathEvent', data)
      
      if ( validPatnEvent ) {
        this.eventId = validPatnEvent[0].id
        localStorage.setItem('eventId', this.eventId)
      } else {
        localStorage.clear()
        this.$router.push({path: "/no-found"})
      }

      /***  cargamos los styles  ***/
      await this.getStyles( this.eventId )

      /***  traemos la info del evento  ***/
      await this.getEvent( this.eventId )

      if ( this.loader ) this.loader.hide()
      this.loader = null
    },

    async getStyles( eventId ){
        let existStyle = localStorage.getItem('style-event')

        if ( existStyle ) {
          this.styles = JSON.parse(existStyle)
          return
        }

        const styleEvent = await getSendRequest(`styleEvent/${eventId}`)  

        if ( styleEvent ) {
          this.styles = styleEvent
          localStorage.setItem("style-event", JSON.stringify(this.styles));
        }
    }, 

    async getEvent( eventId ) {  
      let existEvent = localStorage.getItem('event')

      if ( existEvent ) {
        this.event = JSON.parse(existEvent)
        return
      } 

      const showEvent = await getSendRequest(`showEvent/${eventId}`)  

      if ( showEvent ) {
        this.event = showEvent[0]
        localStorage.setItem("event", JSON.stringify(this.event));
      }
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
  max-height: 200px;
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