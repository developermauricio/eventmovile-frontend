<template>
  <div class="content-banner-principal container ps-0 pe-0">
    <img src="/assets/img/principal-banner.png" alt="">
  </div>

</template>

<script>
export default {
  name: "Bannerprincipal"
}
</script>

<style scoped>
.content-banner-principal {
  /*margin: 0;*/
  position: relative;
  width: 100%;
  height: 250px;
}

.content-banner-principal img{
  width: 100% !important;
}

@media (max-width: 375px) and (min-width: 320px) {
  .content-banner-principal {
    height: 200px;
  }
}

@media (max-width: 767px) and (min-width: 488px) {
  .content-banner-principal {
    height: 350px;
  }
}

@media (max-width: 1024px) and (min-width: 768px) {
  .content-banner-principal {
    height: 380px;
  }
}

@media  (min-width: 1024px) {
  .content-banner-principal {
    height: 490px;
  }
}
</style>