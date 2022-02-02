<template>
  <div>
    <div class="container">
      <div class="offcanvas offcanvas-bottom p-2" id="modalSearchNetworking" tabindex="-1" aria-labelledby="offcanvasBottomLabel">

        <div class="header-content position-relative d-flex align-items-center justify-content-between">
          <!-- Back Button -->
          <div class="back-button" data-bs-dismiss="offcanvas">
            <svg class="bi bi-arrow-left-short icon-back" width="32" height="32" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"></path>
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
              <div class="input-group">
                <span class="input-group-text" id="searchbox">
                  <i class="bi bi-search"></i>
                </span>
                <input class="form-control" v-model="searchQuery" type="search" placeholder="Buscar..." aria-describedby="searchbox">
              </div>
            </form>
          </div>

          <!-- Cuando no hay datos -->
          <div v-if="!searchQuery || filteredResources.length === 0" class="icon-search-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            </svg>
          </div>
          
          <ul v-else class="ps-0 chat-user-list">
            <!-- Single Chat User -->
            <li class="p-3" v-for="user in filteredResources" :key="user.user_id">              
              <div @click="clickUserChat(user)" class="d-flex">
                  <!-- Thumbnail -->
                  <div class="chat-user-thumbnail me-3 shadow">
                    <img class="img-circle" :src="user.picture ? user.picture : '/assets/img/avatars/photo-user.png'" alt="Photo user">
                  </div>
                  <!-- Info -->
                  <div class="chat-user-info">
                    <h6 class="mb-0">{{ user.name + ' ' + user.lastname }}</h6>
                    <div class="last-chat">
                      <p class="mb-0">{{ user.empresa ? user.empresa : 'Por definir' }}</p>
                    </div>
                  </div>
                </div>
                <!-- Options solicitud enviada-->
                <div v-if="user.sendRequest" class="dropstart chat-options-btn">
                  <button @click="cancelRequest(user)" class="btn dropdown-toggle" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-circle color-icon" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                </div>
                <!-- Options enviar solicitud-->
                <div v-else class="dropstart chat-options-btn">
                  <button @click="sendRequest(user)" class="btn dropdown-toggle" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-person-plus style-color-icon" viewBox="0 0 16 16">
                      <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                      <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                    </svg>
                  </button>
                </div>     
            </li>
          </ul>          
        </div>
      </div>
    </div>
    
    <Profile ref="modalInfoSearchUserChat"/>
  </div>
</template>

<script>

import {defineAsyncComponent} from "vue";

export default {
  name: "Search",
  components: {
    Profile: defineAsyncComponent(() => import('@/modules/client/pages/networking/components/Profile')),
  },
  data() {
    return {
      searchQuery: '',
      listUserChat: [],
    }
  },
  computed: {
    filteredResources() {
      if ( this.searchQuery ) {
        return this.listUserChat.filter( item => {
          let fullName = item.name.toLowerCase() + ' ' + item.lastname.toLowerCase();
          //return item.name.toLowerCase().includes(this.searchQuery) || item.company.toLowerCase().includes(this.searchQuery);
          return fullName.includes( this.searchQuery.toLowerCase() )
        })
      } else {
        return [];
      }
    }
  },
  methods: {
    clickUserChat( user ) {
      this.$refs.modalInfoSearchUserChat.setInfoUserChat( user )
    },
    sendRequest( user ) {
      user.sendRequest = true
      localStorage.setItem("listUserChat", JSON.stringify(this.listUserChat));
      console.log('aqui se puede conectar al chat... info user: ', user)
    },
    cancelRequest( user ) {
      console.log('cancelar la solicitud...', user)

      this.$swal.fire({
        title: 'Cancelar solicitud',
        text: "¿Está seguro que desea cancelar la solicitud enviada?",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#68976b',
        cancelButtonColor: '#aa47bc',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          user.sendRequest = false
          localStorage.setItem("listUserChat", JSON.stringify(this.listUserChat));
        }
      })
    },
  },
  mounted() {
    this.listUserChat = JSON.parse( localStorage.getItem('listUserChat') ) || []
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

.chat-user-info {
  width: calc(100% - 40px);
}
</style>