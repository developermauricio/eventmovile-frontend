<template>
  <div>
    <div class="container">
      <div class="offcanvas offcanvas-bottom p-2" id="modalSearchNetworking" tabindex="-1"
           aria-labelledby="offcanvasBottomLabel">

        <div class="header-content position-relative d-flex align-items-center justify-content-between">
          <!-- Back Button -->
          <div class="back-button" data-bs-dismiss="offcanvas">
            <svg class="bi bi-arrow-left-short icon-back" width="32" height="32" viewBox="0 0 16 16" fill="currentColor"
                 xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                    d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"></path>
            </svg>
          </div>
          <!-- Page Title -->
          <div class="page-heading">
            <h6 class="mb-0 position-relative text-center fw-bold">Busqueda</h6>
          </div>
          <div class="setting-wrapper">
            <div class="setting-trigger-btn" id="settingTriggerBtn">
            </div>
          </div>
        </div>

        <!-- Offcanvas Body -->
        <div class="offcanvas-body p-1">
          <div class="chat-search-box pt-1 pb-4">
            <form action="#">
              <div class="input-group"><span class="input-group-text" id="searchbox"><i class="bi bi-search"></i></span>
                <input class="form-control" v-model="searchQuery" type="search" placeholder="Buscar..."
                       aria-describedby="searchbox">
              </div>
            </form>
          </div>
          <div class="icon-search-center" v-if="!searchQuery">
            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="currentColor"
                 class="bi bi-person-fill" viewBox="0 0 16 16">
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            </svg>
          </div>
          <ul class="ps-0 chat-user-list">
            <!-- Single Chat User -->
            <li class="p-3" v-for="user in filteredResources" :key="user.id">
              <a class="d-flex" href="#">
                <!-- Thumbnail -->
                <div data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottomProfileNetworking"
                     aria-controls="offcanvasBottomProfileNetworking" class="chat-user-thumbnail me-3 shadow">
                  <img class="img-circle" :src="user.picture" alt="">
                </div>
                <!-- Info -->
                <div data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottomProfileNetworking"
                     aria-controls="offcanvasBottomProfileNetworking" class="chat-user-info">
                  <h6 class="text-truncate mb-0">{{ user.name }}</h6>
                  <div class="last-chat">
                    <p class="mb-0 text-truncate">{{ user.company }}</p>
                  </div>
                </div>
              </a>
              <!-- Options -->
              <div class="dropstart chat-options-btn">
                <button class="btn dropdown-toggle" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"
                       class="bi bi-person-plus style-color-icon" viewBox="0 0 16 16">
                    <path
                        d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                    <path fill-rule="evenodd"
                          d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                  </svg>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Profile/>
  </div>
</template>

<script>

import {defineAsyncComponent} from "vue";

export default {
  name: "Search",
  components: {
    Profile: defineAsyncComponent(() => import(/* webpackChunkName: "Profile"*/ '@/modules/client/pages/networking/components/Profile')),
  },
  data() {
    return {
      searchQuery: '',
      items: [
        {
          id: 1,
          name: 'Mauricio Gutierrez',
          company: 'Creategicalatina',
          picture: '/assets/img/avatars/perfil-men.jpg'
        },
        {
          id: 2,
          name: 'Rodinson Tombe',
          company: 'Creategicalatina',
          picture: '/assets/img/avatars/perfil-men.jpg'
        },
        {
          id: 3,
          name: 'Felipe Gonzales',
          company: 'Creategicalatina',
          picture: '/assets/img/avatars/perfil-men.jpg'
        },
        {
          id: 4,
          name: 'Maria Elizabeth Yanez',
          company: 'Starbucks',
          picture: '/assets/img/avatars/perfil-women.jpg'
        },
      ]
    }
  },
  computed: {
    filteredResources() {
      if (this.searchQuery) {
        console.log('buscando...')
        return this.items.filter((item) => {
          this.iconSearch = false
          return item.name.toLowerCase().includes(this.searchQuery) || item.company.toLowerCase().includes(this.searchQuery);
        })
      } else {
        return [];
      }
    }
  }
}
</script>

<style scoped>
.offcanvas-bottom {
  height: 100% !important;
}

.chat-user-list {
  box-shadow: none !important;
}

.icon-search-center {
  margin: auto;
  display: table;
  position: relative;
}

.icon-search-center .bi-person-fill {
  margin: 0;
  color: #acacac66 !important;
  top: 50%;
  -ms-transform: translateY(150%);
  transform: translateY(150%);
}

.last-chat p {
  color: #00000094 !important;
}
</style>