<template>
  <Header/>
  <Participants/>
  <div id="nav">
    <Navbutton/>
  </div>
</template>

<script>
import {defineAsyncComponent} from "vue";
import { refreshToken } from '@/utils/update-local-storage';

export default {
  name: "Networking",  
  components:{
    Navbutton: defineAsyncComponent(() => import('@/modules/client/shared/components/Navbutton')),
    Header: defineAsyncComponent(() => import('@/modules/client/pages/networking/components/Header')),
    Participants: defineAsyncComponent(() => import('@/modules/client/pages/networking/components/Participants')),
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