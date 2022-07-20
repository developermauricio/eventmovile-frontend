<template>
  <Header/>
  <div class="container">
    <EframeLIVE :codeStreaming="codeStreaming"/>
    <Tabs :activity="activity"/>
    <FloatButton />
  </div>
  <!-- <RateActivity/> -->
  <div id="nav">
    <Navbar/>
  </div>
</template>

<script>
import {defineAsyncComponent} from "vue";

export default {
  name: "Layout",  
  components: {
    Navbar: defineAsyncComponent(() => import(/* webpackChunkName: "Navbar"*/ '@/modules/client/shared/components/Navbutton')),
    Header: defineAsyncComponent(() => import('@/modules/client/pages/eventLive/components/Header')),
    EframeLIVE: defineAsyncComponent(() => import('@/modules/client/pages/eventLive/components/EframeLIVE')),
    Tabs: defineAsyncComponent(() => import('@/modules/client/pages/eventLive/components/Tabs')), 
    FloatButton: defineAsyncComponent(() => import('@/modules/client/pages/eventLive/components/FloatButton')),     
  },
  data() {
    return {
      activity: {},
      codeStreaming: ''
    }
  },
  mounted() {
    this.activity = JSON.parse( localStorage.getItem('current_Activity') ) || {}
    this.event = JSON.parse( localStorage.getItem('event') ) || {}
    console.log(this.activity)
    if ( this.activity.code_streaming === 'null' ) {
      this.codeStreaming = this.event.code_streaming
    } else {
      this.codeStreaming = this.activity.code_streaming
    }

    let params = {activity_id: this.activity.id}
    window.axios.post('trackingActivity', params)
  }
}
</script>

<style scoped>

</style>