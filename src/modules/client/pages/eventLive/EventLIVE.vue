<template>
  <Header/>
  <EframeLIVE/>
  <Tabs/>
  <FloatButtonFile/>
  <FloatButtonChat/>
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
    FloatButtonChat: defineAsyncComponent(() => import('@/modules/client/pages/eventLive/components/FloatButtonChat')),    
  },

  mounted() {

  }
}
</script>

<style scoped>

</style>