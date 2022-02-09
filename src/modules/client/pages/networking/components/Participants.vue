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
              <li v-for="user in listUserChat" :key="user.user_id" class="p-3">
                <div @click="clickUserChat(user)" class="d-flex">
                  <!-- Thumbnail -->
                  <div class="chat-user-thumbnail me-3 shadow">
                    <img
                      class="img-circle"
                      :src="
                        user.picture
                          ? user.picture
                          : '/assets/img/avatars/photo-user.png'
                      "
                      alt="Photo user"
                    />
                  </div>
                  <!-- Info -->
                  <div class="chat-user-info">
                    <h6 class="text-truncate mb-0">
                      {{ user.name + " " + user.lastname }}
                    </h6>
                    <div class="last-chat">
                      <p class="mb-0 text-truncate">
                        {{ user.empresa ? user.empresa : "Por definir" }}
                      </p>
                    </div>
                  </div>
                </div>
                <!-- Options solicitud enviada-->
                <div v-if="user.sendRequest" class="dropstart chat-options-btn">
                  <button
                    @click="cancelRequest(user)"
                    class="btn dropdown-toggle"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      class="bi bi-x-circle color-icon"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                      />
                      <path
                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </button>
                </div>
                <!-- Options enviar solicitud-->
                <div v-else class="dropstart chat-options-btn">
                  <button
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
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
    <!--=====================================
    MODAL INFO PERFIL NETWOKING
   ======================================-->
    <Profile ref="modalInfoUserChat" />
  </div>
</template>

<script>
import "vuesax/dist/vuesax.css";
import { defineAsyncComponent } from "vue";

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
    };
  },
  methods: {
    clickUserChat(user) {
      this.$refs.modalInfoUserChat.setInfoUserChat(user);
    },
    sendRequest(user) {
      const data = {
        guest: user.user_id,
      };
      window.axios
        .post("/networking-wa/send-solicitud", data)
        .then((user) => {
          user.sendRequest = true;
          localStorage.setItem(
            "listUserChat",
            JSON.stringify(this.listUserChat)
          );
          console.log(user);
        })
        .catch((err) => {
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
            user.sendRequest = false;
            localStorage.setItem(
              "listUserChat",
              JSON.stringify(this.listUserChat)
            );
          }
        });
    },
    getListsUserEvent() {
      this.loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.containerLoarder,
        canCancel: false,
      });

      window.axios
        .get(`usersForEvent/${this.eventID}`)
        .then((response) => {
          this.listUserChat = response.data.data;
          this.listUserChat.map((user) => (user.sendRequest = false));
          localStorage.setItem(
            "listUserChat",
            JSON.stringify(this.listUserChat)
          );
          this.loader.hide();
        })
        .catch((error) => {
          this.loader.hide();
          console.log("error... ", error);
        })
    },
  },
  created() {},
  mounted() {
    this.eventID = localStorage.getItem("eventId") || 0;
    this.listUserChat = JSON.parse(localStorage.getItem("listUserChat")) || [];
    if (this.listUserChat.length === 0) {
      this.getListsUserEvent();
    }
  },
};
</script>

<style scoped>
.chat-user-list {
  box-shadow: none !important;
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