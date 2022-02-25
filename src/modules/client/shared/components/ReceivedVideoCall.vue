<template>
  <div>
    <div :class="{'screen-active': showModal}" class="video-calling-popup-wrap">
      <div class="video-calling-popup-body bg-content">
        <!-- User Thumbnail -->
        <div class="user-video-call">
          <img v-if="user.img" :src="user.value.img ? user.img : '/assets/img/avatars/photo-user.png'" width="70" height="70"
               alt="Photo user"/>
          <!--        <div v-else class="content-first-letter">-->
          <!--          <span class="user-first-letter">{{ getFirstName }} </span>-->
          <!--        </div>-->
        </div>
        <!-- Video Icon -->
        <div class="video-icon d-block mb-1">
          <svg class="bi bi-camera-video text-white" xmlns="http://www.w3.org/2000/svg" width="42" height="42"
               fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175l3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z"></path>
          </svg>
        </div>
        <h6 class="mb-4 text-white"><strong>{{ user.name }} </strong> te esta llamando</h6>
        <!-- Button Group -->
        <div class="button-group">
          <a @click="closePopup" class="btn btn-lg btn-danger btn-round me-3" href="#">Cerrar</a>
          <a @click="doVideoCall" class="btn btn-lg btn-success btn-round ms-3" href="#">Aceptar</a>
        </div>
      </div>
    </div>
    <ModalVideoCallFloat @closeModalReceivedCall="closeVideoCall" :guestUser="user.name" ref="modalVideoCall"/>
  </div>
</template>

<script>
import ModalVideoCallFloat from "@/modules/client/pages/agora/components/ModalVideoCallFloat";
import {subscriberMQTT, publishMQTT} from "@/plugins/mqtt";
import {onMounted, ref} from "vue";

export default {
  name: "ReceivedVideoCall",
  components: {
    ModalVideoCallFloat
  },
  // emits: ["closeModal"],
  setup() {
    let showModal = ref(false)
    const user = ref({})
    const modalVideoCall = ref(null)
    const userJoinVideoCall = ref(false)

    const openPopupVideoCall = (data) => {
      console.log('DATA USER ', data)
      user.value = data || {}
      showModal.value = true
      modalVideoCall.value.dataAgoraNewVideoCall(data.channel, data.token)
      //TODO falta poner la foto o la primer letra del nombre y enviar la notificacion.
    }

    const closePopup = () => {
      showModal.value = false
      // let callRequestCancel = 0
      publishMQTT('nw_acept_request_cancel_video_call', user.value.id)
    }

    const doVideoCall = () => {
      // let callRequest = 1
      // publishMQTT('nw_acept_request_video_call', callRequest)

      showModal.value = false
      userJoinVideoCall.value = true
      modalVideoCall.value.openModal(userJoinVideoCall.value)
      window.modalVideoCallReference = modalVideoCall.value
      modalVideoCall.value.aceptVideoCall()
    }

    const requestVideoCallCancel = ()=>{

      let key = 'aomsiqoilzc'
      let topic = 'nw_close_video_call'
      subscriberMQTT(key, topic, closeVideoCall)
    }

    const closeVideoCall = () => {
      showModal.value = false
    }

    onMounted(() =>{
      requestVideoCallCancel()
    })

    return {showModal, user, userJoinVideoCall, modalVideoCall,openPopupVideoCall,
      closePopup, doVideoCall, closeVideoCall, requestVideoCallCancel
    }
  },
  // data() {
  //   return {
  //     // showModal: false,
  //     // user: {
  //     //   // id: 2,
  //     //   // img: '',
  //     //   // name:  'Rorito Lindo',
  //     //
  //     // }
  //   }
  // },
  // methods: {
  //   // openPopupVideoCall(user) {
  //   //   console.log('DATA USER ',user)
  //   //   this.user = user || {}
  //   //   this.showModal = !this.showModal
  //   //   //TODO falta poner la foto o la primer letra del nombre y enviar la notificacion.
  //   // },
  //   // closePopup(){
  //   //   this.showModal = false
  //   // },
  //   // doVideoCall(){
  //   //   this.showModal = false
  //   //   this.$refs.modalVideoCall.openModal()
  //   // },
  //   // closeVideoCall(data){
  //   //   console.log(data)
  //   //   this.showModal = false
  // }
}
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