<template>
  <Header/>
  <Listrequestsend/>
  <div id="nav">
    <Navbutton/>
  </div>
</template>

<script>
import {defineAsyncComponent} from "vue";

export default {
  name: "Requestsend",
  components: {
    Navbutton: defineAsyncComponent(() => import(/* webpackChunkName: "Navbutton"*/ '@/modules/client/shared/components/Navbutton')),
    Header: defineAsyncComponent(() => import(/* webpackChunkName: "Header"*/ '@/modules/client/pages/networking/components/Header')),
    Listrequestsend: defineAsyncComponent(() => import(/* webpackChunkName: "Listrequestsend"*/ '@/modules/client/pages/networking/components/Listrequestsend')),
  }
}
</script>

<style scoped>

</style>