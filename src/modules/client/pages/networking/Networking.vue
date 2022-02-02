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
    Navbutton: defineAsyncComponent(() => import('@/modules/client/shared/components/Navbutton')),
    Header: defineAsyncComponent(() => import('@/modules/client/pages/networking/components/Header')),
    Participants: defineAsyncComponent(() => import('@/modules/client/pages/networking/components/Participants')),
  },
}
</script>

<style scoped>

</style>