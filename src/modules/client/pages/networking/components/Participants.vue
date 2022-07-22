<template>
  <div>
    <div class="container">
      <div class="card w-100">
        <div class="card-body">
          <ul class="ps-0 chat-user-list">
            <li v-if="listUserChat.length === 0">
              No hay usuarios disponibles para este evento.
            </li>

            <!-- Single Chat User -->
            <template v-else>
              <li v-for="user in listUserChat" :key="user.user_id" class="p-1 pt-4 pb-4">
                <div @click="clickUserChat(user)" class="d-flex">
                  <!-- Thumbnail -->
                  <div class="chat-user-thumbnail me-3">
                    <img v-if="user.pic"
                         class="img-circle"
                         :src="user.pic ? urlBaseFile + user.pic : '/assets/img/avatars/photo-user.png'"
                         alt="Photo user"/>

                    <div v-else class="content-first-letter">
                      <span class="user-first-letter">{{ (user.name || "").slice(0, 1) }}</span>
                    </div>
                    <span class="active-status" v-if="user.online === '1'"></span>
                  </div>
                  <!-- Info -->
                  <div class="chat-user-info">
                    <h6 class="text-truncate mb-0">
                      {{ user.name + " " + user.lastname }}
                    </h6>
                    <div class="last-chat">
                      <p class="mb-0 text-truncate">
                        {{ user.name_company ? user.name_company : "Por definir" }}
                      </p>
                    </div>
                  </div>
                </div>
                <!-- Options solicitud enviada-->
                <div
                    v-if="(user.request_sent && user.request_sent.status == 0) || (user.request_received && user.request_received.status == 0)"
                    class="dropstart chat-options-btn">
                  <button @click="cancelRequest(user)"
                          class="btn dropdown-toggle"
                          type="button">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         width="24"
                         height="24"
                         fill="currentColor"
                         class="bi bi-x-circle color-icon"
                         viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                      <path
                          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </button>
                </div>
                <!-- Options enviar solicitud-->
                <div
                    v-else-if="
                    !user.request_received || user.request_received.status !== 1
                  "
                    class="dropstart chat-options-btn"
                >
                  <button
                      v-if="!user.request_sent"
                      @click="sendRequest(user)"
                      class="btn dropdown-toggle"
                      type="button"
                  >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="currentColor"
                        class="bi bi-person-plus style-color-icon"
                        viewBox="0 0 16 16"
                    >
                      <path
                          d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
                      />
                      <path
                          fill-rule="evenodd"
                          d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                      />
                    </svg>
                  </button>
                </div>
                <div v-else class="dropstart chat-options-btn">
                  <button
                      class="btn dropdown-toggle"
                      type="button"
                      @click="showChat(user)"
                  >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="currentColor"
                        class="bi bi-chat-left-text"
                        viewBox="0 0 16 16"
                    >
                      <path
                          d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                      />
                      <path
                          d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
    <!--=====================================
    MODAL INFO PERFIL NETWOKING
   ======================================-->
    <Profile ref="modalInfoUserChat"/>
  </div>
</template>

<script>
import "vuesax/dist/vuesax.css";
import {defineAsyncComponent} from "vue";
import {subscriberMQTT} from "@/plugins/mqtt";
import {createNotification} from "@/plugins/notification.js";

export default {
  name: "Participants",
  components: {
    Profile: defineAsyncComponent(() =>
        import("@/modules/client/pages/networking/components/Profile")
    ),
  },
  data() {
    return {
      eventID: 0,
      listUserChat: [],
      showOnlineUser: false,
      urlBaseFile: process.env.VUE_APP_API_URL_FILES,
    };
  },
  methods: {

    showChat(chat) {
      const user = JSON.parse(localStorage.getItem('user'))

      const data = {
        chat_id: chat.request_received ? chat.request_received.chat_id : chat.request_sent.chat_id,
        id: chat.request_received ? chat.request_received.id : chat.request_sent.id,
        user_id: user.id,
      };

      window.localStorage.setItem("chat", JSON.stringify(data));
      setTimeout(() => {
        this.$router.push({name: "Chat"});
      }, 200);
    },

    clickUserChat(user) {
      this.$refs.modalInfoUserChat.setInfoUserChat(user, this.eventID);
    },
    eliminarSolicitud(user) {
      const loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.containerLoarder,
        canCancel: false,
      });
      const id = user.request_received ? user.request_received.id : user.request_sent.id;
      window.axios
          .delete("/networking-wa/eliminar-solicitud/" + id)
          .then(() => {
            loader.hide();
            user.request_sent = null;
            user.request_received = null;
            /* localStorage.setItem(
                "listUserChat",
                JSON.stringify(this.listUserChat)
            ); */
          })
          .catch((err) => {
            loader.hide();
            console.log(err);
          });
    },
    sendRequest(user) {

      const loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.containerLoarder,
        canCancel: false,
      });


      const data = {
        guest: user.id,
        event: this.eventID,
      };
      window.axios
          .post("/networking-wa/send-solicitud", data)
          .then((response) => {
            user.request_sent = response.data;
            /* localStorage.setItem(
                "listUserChat",
                JSON.stringify(this.listUserChat)
            ); */
            createNotification(
                data.guest,
                "Nueva Solicitud",
                "Alguien quiere conectar contigo",
                "nw_new_request"
            );
            loader.hide();
          })
          .catch((err) => {
            loader.hide();
            console.log(err);
          });
      console.log("aqui se puede conectar al chat... info user: ", user);
    },
    cancelRequest(user) {
      console.log("cancelar la solicitud...", user);
      this.$swal
          .fire({
            title: "Cancelar solicitud",
            text: "¿Está seguro que desea cancelar la solicitud enviada?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#68976b",
            cancelButtonColor: "#aa47bc",
            confirmButtonText: "Si",
            cancelButtonText: "No",
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.eliminarSolicitud(user);
            }
          });
    },
    getListsUserEvent() {
      let loader = null;
      if (this.showOnlineUser === false) {
        loader = this.$loading.show({
          container: this.fullPage ? null : this.$refs.containerLoarder,
          canCancel: false,
        });
      }

      window.axios
          .get(`/networking-wa/get-participants/${this.eventID}`)
          .then((response) => {
            console.log('get data participantes: ', response)
            //this.listUserChat = response.data.data;
            this.listUserChat = response.data;
            /* localStorage.setItem(
                "listUserChat",
                JSON.stringify(this.listUserChat)
            ); */
            if (this.showOnlineUser === false) {
              loader.hide();
            }
          })
          .catch((error) => {
            loader.hide();
            console.log("error... ", error);
          })
    },
    onlineUserSocket() {
      let key = 'notification_online_eventmovil_31231'
      let topic = 'online_users_eventmovil'
      subscriberMQTT(key, topic, this.updateOnlineUser)
    },
    updateOnlineUser(data) {
      console.log(data)
      this.showOnlineUser = true
      setTimeout(() => {
        this.getListsUserEvent()
      }, 2000)

    }
  },
  created() {
  },
  mounted() {
    this.eventID = localStorage.getItem("eventId") || 0;
    /* this.listUserChat = JSON.parse(
        localStorage.getItem("listUserChat") || "[]"
    ); */
    // if (this.listUserChat.length === 0) {
    this.getListsUserEvent();
    // }
    this.onlineUserSocket()
  },
};
</script>

<style scoped>
.chat-user-list {
  box-shadow: none !important;
}

.content-first-letter {
  border: 2px solid #f1f2fb;
  background-color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

span.user-first-letter {
  font-size: 1rem;
  color: #a133b4;
  font-weight: 700;
}

.last-chat p {
  color: #00000094 !important;
}

.chat-user-info {
  width: calc(100% - 40px);
}

.color-icon {
  color: #6b6b6b;
}
</style>