<template>
  <div class="offcanvas offcanvas-bottom" id="modalFilterNetworking" tabindex="-1" aria-labelledby="modalFilterNetworking">

    <div class="header-content position-relative d-flex align-items-center justify-content-between">
      <!-- Back Button -->
      <div class="back-button">
        <h4 class="mb-0 position-relative text-center fw-bold ps-3 mt-1">Filtar por</h4>
      </div>
      <!-- Page Title -->
      <div class="page-heading">
        <button class="btn-close text-reset" type="button" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Filters"
}
</script>

<style scoped>
.offcanvas-bottom {
  height: 50% !important;
}
</style>