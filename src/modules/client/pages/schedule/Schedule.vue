<template>
  <Headerschedule/>
  <Tabinfo/>
  <div id="nav">
    <Navbar/>
  </div>
</template>

<script>
import {defineAsyncComponent} from "vue";

export default {
  name: "Schedule",
  components: {
    Headerschedule: defineAsyncComponent(() => import(/* webpackChunkName: "Headerschedule"*/ '@/modules/client/pages/schedule/components/Headerschedule')),
    Tabinfo: defineAsyncComponent(() => import(/* webpackChunkName: "Tabinfo"*/ '@/modules/client/pages/schedule/components/Tabsinfo')),
    Navbar: defineAsyncComponent(() => import(/* webpackChunkName: "Navbar"*/ '@/modules/client/shared/components/Navbutton'))

  }
}
</script>

<style scoped>

</style>