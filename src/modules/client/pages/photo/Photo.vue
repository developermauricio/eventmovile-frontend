<template>
  <Header/>
  <Gallery/>
  <ButtonFloatAddPhoto/>
</template>

<script>
import {defineAsyncComponent} from "vue";

export default {
  name: "Photo",
  components: {
    Header: defineAsyncComponent(() => import(/* webpackChunkName: "Header"*/ '@/modules/client/pages/photo/components/Header')),
    Gallery: defineAsyncComponent(() => import(/* webpackChunkName: "Gallery"*/ '@/modules/client/pages/photo/components/Gallery')),
    ButtonFloatAddPhoto: defineAsyncComponent(() => import(/* webpackChunkName: "ButtonFloatAddPhoto"*/ '@/modules/client/pages/photo/components/ButtonFloatAddPhoto')),
  }
}
</script>

<style scoped>

</style>