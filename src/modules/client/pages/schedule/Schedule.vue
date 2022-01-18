<template>
<Headerschedule />
</template>

<script>
import {defineAsyncComponent} from "vue";

export default {
  name: "Schedule",
  components: {
    Headerschedule: defineAsyncComponent(() => import(/* webpackChunkName: "Headerschedule"*/ '@/modules/client/pages/schedule/components/Headerschedule')),
  }
}
</script>

<style scoped>

</style>