<template>
  <div>
    <Headerhome :dataUser="dataUser" :eventStyles="eventStyles"/>
    <Headerwelcome :userName="userName"/>
    <Bannerprincipal :eventStyles="eventStyles" :event="event"/>

    <!--  Slider con logos :autoplay="2000" :wrap-around="true"-->
    <div v-if="listSliderLogos.length" class="container" style="margin-top: -20px;">
      <Carousel :items-to-show="2.5" :autoplay="2000" :wrap-around="true">
        <Slide v-for="(item, index) in listSliderLogos" :key="index">
          <div class="carousel__item">
            <img class="item-logo" :src="urlBaseFile + item.name_logo" :alt="item.title_logo">
          </div>
        </Slide>
      </Carousel>
    </div>

    <Ticketinfo :style="{'margin-top': listSliderLogos.length ? '0': '-35px'}"/>
    <Schedule/>
    <Speakers/>
    <FeriaComercial/>
    <Photosevent/>
    <Evaluateevent/>
    <ButtonFloat/>
    <div id="nav">
      <Navbar/>
    </div>
  </div>

</template>

<script>
import {defineAsyncComponent} from "vue";
import { refreshToken, refreshDataHome } from '@/utils/update-local-storage';
import { getSendRequest } from '@/utils/using-axios';
import 'vue3-carousel/dist/carousel.css';
import {Carousel, Slide} from 'vue3-carousel';

export default {
  name: "Home",
  props:{
    webAppPath: {
      type: String,
      default:''
    },
  },  
  components: {   
    Carousel,
    Slide, 
    Headerhome: defineAsyncComponent(() => import('@/modules/client/shared/components/Headerhome')),
    Ticketinfo: defineAsyncComponent(() => import('@/modules/client/pages/home/components/TicketIinfo')),
    Headerwelcome: defineAsyncComponent(() => import('@/modules/client/pages/home/components/Headerwelcome')),
    Bannerprincipal: defineAsyncComponent(() => import('@/modules/client/pages/home/components/Bannerprincipal')),
    Schedule: defineAsyncComponent(() => import('@/modules/client/pages/home/components/Schedule')),
    Speakers: defineAsyncComponent(() => import('@/modules/client/pages/speakers/SpeakersHome')),
    FeriaComercial: defineAsyncComponent(() => import('@/modules/client/pages/feriaComercial/FeriaHome')),
    Photosevent: defineAsyncComponent(() => import('@/modules/client/pages/home/components/Photosevent')),
    Evaluateevent: defineAsyncComponent(() => import('@/modules/client/pages/home/components/Evaluateevent')),
    Navbar: defineAsyncComponent(() => import('@/modules/client/shared/components/Navbutton')),
    ButtonFloat: defineAsyncComponent(() => import('@/modules/client/pages/home/components/ButtonFloat')),
  },
  data(){
    return {
      dataUser: {},
      eventStyles: {},
      event: {},
      userName: '',
      urlBaseFile: process.env.VUE_APP_API_URL_FILES,
      listSliderLogos: []
    }
  },
  methods: {
    async loadDataPage() {
      this.dataUser = JSON.parse( localStorage.getItem('user') ) || {}
      this.eventStyles = JSON.parse( localStorage.getItem('style-event') ) || {}
      this.event = JSON.parse( localStorage.getItem('event') ) || {}
      this.userName = this.dataUser.name + ' ' + this.dataUser.lastname

      this.getSliderLogos()
    },    
    async getSliderLogos() {
      if ( this.eventStyles.slider_logos == 0 || this.eventStyles.slider_logos == '0' || this.eventStyles.slider_logos == null ) return
      
      const responseLogos = await getSendRequest(`list-logos/${this.eventStyles.event_id}`) 

      if ( responseLogos ) {
        this.listSliderLogos = responseLogos;        
      }
    }
  },
  created() {
    window.onload = async () => {
      await refreshToken();
      await refreshDataHome();

      this.loadDataPage()
    };

    this.loadDataPage()
  }
}
</script>

<style scoped>
img.item-logo {
  max-height: 120px;
  object-fit: contain;
}
</style>