<template>
  <div>
    <!-- Header Area -->
    <div class="header-area header-home" id="headerArea">
      <div class="container">
        <!-- # Paste your Header Content from here -->
        <!-- # Header Five Layout -->
        <!-- # Copy the code from here ... -->
        <!-- Header Content -->
        <div
            class="header-content header-style-five position-relative d-flex align-items-center justify-content-between">
          <!-- Logo Wrapper -->
          <div class="logo-wrapper"><a href="page-home.html"><img src="" alt=""></a></div>
          <!-- Navbar Toggler -->
          <div class="chat-user--info d-flex align-items-center">
            <!-- Notification -->
            <div class="setting-wrapper">
              <div class="setting-trigger-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor"
                     class="bi bi-person-plus" viewBox="0 0 16 16">
                  <path
                      d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                  <path fill-rule="evenodd"
                        d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                </svg>
                <!--              <span></span>-->
              </div>
            </div>

            <div class="setting-wrapper ms-4">
              <div class="setting-trigger-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-people"
                     viewBox="0 0 16 16">
                  <path
                      d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                </svg>
              </div>
            </div>
          </div>

        </div>
        <!-- # Header Five Layout End -->
      </div>
    </div>
    <!--=====================================
        HEADER TITLE
    ======================================-->
    <div class="pt-3">
      <div class="mt-5 align-items-end container mb-3">
        <p class="float-end mt-1 ms-3 text-more" data-bs-toggle="offcanvas" data-bs-target="#modalFilterNetworking" aria-controls="modalFilterNetworking">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-filter" viewBox="0 0 16 16">
            <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
          </svg>
        </p>
        <p class="float-end mt-1 text-more" data-bs-toggle="offcanvas" data-bs-target="#modalSearchNetworking" aria-controls="modalSearchNetworking">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search"
               viewBox="0 0 16 16">
            <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>

        </p>
        <h3 class="text-networkint-title">Explorar</h3>
      </div>
    </div>
    <Search/>
    <Filter/>
  </div>
</template>

<script>
import {defineAsyncComponent} from "vue";

export default {
  name: "Header",
  components:{
    Search: defineAsyncComponent(() => import(/* webpackChunkName: "Navbar"*/ '@/modules/client/pages/networking/components/Search')),
    Filter: defineAsyncComponent(() => import(/* webpackChunkName: "Filter"*/ '@/modules/client/pages/networking/components/Filters')),
  }
}
</script>

<style scoped>
.text-networkint-title {
  font-weight: 600;
}

.bi-search {
  font-weight: bold !important;
  color: #00000094;
}

.bi-person-plus{
  color: #00000094;
}

.bi-people{
  color: #00000094;
}


</style>