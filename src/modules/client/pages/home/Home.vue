<template>
  <div>
    <!-- <Headerhome :nameUser="nameUser" :prueba="prueba"/> -->
    <Headerhome />
    <Headerwelcome/>
    <Bannerprincipal/>
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
    Speakers: defineAsyncComponent(() => import(/* webpackChunkName: "Speakers"*/ '@/modules/client/pages/home/components/Speakers')),
    Photosevent: defineAsyncComponent(() => import(/* webpackChunkName: "Photosevent"*/ '@/modules/client/pages/home/components/Photosevent')),
    Evaluateevent: defineAsyncComponent(() => import(/* webpackChunkName: "Evaluateevent"*/ '@/modules/client/pages/home/components/Evaluateevent')),
    Navbar: defineAsyncComponent(() => import(/* webpackChunkName: "Navbar"*/ '@/modules/client/shared/components/Navbutton'))
  },
  data(){
    return {
      dataUser: null,
      nameUser: 'Hola.. bebe..',
      prueba: 'Prueba...',
    }
  },
  /* computed: {
    nameUser() {
      return this.dataUser.name + ' ' + this.dataUser.lastname || 'bebe...'
    }
  }, */
  created() {
    /* const dataUserString = this.$route.params.dataUser
    dataUserString ? this.dataUser = Object.assign({}, JSON.parse(dataUserString)) : ''
    console.log('datos user: ', this.dataUser);
    setTimeout(() => { 
      this.nameUser = this.dataUser.name + ' ' + this.dataUser.lastname
      console.log('timer') 
    }, 1000); */
  },
  mounted() { }
}
</script>

<style scoped>

</style>