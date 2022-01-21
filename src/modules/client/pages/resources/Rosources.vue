<template>
  <Header/>
  <Listresources/>
</template>

<script>
import {defineAsyncComponent} from "vue";

export default {
  name: "Rosources",
  components:{
    Header: defineAsyncComponent(() => import(/* webpackChunkName: "Header"*/ '@/modules/client/pages/resources/components/Header')),
    Listresources: defineAsyncComponent(() => import(/* webpackChunkName: "Header"*/ '@/modules/client/pages/resources/components/Listresources')),
  }
}
</script>

<style scoped>

</style>