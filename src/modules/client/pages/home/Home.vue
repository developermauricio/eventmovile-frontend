<template>
  <Headerhome/>
  <Headerwelcome/>
  <Bannerprincipal/>
  <Ticketinfo/>
  <Schedule/>
  <ButtonFloat/>
</template>

<script>
import {defineAsyncComponent} from "vue";

export default {
  name: "Layout",
  components: {
    Headerhome: defineAsyncComponent(() => import(/* webpackChunkName: "Navbar"*/ '@/modules/client/shared/components/Headerhome')),
    Ticketinfo: defineAsyncComponent(() => import(/* webpackChunkName: "Ticketinfo"*/ '@/modules/client/pages/home/components/TicketIinfo')),
    ButtonFloat: defineAsyncComponent(() => import(/* webpackChunkName: "ButtonFloat"*/ '@/modules/client/pages/home/components/ButtonFloat')),
    Headerwelcome: defineAsyncComponent(() => import(/* webpackChunkName: "Headerwelcome"*/ '@/modules/client/pages/home/components/Headerwelcome')),
    Bannerprincipal: defineAsyncComponent(() => import(/* webpackChunkName: "Bannerprincipal"*/ '@/modules/client/pages/home/components/Bannerprincipal')),
    Schedule: defineAsyncComponent(() => import(/* webpackChunkName: "Schedule"*/ '@/modules/client/pages/home/components/Schedule')),
  },

  mounted() {

  }
}
</script>

<style scoped>

</style>