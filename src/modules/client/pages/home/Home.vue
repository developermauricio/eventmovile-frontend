<template>
  <div>
    <Headerhome :dataUser="dataUser" :eventStyles="eventStyles"/>
    <Headerwelcome :userName="userName"/>
    <Bannerprincipal :eventStyles="eventStyles"/>
    <Ticketinfo/>
    <Schedule/>
    <Speakers/>
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

export default {
  name: "Home",
  props:{
    webAppPath: {
      type: String,
      default:''
    },
  },  
  components: {    
    Headerhome: defineAsyncComponent(() => import(/* webpackChunkName: "Navbar"*/ '@/modules/client/shared/components/Headerhome')),
    Ticketinfo: defineAsyncComponent(() => import(/* webpackChunkName: "Ticketinfo"*/ '@/modules/client/pages/home/components/TicketIinfo')),
    ButtonFloat: defineAsyncComponent(() => import(/* webpackChunkName: "ButtonFloat"*/ '@/modules/client/pages/home/components/ButtonFloat')),
    Headerwelcome: defineAsyncComponent(() => import(/* webpackChunkName: "Headerwelcome"*/ '@/modules/client/pages/home/components/Headerwelcome')),
    Bannerprincipal: defineAsyncComponent(() => import(/* webpackChunkName: "Bannerprincipal"*/ '@/modules/client/pages/home/components/Bannerprincipal')),
    Schedule: defineAsyncComponent(() => import(/* webpackChunkName: "Schedule"*/ '@/modules/client/pages/home/components/Schedule')),
    Speakers: defineAsyncComponent(() => import('@/modules/client/pages/speakers/SpeakersHome')),
    Photosevent: defineAsyncComponent(() => import(/* webpackChunkName: "Photosevent"*/ '@/modules/client/pages/home/components/Photosevent')),
    Evaluateevent: defineAsyncComponent(() => import(/* webpackChunkName: "Evaluateevent"*/ '@/modules/client/pages/home/components/Evaluateevent')),
    Navbar: defineAsyncComponent(() => import(/* webpackChunkName: "Navbar"*/ '@/modules/client/shared/components/Navbutton'))
  },
  data(){
    return {
      dataUser: {},
      eventStyles: {},
      event: {},
      userName: '',
      hallsEvent: {},
    }
  },
  methods: {
    loadDataPage() {
      //const dataUserString = this.$route.params.dataUser
      //dataUserString ? this.dataUser = Object.assign({}, JSON.parse(dataUserString)) : ''
      this.dataUser = JSON.parse( localStorage.getItem('user') ) || {}
      this.eventStyles = JSON.parse( localStorage.getItem('style-event') ) || {}
      this.event = JSON.parse( localStorage.getItem('event') ) || {}
      this.userName = this.dataUser.name + ' ' + this.dataUser.lastname

      this.getHallsEvent()
    },
    async getHallsEvent() {
      const responseHalls = await getSendRequest(`hallsEvent/${this.event.id}`) 
      console.log('get salas: ', responseHalls)      
    },
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

</style>