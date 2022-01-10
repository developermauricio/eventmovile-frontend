<template>
  <Header/>
  <Participants/>
  <div id="nav">
    <Navbutton/>
  </div>
</template>

<script>
import {defineAsyncComponent} from "vue";

export default {
  name: "Networking",
  components:{
    Navbutton: defineAsyncComponent(() => import(/* webpackChunkName: "Navbutton"*/ '@/modules/client/shared/components/Navbutton')),
    Header: defineAsyncComponent(() => import(/* webpackChunkName: "Header"*/ '@/modules/client/pages/networking/components/Header')),
    Participants: defineAsyncComponent(() => import(/* webpackChunkName: "Header"*/ '@/modules/client/pages/networking/components/Participants')),
  }
}
</script>

<style scoped>

</style>