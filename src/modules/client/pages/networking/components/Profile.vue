<template>
  <div>
    <div :class="{'show': showModal}"  class="offcanvas offcanvas-bottom modal-canvas-info-user" :style="{'visibility' : showModal ? 'visible' : 'hidden'}">
      <!-- Close Button -->
      <!-- <button @click="closeModal()" class="btn-close text-reset" type="button"></button> -->
      <!-- Offcanvas Body -->
      <div class="offcanvas-body p-4">
        <div class="row">
          <div class="col-12 align-items-center text-center">
            <div class="div-content-photo">
              <div class="second-content">
                <img v-if="userChat.pic" class="img-circle" :src="userChat.pic ? urlBaseFile + userChat.pic : '/assets/img/avatars/photo-user.png'" width="100" alt="Photo user">
                <div v-else class="content-first-letter m-auto">
                  <span class="user-first-letter">{{ ( userChat.name || "").slice(0, 1) }} </span>
                </div>
                <div class="div-content-status">
                  <span class="active-status" v-if="userChat.online === '1'"></span>
                </div>
              </div>
            </div>

            <h6 class="mt-3 m-0">{{ userChat.name + ' ' + userChat.lastname }}</h6>
            <p class="m-0">{{ userChat.empresa ? userChat.empresa : 'Por definir' }}</p>
          </div>
        </div>
        <div class="container">
          <div class="row mt-2">
            <div class="col-12">
              <p style="text-align: justify">{{ userChat.user_description ? userChat.user_description : ''}} </p>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-6">
              <a @click="closeModal()" class="btn m-1 btn-lg btn-light" href="#">CERRAR</a>
            </div>

            <div class="col-6">
              <!-- Solicitud enviada -->
              <router-link v-if="userChat.request_sent && userChat.request_sent.status == 0" to="/networking-request-send" class="btn m-1 btn-lg btn-primary float-end">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-person-plus" viewBox="0 0 16 16">
                  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                  <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                </svg> 
                Solicitud enviada
              </router-link>

              <!-- Solicitudes recibidas o ver contactos -->
              <router-link v-else-if="userChat.request_received" :to="(userChat.request_received.status == 0) ? '/networking-request-received' : '/networking-contacts'" class="btn m-1 btn-lg btn-primary float-end">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-person-plus" viewBox="0 0 16 16">
                  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                  <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                </svg> 
                {{ userChat.request_received.status == 0 ? 'Solicitudes recibidas' : 'Ver contáctos' }}
              </router-link>

              <!-- Proceso de enviar una solicitud -->
              <a v-else @click="connectToChat" class="btn m-1 btn-lg btn-primary float-end" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-person-plus" viewBox="0 0 16 16">
                  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                  <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                </svg> 
                Enviar solicitud
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div @click="closeModal()" :class="{'show': showModal, 'hidd': showModal}" class="offcanvas-backdrop fade" style="display: none"></div>
</template>

<script>
import {createNotification} from "@/plugins/notification.js";

export default {
  name: "Profile",
  data() {
    return {
      showModal: false,
      urlBaseFile: process.env.VUE_APP_API_URL_FILES,
      userChat: {},
      eventID: 0,
    }
  },
  methods: {
    setInfoUserChat( data, event ) {
      this.userChat = data
      this.eventID = event
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
    connectToChat() {
      const data = {
        guest: this.userChat.id,
        event: this.eventID,
      };

      window.axios.post("/networking-wa/send-solicitud", data)
        .then( (response) => {
          console.log('resp.. ', response)          
          createNotification(
              data.guest,
              "Nueva Solicitud",
              "Has recibido una nueva solicitud",
              "nw_new_request"
          );
          setTimeout(() => {
            this.showModal = false;
            this.$router.push({name: 'Networking'})
          }, 500);
        })
        .catch((err) => {
          console.log(err);
          alert('Lo sentimos a ocurrido un error al momento de enviar la solicitud.')
          this.showModal = false;
          this.$router.push({name: 'Networking'})
        });
    }
  },
}
</script>

<style scoped>
.div-content-photo {
  display: flex;
  justify-content: center;
  margin-bottom: 1.2rem;
}
.div-content-status {
  margin-top: -14px;
  margin-right: -20px;
}
.active-status{
  position: absolute;
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  border: 2px solid #ffffff;
  background-color: #2ecc4a;
}
.content-first-letter {
  width: 70px;
  height: 70px;
}

span.user-first-letter {
  font-size: 2rem;
}

.modal-canvas-info-user {
  height: 40%;
  border-radius: 30px 30px 0 0;
  z-index: 1048;
}
.hidd {
  display: block !important;
  z-index: 1046;
}
.btn-light{
  width: 100% !important;
}
.btn-primary{
  width: 100% !important;
}
</style>