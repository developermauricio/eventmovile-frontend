<template>
<Header/>
<Gallery/>
</template>

<script>
import {defineAsyncComponent} from "vue";

export default {
  name: "Photo",
  components:{
    Header: defineAsyncComponent(() => import(/* webpackChunkName: "Header"*/ '@/modules/client/pages/photo/components/Header')),
    Gallery: defineAsyncComponent(() => import(/* webpackChunkName: "Gallery"*/ '@/modules/client/pages/photo/components/Gallery')),

  }
}
</script>

<style scoped>

</style>