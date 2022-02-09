<template>
  <!-- <button @click="crearTest">Create new</button> -->
  <div class="setting-trigger-btn" @click.prevent="openModal">
    <svg
      class="bi bi-bell"
      width="18"
      height="18"
      viewBox="0 0 16 16"
      fill="url(#gradientSettings)"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="gradientSettings"
          spreadMethod="pad"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0" style="stop-color: #000000; stop-opacity: 1"></stop>
          <stop
            offset="100%"
            style="stop-color: #767676; stop-opacity: 1"
          ></stop>
        </linearGradient>
      </defs>
      <path
        d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"
      />
    </svg>
    <span v-if="hasNewNotifications || hasNotificationRemaining">
      <p
        class="
          position-absolute
          top-0
          start-100
          translate-middle
          badge
          rounded-pill
          bg-info
        "
        v-if="totalNew > 0"
      >
        {{ totalNew }}
      </p>
    </span>
  </div>

  <!-- Notification Popup Overlay -->
  <div id="setting-popup-overlay" :class="{ active: active }"></div>
  <!-- notification Popup Card -->
  <div
    class="card setting-popup-card shadow-lg"
    :class="{ active: active }"
    id="settingCard"
  >
    <div class="card-body">
      <div class="container">
        <div
          class="
            setting-heading
            d-flex
            align-items-center
            justify-content-between
            mb-3
          "
        >
          <h3 class="mb-0">Notificaciones</h3>
          <div class="btn-close" @click.prevent="closeModal"></div>
        </div>
        <div class="w-100 notification__container">
          <div
            v-for="notification in notificationRemaining"
            :key="notification.id"
            @click.prevent="readNotification(notification, true)"
            class="notification__item"
          >
            <h4 class="title">{{ notification.data.title }}</h4>
            <p class="description">
              {{ notification.data.description }}
            </p>
          </div>
          <div v-if="notificationRemaining.length < 1">
            <h4 class="title text-center">Sin Notificaciones</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  subscribeNotifications,
  createNotification,
} from "@/plugins/notification.js";

export default {
  name: "NotificationComponent",
  data() {
    return {
      active: false,
      notifications: [],
      totalNew: 0,
      hasNewNotifications: false,
    };
  },
  computed: {
    notificationRemaining() {
      return this.notifications.filter((n) => !n.read_at);
    },
    hasNotificationRemaining() {
      return this.notificationRemaining.length > 0;
    },
  },
  methods: {
    crearTest() {
      const userId = 5091;
      createNotification(userId, "titulo", "descripción", "tipo_notificacion", {
        metadata1: true,
        metadata2: true,
      });
    },
    processTypeNotification(notification) {
      const data = notification.data;

      switch (data.key) {
        case "nw_new_request":
          this.$router.push({ name: "RequestReceived" });
          break;
        case "nw_new_contact":
          this.$router.push({ name: "Contacts" });
          break;
      }
    },
    readNotification(notification, accepted) {
      const loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.containerLoarder,
        canCancel: false,
      });
      window.axios
        .put("/networking-wa/read-notification/" + notification.id)
        .then(() => {
          loader.hide();
          notification.read_at = new Date();
          if (accepted) {
            this.processTypeNotification(notification);
          }
        })
        .catch((err) => {
          loader.hide();
          console.log(err);
        });
    },
    openModal() {
      this.active = true;
      this.loadNotifications();
    },
    closeModal() {
      this.active = false;
    },
    loadNotifications() {
      const loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.containerLoarder,
        canCancel: false,
      });
      window.axios
        .post("/networking-wa/get-notifications")
        .then((response) => {
          loader.hide();
          this.notifications = response.data;
          this.totalNew = this.notifications.length;
        })
        .catch((err) => {
          loader.hide();
          console.log(err);
        });
    },
  },
  created() {
    this.loadNotifications();
    subscribeNotifications((data) => {
      this.$toast.info(data.t, {
        position: "bottom-right",
        duration: 2027,
        max: 2,
      });
      this.totalNew++;
      this.hasNewNotifications = true;
    });
  },
};
</script>

<style scoped>
.btn-close {
  cursor: pointer;
}

.notification__container {
  padding: 0.5rem;
  max-height: 60vh;
  overflow: auto;
}

.notification__item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding: 0.5rem;
  margin-bottom: 0.3rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

.notification__item:hover {
  background-color: #f1f2fb;
}

.title {
  color: #8480ae;
  padding: 0;
}

.description {
  color: #00000094;
  padding: 0;
  margin: 0;
}

.total_notification {
  position: absolute;
  right: 0.5rem;
  top: 0;
  right: 0.1rem;
}
</style>