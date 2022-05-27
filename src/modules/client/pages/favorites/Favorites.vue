<template>
  <HeaderFavorites/>
  <Activities/>
  <ButtonFloat/>
  <div id="nav">
    <Navbar/>
  </div>
</template>

<script>
import {defineAsyncComponent} from "vue";

export default {
  name: "Favorites",
  components:{
    HeaderFavorites: defineAsyncComponent(() => import(/* webpackChunkName: "HeaderFavorites"*/ '@/modules/client/pages/favorites/components/HeaderFavorites.vue')),
    Activities: defineAsyncComponent(() => import(/* webpackChunkName: "Activities"*/ '@/modules/client/pages/favorites/components/Activities.vue')),
    Navbar: defineAsyncComponent(() => import(/* webpackChunkName: "Navbar"*/ '@/modules/client/shared/components/Navbutton')),
    ButtonFloat: defineAsyncComponent(() => import(/* webpackChunkName: "ButtonFloat"*/ '@/modules/client/pages/home/components/ButtonFloat')),
  }
}
</script>

<style scoped>

</style>