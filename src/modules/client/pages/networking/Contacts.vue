<template>
  <Header/>
  <Listcontact/>
  <div id="nav">
    <Navbutton/>
  </div>
</template>

<script>
import {defineAsyncComponent} from "vue";
import { refreshToken } from '@/utils/update-local-storage';

export default {
  name: "Contacts",
  components: {
    Navbutton: defineAsyncComponent(() => import(/* webpackChunkName: "Navbutton"*/ '@/modules/client/shared/components/Navbutton')),
    Header: defineAsyncComponent(() => import(/* webpackChunkName: "Header"*/ '@/modules/client/pages/networking/components/Header')),
    Listcontact: defineAsyncComponent(() => import(/* webpackChunkName: "Listcontact"*/ '@/modules/client/pages/networking/components/Listcontact')),
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