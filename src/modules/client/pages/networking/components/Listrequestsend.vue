<template>
  <div>
    <div class="container mb-5">
      <div class="card w-100">
        <div class="card-body">
          <p class="text-center" v-if="solicitudes.length < 1">Sin solicitudes enviadas</p>
          <ul class="ps-0 chat-user-list">
            <!-- Single Chat User -->
            <li
              class="p-2 chat-unread"
              v-for="(solicitud, index) in solicitudes"
              :key="solicitud.id"
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
                  <h6 class="text-truncate mb-0">
                    {{ solicitud.guest.name }} {{ solicitud.guest.lastname }}
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
                  @click.prevent="removeSolicitud(index)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    class="bi bi-x-circle"
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
  name: "Listrequestsend",
  data() {
    return {
      solicitudes: [],
    };
  },
  components: {
    Profile: defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "Profile"*/ "@/modules/client/pages/networking/components/Profile"
      )
    ),
  },
  mounted() {
    this.eventID = localStorage.getItem("eventId") || 0;
    const loader = this.$loading.show({
      container: this.fullPage ? null : this.$refs.containerLoarder,
      canCancel: false,
    });
    window.axios
      .get(`/networking-wa/get-solicitudes-enviadas?event=${this.eventID}`)
      .then((resp) => {
        loader.hide();
        this.solicitudes = resp.data;
      })
      .catch((err) => {
        loader.hide();
        console.log(err);
      });
  },
  methods: {
    removeSolicitud(index) {
      const solicitud = this.solicitudes[index];

      window.axios
        .delete("/networking-wa/delete-solicitud/" + solicitud.id)
        .then(() => {
          this.solicitudes.splice(index, 1);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(solicitud);
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
.bi-x-circle {
  color: #00000094 !important;
}
.bi-three-dots-vertical {
  color: #00000094 !important;
}
</style>