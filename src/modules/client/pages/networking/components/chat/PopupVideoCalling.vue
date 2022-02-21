<template>
  <div>
    <div :class="{'screen-active': showModal}" class="video-calling-popup-wrap">
      <div class="video-calling-popup-body bg-content">
        <!-- User Thumbnail -->
        <div class="user-video-call">
          <img v-if="user.img" :src="user.img ? user.img : '/assets/img/avatars/photo-user.png'" width="70" height="70"
               alt="Photo user"/>
          <div v-else class="content-first-letter">
            <span class="user-first-letter">{{ getFirstName }} </span>
          </div>
        </div>
        <!-- Video Icon -->
        <div class="video-icon d-block mb-1">
          <svg class="bi bi-camera-video text-white" xmlns="http://www.w3.org/2000/svg" width="42" height="42"
               fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175l3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z"></path>
          </svg>
        </div>
        <h6 class="mb-4 text-white">Hacer una videollamada a <strong>{{ user.name }}</strong></h6>
        <!-- Button Group -->
        <div class="button-group">
          <a @click="closePopup" class="btn btn-lg btn-danger btn-round me-3" href="#">Cerrar</a>
          <a @click="doVideoCall" class="btn btn-lg btn-success btn-round ms-3" href="#">Aceptar</a>
        </div>
      </div>
    </div>
    <ModalVideoCallFloat :guestUser="user.name" ref="modalVideoCall"/>
  </div>
</template>

<script>
// import {createNotification} from "@/plugins/notification.js";
import {publishMQTT} from "@/plugins/mqtt";
import ModalVideoCallFloat from "@/modules/client/pages/agora/components/ModalVideoCallFloat";
export default {
  name: "PopupVideoCalling",
  components:{
    ModalVideoCallFloat
  },
  data() {
    return {
      showModal: false,
      audio: false,
      user: {},
      dataUserGuest: {},
      userJoinVideoCall: false
    }
  },
  computed: {
    getFirstName() {
      return (this.user.name || "").slice(0, 1);
    }
  },
  methods: {
    openPopupVideoCall(user) {
      this.user = user || {}
      this.showModal = !this.showModal
      //TODO falta poner la foto o la primer letra del nombre y enviar la notificacion.
    },
    closePopup() {
      this.showModal = false
    },
    async doVideoCall() {
      this.showModal = false
      const currentUser = JSON.parse(localStorage.getItem('user'))

      let dataUserSendVideoCall = {
        idUserGuest: this.user.user_id,
        id: currentUser.id,
        name: currentUser.name + ' ' + currentUser.lastname,
        img: currentUser.pic
      }
      // ABRIMOS LA MODAL DE LA SOLICITUD DE LLAMADA QUE SE ENCUENTRE EN EL App.vue
      await publishMQTT('nw_new_video_call', JSON.stringify(dataUserSendVideoCall))
      //AQUI ABRIMOS LA MODAL DE LA VIDEO LLAMADA CON EL AUDIO EN ESPERA QUE CONTESTEN
      this.userJoinVideoCall = true
      this.$refs.modalVideoCall.openModal(this.userJoinVideoCall)
      this.$refs.modalVideoCall.playAudio(this.user.user_id)
      // await createNotification(
      //     this.user.user_id,
      //     "Nueva solicitud videollamada",
      //     "Has recibido una nueva solicitud",
      //     "nw_new_video_call"
      // );
      // revisar que no sirve el router
      //this.$router.push({name: "VideoCall", params: {user: this.userName}})
      // setTimeout(() => {
      //   window.location = '/video-call'
      // }, 1000);
    },

  },
  mounted() {

  }
};
</script>

<style scoped>
.bg-content {
  background-color: #444d6a;
  border-radius: 20px;
}

.user-video-call {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.content-first-letter {
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
</style>
