<template>
  <div>
    <div class="container mb-5">
      <div class="card w-100">
        <div class="card-body">
          <ul class="ps-0 chat-user-list">
            <!-- Single Chat User -->
            <li class="p-3" v-for="chat in chats" :key="chat.id">
              <a class="d-flex" href="#">
                <!-- Thumbnail -->
                <div
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasBottomProfileNetworking"
                  aria-controls="offcanvasBottomProfileNetworking"
                  class="chat-user-thumbnail me-3 shadow"
                >
                  <img
                    class="img-circle"
                    src="/assets/img/avatars/perfil-men.jpg"
                    alt=""
                  />
                </div>
                <!-- Info -->
                <div
                  class="chat-user-info"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasBottomProfileNetworking"
                  aria-controls="offcanvasBottomProfileNetworking"
                >
                  <h6 class="text-truncate mb-0">
                    {{ chat.user.name }} {{ chat.user.lastname }}
                  </h6>
                  <div class="last-chat">
                    <p class="mb-0 text-truncate">por definir</p>
                  </div>
                </div>
              </a>
              <!-- Options -->
              <div class="dropstart chat-options-btn">
                <button
                  class="btn dropdown-toggle"
                  type="button"
                  @click="showChat(chat)"
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
          </ul>
        </div>
      </div>
    </div>
    <!--=====================================
    MODAL INFO PERFIL NETWOKING
   ======================================-->
    <Profile />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "Listcontacts",
  components: {
    Profile: defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "Profile"*/ "@/modules/client/pages/networking/components/Profile"
      )
    ),
  },
  data() {
    return {
      chats: [],
    };
  },
  mounted() {
    window.axios
      .get("/networking-wa/chats-user")
      .then((resp) => {
        this.chats = resp.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    showChat(chat) {
      const user_id =
        chat.user.id == chat.creator_id ? chat.guest_id : chat.creator_id;

      const data = {
        chat_id: chat.chat_id,
        id: chat.id,
        user_id: user_id,
      };

      window.localStorage.setItem("chat", JSON.stringify(data));
      setTimeout(() => {
        this.$router.push({ name: "Chat" });
      }, 200)
    },
  },
};
</script>

<style scoped>
.chat-user-list {
  box-shadow: none !important;
}
.bi-chat-left-text {
  color: #aa47bc !important;
}
.last-chat p {
  color: #00000094 !important;
}
</style>