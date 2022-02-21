<template>
  <div :class="{'show': showModal}" class="offcanvas offcanvas-bottom modal-canvas-video-call"
       :style="{'visibility' : showModal ? 'visible' : 'hidden'}" id="">
    <!-- Close Button -->
    <button @click="closeModal()" class="btn-close text-reset" type="button"></button>
    <!-- Offcanvas Body -->
    <div class="offcanvas-body">
      <VideoCall ref="userJoin" :guest="guestUser"/>
    </div>
  </div>

  <audio src="/assets/audio/sonido-llamada-saliente.mp3" id="eventAudioCall"></audio>
  <div @click="closeModal()" :class="{'show': showModal, 'hidd': showModal}" class="offcanvas-backdrop fade"
       style="display: none"></div>
</template>

<script>
import VideoCall from "../VideoCall";
import {createNotification} from "@/plugins/notification.js";
import {publishMQTT} from "@/plugins/mqtt";
import {onMounted, ref, watch} from "vue";
import {useIdle} from "@vueuse/core";

export default {
  name: "ModalVideoCallFloat",
  components: {
    VideoCall,
  },
  emits: ["closeModalReceivedCall"],
  props: ['guestUser'],
  setup() {
    let showModal = ref(false)
    let audioCall = ref(false)
    let userId = ref(null)
    const userJoin = ref(null)
    const {idle, lastActive} = useIdle(1 * 60 * 1000) // 5 minutos


    const openModal = (data) => {
      setTimeout(() => {
        showModal.value = true
        userJoin.value.userJoinVideoCall(data)
        // cancelVideoCall()
      }, 200)

    }

    const aceptVideoCall = () => {
      this.audioCall.value = false
      let buttonAudio = document.getElementById('eventAudioCall');
      buttonAudio.getAttribute('src')
      buttonAudio.pause()
      // cancelVideoCall()
    }

    const closeModal = () => {
      showModal.value = !showModal.value;
    }

    const playAudio = (data) => {
      audioCall.value = true
      userId.value = data
      let buttonAudio = document.getElementById('eventAudioCall');
      buttonAudio.getAttribute('src')
      buttonAudio.play()
    }
    const stopAudio = () => {
      audioCall.value = false
    }

    const cancelVideoCall = async () => {

      let buttonAudio = document.getElementById('eventAudioCall');
      buttonAudio.getAttribute('src')
      buttonAudio.pause()
      audioCall.value = false
      showModal.value = false
    }


    const sendNotificationCallCanceled = async () => {
      let user = JSON.parse(localStorage.getItem('user'));
      await createNotification(
          userId.value,
          "Tienes una videollamada perdida ",
          "Recibiste una videollamada de " + user.name + " " + user.lastname,
          "nw_cancel_video_call",
          // JSON.stringify(user)
      );
    }

    const closeVideoCall = () => {

      setTimeout(() => {
        let datacloseVideoCall = false
        publishMQTT('nw_close_video_call', datacloseVideoCall)
      }, 1000)
    }

    onMounted(() => {

      watch(audioCall, (v) => {
        console.log('EL VALOR DE ', v)
        if (v === false) {
          sendNotificationCallCanceled()
          closeVideoCall()
          let buttonAudio = document.getElementById('eventAudioCall');
          buttonAudio.getAttribute('src')
          buttonAudio.pause()
        }else{
          // let buttonAudio = document.getElementById('eventAudioCall');
          // buttonAudio.getAttribute('src')
          // buttonAudio.pause()
        }

      })
      watch(idle, (v) => {
        console.log(v)
        if (v === true && audioCall.value === true) {
          cancelVideoCall()
        }
      })
    })

    return {
      showModal, audioCall, userId, userJoin, lastActive, stopAudio, openModal,
      closeModal, playAudio, cancelVideoCall,
      sendNotificationCallCanceled, closeVideoCall, aceptVideoCall
    }
  }
}
</script>

<style scoped>
.offcanvas-bottom {
  height: 100% !important;
  border-top: none !important;
}

.modal-canvas-video-call {
  background-color: rgba(6, 18, 56, 0.9) !important;
}

</style>