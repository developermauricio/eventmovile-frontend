<template>
  <div>
    <div class="container mb-5">
      <div class="card w-100">
        <div class="card-body">
          <ul class="ps-0 chat-user-list">
            <!-- Single Chat User -->
            <li
              class="p-2 chat-unread"
              v-for="user in usersRemaining"
              :key="user.id"
            >
              <a class="d-flex" href="#">
                <!-- Thumbnail -->
                <div
                  class="chat-user-thumbnail me-3 shadow"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasBottomProfileNetworking"
                  aria-controls="offcanvasBottomProfileNetworking"
                >
                  <img
                    class="img-circle"
                    src="/assets/img/avatars/perfil-women.jpg"
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
                  <h6 class="text-truncate mb-0">{{ user.creator.name }}</h6>
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
                  @click="aceptarSolicitud(user)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    class="bi bi-check2"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
                    />
                  </svg>
                </button>
              </div>
              <div class="dropstart chat-options-btn ms-2">
                <button
                  class="btn dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    class="bi bi-three-dots-vertical"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                    />
                  </svg>
                </button>
                <ul class="dropdown-menu" style="">
                  <!--                  <li><a href="#"><i class="bi bi-mic-mute"></i>Mute</a></li>-->
                  <!--                  <li><a href="#"><i class="bi bi-slash-circle"></i>Ban</a></li>-->
                  <li>
                    <a href="#" @click="rechazarSolicitud(user)"
                      ><i class="bi bi-trash"></i>Rechazar</a
                    >
                  </li>
                </ul>
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
  name: "Listrequestreceived",
  components: {
    Profile: defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "Profile"*/ "@/modules/client/pages/networking/components/Profile"
      )
    ),
  },
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    window.axios
      .get("/networking-wa/get-solicitudes")
      .then((resp) => {
        this.users = resp.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  computed: {
    usersRemaining() {
      return this.users.filter((user) => user.status == 0);
    },
  },
  methods: {
    aceptarSolicitud(user) {
      window.axios
        .put("/networking-wa/aceptar-solicitud/" + user.id)
        .then(() => {
          user.status = 1;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    rechazarSolicitud(user) {
      window.axios
        .put("/networking-wa/rechazar-solicitud/" + user.id)
        .then(() => {
          user.status = 2;
        })
        .catch((err) => {
          console.log(err);
        });
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
.bi-check2 {
  color: #00000094 !important;
}
.bi-three-dots-vertical {
  color: #00000094 !important;
}
</style>