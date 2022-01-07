<template>
  <div>
    <Headerhome/>
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

  mounted() {

  }
}
</script>

<style scoped>

</style>