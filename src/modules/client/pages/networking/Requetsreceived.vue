<template>
  <Header/>
  <Listrequestreceived/>
  <div id="nav">
    <Navbutton/>
  </div>
</template>

<script>
import {defineAsyncComponent} from "vue";
import { refreshToken } from '@/utils/update-local-storage';

export default {
  name: "Requetsreceived",
  components: {
    Navbutton: defineAsyncComponent(() => import(/* webpackChunkName: "Navbutton"*/ '@/modules/client/shared/components/Navbutton')),
    Header: defineAsyncComponent(() => import(/* webpackChunkName: "Header"*/ '@/modules/client/pages/networking/components/Header')),
    Listrequestreceived: defineAsyncComponent(() => import(/* webpackChunkName: "Listrequestreceived"*/ '@/modules/client/pages/networking/components/Listrequestreceived')),
  },
  mounted() {
    window.onload = async () => {
      await refreshToken();
    };
  }
}
</script>

<style scoped>

</style>