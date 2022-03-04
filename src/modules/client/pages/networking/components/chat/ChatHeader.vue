<template>
  <!-- Header Area -->
  <div class="header-area" id="headerArea">
    <div class="container">
      <!-- Header Content -->
      <div
          class="
          header-content
          position-relative
          d-flex
          align-items-center
          justify-content-between
        "
      >
        <!-- Chat User Info -->
        <chat-header-info-user :chat-info="chatInfo"/>
        <!-- Call & Video Wrapper -->
        <chat-header-options @openCallVideo="openCallVideo"/>
      </div>
    </div>
    <ToastAlert ref="toast"/>
  </div>
</template>

<script>
import ChatHeaderInfoUser from "./ChatHeaderInfoUser.vue";
import ChatHeaderOptions from "./ChatHeaderOptions.vue";
import ToastAlert from "@/modules/client/shared/components/ToastAlert";
import {ref, toRefs} from "vue";

export default {
  name: "ChatHeader",
  components: {
    ChatHeaderInfoUser,
    ChatHeaderOptions,
    ToastAlert
  },
  props: {
    chatInfo: {
      type: Object,
      required: true,
    },
  },
  setup(props, {emit}) {
    let avalaibleUser = ref(null)
    const toast = ref(null)
    let {chatInfo: dataChatInfo} = toRefs(props)

    const openCallVideo = () => {
      setTimeout(() => {
        window.axios.get('/user-call-available/' + dataChatInfo.value.user_id).then(response => {
          console.log(response.data)
          // emit('openCallVideo', dataChatInfo)
          if (response.data === "0") {
            emit('openCallVideo', dataChatInfo)
          } else {
            toast.value.toastAlertError('No disponible, tal actualmente esta en otra llamada, intente llamar mas tarde')
          }
        }).catch(err => {
          console.log(err)
        })
      }, 500)

    }
    return {
      avalaibleUser, toast, openCallVideo
    }
  },
};
</script>
