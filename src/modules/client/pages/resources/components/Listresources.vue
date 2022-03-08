<template> 
  <div v-for="resource in resoursesActivity" :key="resource.id">
    <a v-if="resource.type == 'url'" class="affan-element-item" :href="resource.url" target="_blank">
      {{ resource.name }}
      <i class="bi bi-link" style="font-size: 20px;"></i>
    </a>
    <a v-else class="affan-element-item" :href="urlBaseFile + resource.url" target="_blank">
      {{ resource.name }}
      <i class="bi bi-cloud-arrow-down" style="font-size: 20px;"></i>
    </a>
  </div>
</template>

<script>
export default {
  name: "Listresources",
  props: {
    resoursesActivity: {
      type: Array,
    },
  },
  data() {
    return {
      urlBaseFile: process.env.VUE_APP_API_URL_FILES,
    }
  }
}
</script>

<style scoped>

</style>