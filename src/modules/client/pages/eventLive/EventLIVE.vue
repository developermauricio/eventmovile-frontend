<template>
  <Header/>
  <div class="container">
    <EframeLIVE :codeStreaming="codeStreaming"/>
    <Tabs :activity="activity"/>
    <FloatButtonFile/>
    <FloatButtonQuestion/>
  </div>
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
  data() {
    return {
      activity: {},
      codeStreaming: ''
    }
  },
  mounted() {
    this.activity = JSON.parse( localStorage.getItem('current_Activity') ) || {}
    
    if ( this.activity.code_streaming == 'null' ) {
      this.codeStreaming = this.activity.event.code_streaming
    } else {
      this.codeStreaming = this.activity.code_streaming
    }

  }
}
</script>

<style scoped>

</style>