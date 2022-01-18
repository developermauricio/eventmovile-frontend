<template>
  <Header/>
  <Listrequestreceived/>
  <div id="nav">
    <Navbutton/>
  </div>
</template>

<script>
import {defineAsyncComponent} from "vue";

export default {
  name: "Requetsreceived",
  components: {
    Navbutton: defineAsyncComponent(() => import(/* webpackChunkName: "Navbutton"*/ '@/modules/client/shared/components/Navbutton')),
    Header: defineAsyncComponent(() => import(/* webpackChunkName: "Header"*/ '@/modules/client/pages/networking/components/Header')),
    Listrequestreceived: defineAsyncComponent(() => import(/* webpackChunkName: "Listrequestreceived"*/ '@/modules/client/pages/networking/components/Listrequestreceived')),
  }
}
</script>

<style scoped>

</style>