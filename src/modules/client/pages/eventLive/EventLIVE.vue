<template>
  <Header/>
  <EframeLIVE/>
  <Tabs/>
  <FloatButtonFile/>
  <FloatButtonQuestion/>
  <!-- <RateActivity/> -->
</template>

<script>
import {defineAsyncComponent} from "vue";

export default {
  name: "Layout",
  components: {
    Header: defineAsyncComponent(() => import('@/modules/client/pages/eventLive/components/Header')),
    EframeLIVE: defineAsyncComponent(() => import('@/modules/client/pages/eventLive/components/EframeLIVE')),
    Tabs: defineAsyncComponent(() => import('@/modules/client/pages/eventLive/components/Tabs')),
    FloatButtonFile: defineAsyncComponent(() => import('@/modules/client/pages/eventLive/components/FloatButtonFile')),    
    FloatButtonQuestion: defineAsyncComponent(() => import('@/modules/client/pages/eventLive/components/FloatButtonQuestion')),    
    //RateActivity: defineAsyncComponent(() => import('@/modules/client/pages/eventLive/components/RateActivity')),    
  },

  mounted() {

  }
}
</script>

<style scoped>

</style>