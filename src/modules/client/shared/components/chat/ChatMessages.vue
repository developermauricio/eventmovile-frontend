<template>
  <div class="page-content-wrapper pb-2" id="chat-wrapper">

      <div class="chat-content-wrap" id="chat-global-event">
        <!-- Single Chat Item -->
        <div class="single-chat-item"  v-for="(messages, index) in allMessagesChat" :key="index">

          <!-- User Avatar -->
          <div v-if="messages.pic === null" class="user-avatar mt-1 me-3">
            <div class="content-first-letter">
              <span class="user-first-letter">{{ (messages.name || "").slice(0, 1) }}</span>
            </div>

          </div>
          <div v-else class="user-avatar mt-1 me-3">
            <img :src="urlPicture+messages.pic" alt="">
          </div>
          <!-- User Message -->
          <div class="user-message">
            <div class="message-content pb-1">
              <div class="single-message">
                <h6>{{ messages.name }}</h6>
                <p>{{ messages.message }}</p>
              </div>
            </div>
            <!-- Time and Status -->
            <div class="message-time-status mt-1">
              <div class="sent-time">{{ $dayjs(messages.created_at).format("hh:mm:a") }}</div>
            </div>
          </div>
          <hr>
        </div>
      </div>
  </div>
  <div class="chat-footer">
    <div class="container h-100">
      <div class="chat-footer-content h-100 d-flex align-items-center">
        <form action="#">
          <!-- Message -->
          <input class="form-control" v-model="inputMessage" type="text" placeholder="Deja tu mensaje...">
          <!-- Send -->
          <button class="btn btn-submit" @click.prevent="setMessageChat">
            <svg class="bi bi-cursor" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                 viewBox="0 0 16 16">
              <path
                  d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103zM2.25 8.184l3.897 1.67a.5.5 0 0 1 .262.263l1.67 3.897L12.743 3.52 2.25 8.184z"></path>
            </svg>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {onBeforeMount, onMounted, ref} from "vue";
import {publishMQTT, subscriberMQTT} from "@/plugins/mqtt";
import {postSendRequest} from "@/utils/using-axios"
import VueScrollTo from "vue-scrollto";

export default {
  name: "ChatMessages",
  setup() {

    const idEvent = ref()
    const urlPicture = process.env.VUE_APP_API_URL_FILES
    const urlServer = process.env.VUE_APP_API_URL
    const inputMessage = ref(null)
    const allMessagesChat = ref([])
    const page = ref(1)
    const lastpage = ref(1)


    const getMessagesChat = async (data) => {
      console.log(data)
      setTimeout(() =>{
        window.axios.get(`${urlServer}/eventChat/${idEvent.value}?page=${page.value}`).then( res =>{
          allMessagesChat.value = res.data.data.reverse()
          lastpage.value = res.data.last_page
        }).catch(err =>{
          console.log(err)
        })
      })
    }

    const mqttGetMessageChat = () => {
      let key = 'chat_activity_2102503190'
      const topic = 'eventmovil/' + idEvent.value + '/chat';
      subscriberMQTT(key, topic, getMessagesChat)
    }

    const scroll = () => {
      let el = document.getElementById('chat-wrapper');
      el.addEventListener('scroll', function (event) {
        if (event.target.scrollTop === 0) {
alert('holas')
          setTimeout(() => {
            page.value = page.value + 1
            window.axios.get(`${urlServer}/eventChat/${idEvent.value}?page=${page.value}`).then(res => {
              res.data.data.map(item => {
                allMessagesChat.value.unshift(item)
              })
            }).catch(err => {
              console.log('Error ', err);
            })
          }, 10)
        }
      }, false);
    }

    const setMessageChat = async () => {
      if (!inputMessage.value || !inputMessage.value.trim() ) {
        return
      }
      const data = new FormData();
      data.append("message", inputMessage.value);
      data.append("event_id", idEvent.value);

      const sendMessage = postSendRequest(`/eventChat`, data)

      if (sendMessage) {
        sendMessage.then(res => {
          console.log(res)
          const topic = 'eventmovil/' + idEvent.value + '/chat';
          let user = JSON.parse(localStorage.getItem('user'))
          console.log(user)
          let params_1 = {
            message: inputMessage.value,
            lastname: user.lastname,
            name: user.name,
            pic: user.pic,
            user_id: user.id,
            created_at: res.data.created_at
          }
          inputMessage.value = ''
          allMessagesChat.value.push(params_1)
          publishMQTT(topic, JSON.stringify(params_1))
          toBottom()
        }).catch(err => {
          console.log(err)
        })
      }
    }

    const toBottom = () => {
      const options = {
        container: "body",
        easing: "linear"
      };
      VueScrollTo.scrollTo('#chat-wrapper', 1000, options);
    }

    onBeforeMount(() =>{
      idEvent.value = localStorage.getItem('eventId')
      getMessagesChat()
    })
    onMounted(() => {
      scroll()
      mqttGetMessageChat()
    })
    return {
      idEvent,
      lastpage,
      urlPicture,
      inputMessage,
      allMessagesChat,
      mqttGetMessageChat,
      getMessagesChat,
      setMessageChat,
      toBottom,
      scroll
    }
  }
}
</script>

<style scoped>
.marg-top {
  margin-top: -18px;
}
.single-chat-item .user-avatar{
  background-color: transparent !important;
}

.style-input {
  border-radius: 0 !important;
  padding-left: 3rem;
}

.style-icon {
  left: 25px;
  position: absolute;
  z-index: 9;
  color: #9187b0;
}
</style>