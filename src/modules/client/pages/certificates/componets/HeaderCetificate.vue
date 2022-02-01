<template>
  <div class="header-area" id="">
    <div class="container">
      <!-- Header Content -->
      <div class="header-content position-relative d-flex align-items-center justify-content-between">
        <!-- Back Button -->
        <div class="back-button">
          <router-link to="/">
            <svg class="bi bi-arrow-left-short icon-back" width="32" height="32" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"></path>
            </svg>
          </router-link>
        </div>
        <!-- Page Title -->
        <div class="page-heading">
          <h6 class="mb-0 position-relative text-center fw-bold style-color-title">Certificados</h6>
        </div>
        <div class="setting-wrapper">
          <span @click="clickSearch()" class="padding-span">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </span>         
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderCertificate",
  methods: {
    clickSearch() {
      this.$emit('searchCertificate')
    }
  },
}
</script>

<style scoped>
.header-area{
  border-bottom: none;
}
.icon-back{
  color: #00000094;
}
.padding-span {
  padding: 10px;
}
</style>