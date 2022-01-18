<template>
  <Headerhome/>
  <div class="container mb-4">
    <Headerprofile/>
    <Infoprofile/>
  </div>
  <div id="nav">
    <Navbar/>
  </div>
</template>

<script>
import {defineAsyncComponent} from "vue";

export default {
  name: "Profile",
  components: {
    Headerhome: defineAsyncComponent(() => import(/* webpackChunkName: "Headerhome"*/ '@/modules/client/shared/components/Headerhome')),
    Headerprofile: defineAsyncComponent(() => import(/* webpackChunkName: "Headerprofile"*/ '@/modules/client/pages/profile/components/Headerprofile')),
    Infoprofile: defineAsyncComponent(() => import(/* webpackChunkName: "Infoprofile"*/ '@/modules/client/pages/profile/components/Infoprofile')),
    Navbar: defineAsyncComponent(() => import(/* webpackChunkName: "Navbar"*/ '@/modules/client/shared/components/Navbutton'))
  }
}
</script>

<style scoped>

</style>