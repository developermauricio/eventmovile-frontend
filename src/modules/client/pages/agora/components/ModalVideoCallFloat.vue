<template>
  <div :class="{'show': showModal}" class="offcanvas offcanvas-bottom modal-canvas-video-call"
       :style="{'visibility' : showModal ? 'visible' : 'hidden'}" id="">
    <!-- Close Button -->
    <button @click="closeModal()" class="btn-close text-reset btn-close-video-call" id="close-modal-video-call" type="button"></button>
    <!-- Offcanvas Body -->
    <div class="offcanvas-body">
      <VideoCall ref="userJoin" v-on:aceptRequestVideoCall="aceptVideoCall" @cancelVideoCall="cancelVideoCall" @userDesconnected="endVideoCall" @endVideoCall="endVideoCall" :guest="guestUser"/>
    </div>
  </div>
  <audio src="/assets/audio/sonido-llamada-saliente.mp3" id="eventAudioCall"></audio>
  <div @click="closeModal()" :class="{'show': showModal, 'hidd': showModal}" class="offcanvas-backdrop fade"
       style="display: none"></div>
  <ToastAlert ref="toast"/>
</template>

<script>
import VideoCall from "../VideoCall";
import {createNotification} from "@/plugins/notification.js";
import {publishMQTT} from "@/plugins/mqtt";
import {onMounted, ref, watch} from "vue";
import ToastAlert from "@/modules/client/shared/components/ToastAlert";

export default {
  name: "ModalVideoCallFloat",
  components: {
    VideoCall,
    ToastAlert
  },
  emits: ["closeModalReceivedCall"],
  props: ['guestUser'],
  setup() {
    let showModal = ref(false)
    let audioCall = ref(false)
    let userId = ref(null)
    let timoutCancel = ref(null)
    const userJoin = ref(null)
    const toast = ref(null)

    const openModal = (data, userIdNotification) => {

      setTimeout(() => {
        showModal.value = true
        audioCall.value = true
        userId.value = userIdNotification
        playAudio()
        userJoin.value.userJoinVideoCall(data)
        // cancelVideoCall()
      }, 100)

    }

    const endVideoCall = () =>{
      showModal.value = false
      audioCall.value = false
      document.querySelectorAll('.btn-close-video-call').forEach(element => element.click());

    }

    const aceptVideoCall = () => {
      audioCall.value = false
      clearTimeout(window.timoutCancel);
      let buttonAudio = document.getElementById('eventAudioCall');
      buttonAudio.getAttribute('src')
      buttonAudio.pause()
      // cancelVideoCall()
    }

    const closeModal = () => {
      showModal.value = false
    }

    const playAudio = () => {
      let buttonAudio = document.getElementById('eventAudioCall');
      buttonAudio.getAttribute('src')
      buttonAudio.play()
      if (window.timoutCancel){
        clearTimeout(window.timoutCancel);
      }
      window.timoutCancel = setTimeout(() => {
        audioCall.value = false
        sendNotificationCallCanceled()
        closeVideoCall()
      }, 10000)

    }

    const cancelVideoCall = async () => {

      clearTimeout(window.timoutCancel);
      let buttonAudio = document.getElementById('eventAudioCall');
      buttonAudio.getAttribute('src')
      buttonAudio.pause()
      showModal.value = false
      audioCall.value = false
      // document.getElementById('close-modal-video-call').click()
      document.querySelectorAll('.btn-close-video-call').forEach(element => element.click());
      toast.value.toastAlertError('Llamada rechazada')
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
      let buttonAudio = document.getElementById('eventAudioCall');
      buttonAudio.getAttribute('src')
      buttonAudio.pause()
      setTimeout(() => {
        let datacloseVideoCall = false
        publishMQTT('nw_close_video_call', datacloseVideoCall)
        userJoin.value.leaveEvent()
        toast.value.toastAlertError('No disponible')
      }, 1000)
    }

    onMounted(() => {

      watch(audioCall, (v) => {
        console.log('EL VALOR DE ', v)
        if (v === false) {

          // closeVideoCall()

        } else {
          // let buttonAudio = document.getElementById('eventAudioCall');
          // buttonAudio.getAttribute('src')
          // buttonAudio.pause()
        }

      })
    })

    return {
      showModal, audioCall, userId, userJoin, timoutCancel, toast, openModal,
      closeModal, playAudio, cancelVideoCall, endVideoCall,
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

.offcanvas-body{
  padding: 0 !important;
}

</style>