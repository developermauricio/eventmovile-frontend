<template>
  <router-view/>
</template>


<script>
import {useIdle} from "@vueuse/core";
import {onMounted, ref, watch} from "vue";

export default {
  name: 'App',
  setup() {
    const app_idle = ref(false)
    const user = ref({})
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

    const leaving = (e) => {
      user.value = JSON.parse(localStorage.getItem('user') || '{}')
      window.axios.post(`${urlBase}/inactive-online-user/${user.value.id}`).then(response => {
        console.log(response)
      }).catch(err => {
        console.log(err)
      })
      setTimeout(() =>{
        activeOnlineUser()
      },3000)
      e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
      // Chrome requires returnValue to be set
      e.returnValue = "";

      window.alert("Sure to leave?");
    }

    onMounted(() => {

      setTimeout(() =>{
        window.addEventListener(
            "beforeunload",
            leaving
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
    })
    return {app_idle, lastActive, urlBase, user, inactiveOnlineUser, activeOnlineUser, leaving}
  },
  data() {
    return {
      animationName: 'slide-left',
    }
  },

  components: {},
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
