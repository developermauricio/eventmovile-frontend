<template>
  <Header/>
  <div class="container">
    <EframeLIVE :codeStreaming="codeStreaming"/>
    <button @click="openModal" > Open Modal uphands </button>
    <Tabs :activity="activity"/>
    <FloatButtonFile/>
    <FloatButtonQuestion/>
  </div>
  <!-- <RateActivity/> -->
  <ModalUpHands ref="modalhands" />
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
    ModalUpHands: defineAsyncComponent(() => import('@/modules/client/pages/eventLive/components/modals/ModalUpHands')),    
    //RateActivity: defineAsyncComponent(() => import('@/modules/client/pages/eventLive/components/RateActivity')),    
  },
  data() {
    return {
      activity: {},
      codeStreaming: ''
    }
  },
  methods: {
    openModal() {
      this.$refs.modalhands.openModal()      
    }
  },
  mounted() {

    // this.activity = window.activityData
    this.activity = JSON.parse( localStorage.getItem('current_Activity') ) || {}
    this.event = JSON.parse( localStorage.getItem('event') ) || {}
    console.log(this.activity)
    if ( this.activity.code_streaming === 'null' ) {
      this.codeStreaming = this.event.code_streaming
    } else {
      this.codeStreaming = this.activity.code_streaming
    }

  }
}
</script>

<style scoped>

</style>