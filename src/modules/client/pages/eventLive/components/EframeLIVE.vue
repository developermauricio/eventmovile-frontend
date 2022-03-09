<template>
    <div class="marg-top">
        <div class="ratio ratio-16x9">
          <div v-html="codeStreaming" class="content-streaming"></div>
        </div>
      </div>
</template>

<script>
export default {
  name: "EframeLIVE",
  props: {
    codeStreaming: {
      type: String,
      default: ''
    }
  },
}
</script>

<style scoped>
.marg-top {
  margin-top: 50px;
}
.content-streaming {
  width: 100%;
  height: 315px;
}
</style>