<template>
  <div class="add-new-contact-wrap button-fload-call" v-if="shoButtonFloat">
    <a class="shadow icon-font-call">
      <i class="bi bi-qr-code"></i>
      <img width="45" src="/assets/img/icon-call.gif" alt="">
    </a>
  </div>
  <ReceivedVideoCall ref="modal"/>
  <router-view/>

</template>


<script>
import {useIdle} from "@vueuse/core";
import {onMounted, ref, watch} from "vue";
import {subscriberMQTT} from "@/plugins/mqtt";

import ReceivedVideoCall from "@/modules/client/shared/components/ReceivedVideoCall"

export default {
  name: 'App',
  setup() {
    const shoButtonFloat = ref(false)
    const app_idle = ref(false)
    const user = ref({})
    const modal = ref(null)
    const urlBase = process.env.VUE_APP_API_URL
    const {idle, lastActive} = useIdle(1 * 60 * 1000) // 5 minutos

    const inactiveOnlineUser = () => {
      user.value = JSON.parse(localStorage.getItem('user') || '{}')
      window.axios.post(`${urlBase}/inactive-online-user/${user.value.id}`).then(response => {
        console.log(response)
      }).catch(err => {
        console.log(err)
      })
    }

    const activeOnlineUser = () => {
      user.value = JSON.parse(localStorage.getItem('user') || '{}')
      window.axios.post(`${urlBase}/active-online-user/${user.value.id}`).then(response => {
        console.log(response)
      }).catch(err => {
        console.log(err)
      })
    }

    const closeWindows = (e) => {
      user.value = JSON.parse(localStorage.getItem('user') || '{}')
      window.axios.post(`${urlBase}/inactive-online-user/${user.value.id}`).then(response => {
        console.log(response)
      }).catch(err => {
        console.log(err)
      })
      setTimeout(() => {
        activeOnlineUser()
      }, 3000)
      e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
      // Chrome requires returnValue to be set
      e.returnValue = "";

      window.alert("Sure to leave?");
    }

    const notificationVideoCall = () => {
      let key = 'notification_video_call_12121312312'
      let topic = 'nw_new_video_call'
      subscriberMQTT(key, topic, openModalVideoCall)
    }

    const openModalVideoCall = (data) => {
      console.log('Video llamada entrante', data)
      let userGuest = JSON.parse(data)

      if (userGuest.idUserGuest === user.value.id) {
        setTimeout(() => {
          modal.value.openPopupVideoCall(JSON.parse(data))
        }, 500)
      }

    }

    onMounted(() => {

      setTimeout(() => {
        window.addEventListener(
            "beforeunload",
            closeWindows
        );
      }, 1000)

      watch(idle, (v) => {
        console.log(v)
        if (idle.value === true) {
          inactiveOnlineUser()
        } else {
          activeOnlineUser()
        }
      })
      activeOnlineUser()
      notificationVideoCall()
    })
    return {
      app_idle, lastActive, urlBase, user, modal, shoButtonFloat,
      inactiveOnlineUser, activeOnlineUser, closeWindows,
      notificationVideoCall, openModalVideoCall
    }
  },
  data() {
    return {
      animationName: 'slide-left',
    }
  },

  components: {
    ReceivedVideoCall
  },
  watch: {
    '$route'(to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.animationName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  },
}
</script>

<style>
.icon-font-call{
  display: flex;
  align-items: center;
  justify-content: center;
}
.button-fload-call a{
  background-color: #ffffff !important;
  right: 0px !important;
  left: 20px !important;
}
#app {
  font-family: 'Montserrat', sans-serif;
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.slide-leave-active,
.slide-enter-active {
  transition: .3s;
}

.slide-enter {
  transform: translate(100%, 0);
}

.slide-leave-to {
  transform: translate(-100%, 0);
}
</style>
