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
          <div @click="$router.go(-1)" v-if="URLactualBool">
            <div class="back-button">
              <svg class="bi bi-arrow-left-short icon-back" width="32" height="32" viewBox="0 0 16 16"
                   fill="currentColor" xmlns="http://www.w3.org/2000/svg" data-v-76333a24="">
                <path fill-rule="evenodd"
                      d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                      data-v-76333a24=""></path>
              </svg>
            </div>
          </div>
          <!-- Logo Wrapper -->
          <div class="logo-wrapper"><a href="page-home.html"><img src="" alt=""></a></div>
          <!-- Navbar Toggler -->
          <div class="chat-user--info d-flex align-items-center">
            <router-link to="/networking-request-send">
              <div class="setting-wrapper me-4">
                <div class="setting-trigger-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                       :class="`bi bi-send `+activeButtonRequesSend" viewBox="0 0 16 16">
                    <path
                        d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                  </svg>
                </div>
              </div>
            </router-link>
            <!-- Notification -->
            <router-link to="/networking-request-received">
              <div class="setting-wrapper">
                <div class="setting-trigger-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor"
                       :class="`bi bi-person-plus `+activeButtonRequesReceived" viewBox="0 0 16 16">
                    <path
                        d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                    <path fill-rule="evenodd"
                          d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                  </svg>
                  <!--              <span></span>-->
                </div>
              </div>
            </router-link>
            <router-link to="/networking-contacts">
              <div class="setting-wrapper ms-4">
                <div class="setting-trigger-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor"
                       :class="`bi bi-people `+activeButtonContact"
                       viewBox="0 0 16 16">
                    <path
                        d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                  </svg>
                </div>
              </div>
            </router-link>
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
        <p class="float-end mt-1 ms-3 text-more" data-bs-toggle="offcanvas" data-bs-target="#modalFilterNetworking"
           aria-controls="modalFilterNetworking">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-filter"
               viewBox="0 0 16 16">
            <path
                d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
          </svg>
        </p>
        <p class="float-end mt-1 text-more" data-bs-toggle="offcanvas" data-bs-target="#modalSearchNetworking"
           aria-controls="modalSearchNetworking">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search"
               viewBox="0 0 16 16">
            <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>

        </p>
        <h3 class="text-networkint-title">{{ titleHeader }}</h3>
      </div>
    </div>
    <Search/>
    <Filter v-on:dataFilter="dataFilterMethod"/>
    <!--=====================================
      BADGE DE LOS FILTROS
    ======================================-->
    <div class="container">
      <div class="row pb-2">
        <div class="col-12">
          <div class="direction-rtl">
            <a v-for="country in filterCountries" :key="country.id"
               class="btn btn-primary m-1 text-badge">{{ country.name }}<span @click="removeCountryFilter(country)"
                                                                              class="ms-2 badge  bg-light text-black">X</span></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {defineAsyncComponent} from "vue";

export default {
  name: "Header",
  components: {
    Search: defineAsyncComponent(() => import(/* webpackChunkName: "Navbar"*/ '@/modules/client/pages/networking/components/Search')),
    Filter: defineAsyncComponent(() => import(/* webpackChunkName: "Filter"*/ '@/modules/client/pages/networking/components/Filters')),
  },
  data() {
    return {
      filterCountries: null,
      titleHeader: '',
      URLactualBool: false,
      activeButtonContact: '',
      activeButtonRequesReceived: '',
      activeButtonRequesSend: '',
    }
  },
  methods: {
    dataFilterMethod(data) {
      this.filterCountries = data
    },
    removeCountryFilter(country) {
      for (let i = 0; i < this.filterCountries.length; i++)
        if (this.filterCountries[i].id === country.id) {
          this.filterCountries.splice(i, 1);
          break;
        }
    }
  },
  mounted() {
    let URLactual = window.location;
    if (URLactual.pathname === '/networking-contacts') {
      this.activeButtonContact = 'active'
      this.titleHeader = 'Contáctos'
      this.URLactualBool = true
    } else if (URLactual.pathname === '/networking-request-received') {
      this.activeButtonRequesReceived = 'active'
      this.titleHeader = 'Solicitudes recibidas'
      this.URLactualBool = true
    } else if (URLactual.pathname === '/networking-request-send') {
      this.activeButtonRequesSend = 'active'
      this.titleHeader = 'Solicitudes envíadas'
      this.URLactualBool = true
    } else {
      this.titleHeader = 'Explorar'
      this.URLactualBool = false
    }
  }
}
</script>

<style scoped>
.text-badge {
  font-size: 0.7rem !important;
}

.text-networkint-title {
  font-weight: 600;
}

.bi-search {
  font-weight: bold !important;
  color: #00000094;
}

.bi-person-plus {
  color: #00000094;
}

.bi-people {
  color: #00000094;
}

.bi-send {
  color: #00000094 !important;
}

.bi-people.active {
  color: #AA47BC !important;
}

.bi-send.active {
  color: #AA47BC !important;
}

.bi-person-plus.active {
  color: #AA47BC !important;
}


</style>