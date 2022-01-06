<template>
  <div class="container-fluid content-header-welcome ps-0">
    <div class="pb-2 container">
      <p class="text-welcome pt-1">BIENVENIDO</p>
      <h3 class="text-user-welcome">Rodrigo Rodriguez</h3>
    </div>
  </div>

</template>

<script>
export default {
  name: "Headerwelcome"
}
</script>

<style scoped>
.text-welcome{
  color: #00000094 !important;
  letter-spacing: 0.3vh;
  margin: 0;
}
.text-user-welcome{
  font-weight: 600;
}
.content-header-welcome{
  background-color: #ffffff !important;
  position: relative;
  padding-top: 3.5rem;
  /*z-index: 9999999999;*/
}
</style>