<template>
  <div>
    <div :class="{'show': showModal}"  class="offcanvas offcanvas-bottom modal-canvas-info-user" :style="{'visibility' : showModal ? 'visible' : 'hidden'}">
      <!-- Close Button -->
      <!-- <button @click="closeModal()" class="btn-close text-reset" type="button"></button> -->
      <!-- Offcanvas Body -->
      <div class="offcanvas-body p-4">
        <div class="row">
          <div class="col-12 align-items-center text-center">
            <img v-if="userChat.picture" class="img-circle" :src="userChat.picture ? userChat.picture : '/assets/img/avatars/photo-user.png'" width="100" alt="Photo user">
            <div v-else class="content-first-letter m-auto">
              <span class="user-first-letter">{{ ( userChat.name || "").slice(0, 1) }} </span>
            </div>
            <span class="active-status" v-if="userChat.online === '1'"></span>
            <h6 class="mt-2 m-0">{{ userChat.name + ' ' + userChat.lastname }}</h6>
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
              <a @click="connectToChat()" class="btn m-1 btn-lg btn-primary float-end" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-person-plus" viewBox="0 0 16 16">
                  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                  <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                </svg> 
                Conectar
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
export default {
  name: "Profile",
  data() {
    return {
      showModal: false,
      urlBaseFile: process.env.VUE_APP_API_URL_FILES,
      userChat: {},
    }
  },
  methods: {
    setInfoUserChat( data ) {
      this.userChat = data
      this.showModal = true
    },
    // showChat(chat) {
    //   const user_id =
    //       chat.user.id == chat.creator_id ? chat.guest_id : chat.creator_id;
    //
    //   const data = {
    //     chat_id: chat.chat_id,
    //     id: chat.id,
    //     user_id: user_id,
    //   };
    //
    //   window.localStorage.setItem("chat", JSON.stringify(data));
    //   setTimeout(() => {
    //     this.$router.push({name: "Chat"});
    //   }, 200);
    // },

    closeModal() {
      this.showModal = false
    },
    connectToChat() {
      console.log('aqui se puede conectar al chat desde el perfil...')
    }
  },
}
</script>

<style scoped>
.active-status{
  position: absolute;
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  /*bottom: 1px;*/
  /*right: 0;*/
  border: 2px solid #ffffff;
  background-color: #2ecc4a;
}
.content-first-letter {
  border: 2px solid #f1f2fb;
  background-color: white;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

span.user-first-letter {
  font-size: 2rem;
  color: #a133b4;
  font-weight: 700;
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