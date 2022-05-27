<template>
  <div class="header-area header-home" id="headerFavorites">
    <div class="container">
      <!-- # Paste your Header Content from here -->
      <!-- # Header Five Layout -->
      <!-- # Copy the code from here ... -->
      <!-- Header Content -->
      <div class="header-content header-style-five position-relative d-flex align-items-center justify-content-between">
        <div @click="$router.go(-1)">
          <div class="back-button">
            <svg class="bi bi-arrow-left-short icon-back" width="32" height="32" viewBox="0 0 16 16"
                 fill="currentColor" xmlns="http://www.w3.org/2000/svg" data-v-76333a24="">
              <path fill-rule="evenodd"
                    d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                    data-v-76333a24=""></path>
            </svg>
          </div>
        </div>
        <div class="page-heading text-center">
          <h6 class="mb-0 position-relative text-center fw-bold">Favoritos</h6>
        </div>
        <!-- Logo Wrapper -->
        <!--        <div class="logo-wrapper"><a href="page-home.html"><img src="" alt=""></a></div>-->
        <!-- Navbar Toggler -->
        <div class="chat-user--info d-flex align-items-center">
          <div class="setting-wrapper me-4" data-bs-toggle="offcanvas" data-bs-target="#modalSearchScheedule"
               aria-controls="modalSearchScheedule">
            <div class="setting-trigger-btn">
<!--              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search"-->
<!--                   viewBox="0 0 16 16">-->
<!--                <path-->
<!--                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>-->
<!--              </svg>-->
            </div>
          </div>
        </div>

      </div>
      <!-- # Header Five Layout End -->
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderFavorites"
}
</script>

<style scoped>

</style>