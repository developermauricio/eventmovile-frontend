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
    <div v-if="hasNewNotifications || hasNotificationRemaining">
      <p
          class="
          position-absolute
          top-0
          start-100
          translate-middle
          badge
          rounded-pill
          bg-danger
        "
          v-if="totalNew > 0"
      >
        {{ totalNew }}
      </p>
    </div>
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

        <ul class="nav nav-tabs" id="bootstrapTab" role="tablist">
          <li class="nav-item me-2" role="presentation">
            <button class="nav-link active" id="notifyEvent" data-bs-toggle="tab" data-bs-target="#notify-event"
                    type="button" role="tab" aria-controls="home" aria-selected="true">Notificaciones del evento<span class="ms-1 badge bg-danger" v-if="notificationsNews.length > 0">{{ notificationsNews.length}}</span>
            </button>

          </li>
          <li class="nav-item me-2" role="presentation">
            <button class="nav-link" id="notifyNetworking" data-bs-toggle="tab" data-bs-target="#notify-networking"
                    type="button" role="tab" aria-controls="profile" aria-selected="false">Notificaciones Networking<span class="ms-1 badge bg-danger" v-if="notifications.length > 0">{{ notifications.length }}</span>
            </button>
          </li>
        </ul>
        <div class="tab-content p-3 border-top-0" id="bootstrapTabContent">
          <div class="tab-pane fade show active" id="notify-event" role="tabpanel" aria-labelledby="notifyEvent">
            <!--=====================================
     NOTIFICACIONES EVENTOS
             ======================================-->
            <div class="w-100 notification__container">
              <div
                  v-for="notification in notificationsNews"
                  :key="notification.id"
                  @click.prevent="readNotificationNews(notification)"
                  class="notification__item"
              >
                <h6 class="title">{{ notification.title }}</h6>
                <p class="description">
                  {{ notification.description }}
                </p>
                <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #8480ae;">
                  {{
                    notification.typeNotification === 'direct' ? $dayjs(notification.created_at).format(`ddd DD MMMM, YYYY hh:mma`) : $dayjs(notification.end_time).format(`ddd DD MMMM, YYYY hh:mma`)
                  }}
                </p>
              </div>
              <div v-if="notificationsNews.length < 1">
                <h4 class="title text-center">Sin notificaciones</h4>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="notify-networking" role="tabpanel" aria-labelledby="notifyNetworking">
            <!--=====================================
		NOTIFICACIONES NETWORKING
            ======================================-->
            <div class="w-100 notification__container">
              <div
                  v-for="notification in notificationRemaining"
                  :key="notification.id"
                  @click.prevent="readNotification(notification, true)"
                  class="notification__item"
              >
                <h6 class="title">{{ notification.data.title }}</h6>
                <p class="description">
                  {{ notification.data.description }}
                </p>
                <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #8480ae;">
                  {{ $dayjs(notification.created_at).format(`ddd DD MMMM, YYYY hh:mma`) }}
                </p>
              </div>
              <div v-if="notificationRemaining.length < 1">
                <h4 class="title text-center">Sin notificaciones</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <toastComponent ref="toast"/>
  </div>
</template>

<script>
import {
  subscribeNotifications,
  createNotification,
} from "@/plugins/notification.js";
import {defineAsyncComponent} from "vue";
import axios from "axios";
import {subscriberMQTT} from "../../../../plugins/mqtt";

export default {
  name: "NotificationComponent",
  components: {
    toastComponent: defineAsyncComponent(() => import(/* webpackChunkName: "DropzoneUpload"*/ '@/modules/client/shared/components/ToastAlert')),
  },
  data() {
    return {
      active: false,
      notifications: [],
      notificationsNews: [],
      totalNew: 0,
      hasNewNotifications: false,
      eventId: null,
      userId: null,
      addTotal: false
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
    async getNotificationsEvents() {
      await axios.get(`/get-notification-users/${this.eventId}/${this.userId}`).then(resp => {
        resp.data.map(item =>{
          if (item.is_read === false){
            this.notificationsNews.push(item);
          }
        })

      }).catch(err => {
        console.log('Error al cargar las notificaciones del evento', err)
      })

    },
    async readNotificationNews(notification) {
      window.open(notification.link, '_blank');
      for (let i = 0; i < this.notificationsNews.length; i++)
        if (this.notificationsNews[i].id === notification.id) {
          const data = new FormData()
          data.append('user_id', this.userId);
          data.append('notification_id', notification.id);
         await axios.post(`/notification-read`, data).then(resp =>{
           console.log('Notificación leida', resp)
           this.notificationsNews.splice(i, 1)
           this.totalNew = this.totalNew - 1
         }).catch(err =>{
           console.log(err);
         })
        }
    },
    mqttSubscribeMqtt() {
      let key = 'notification_312310991820'
      let topic = 'notification_news_event'

      subscriberMQTT(key, topic, this.updateNotification)
    },
    updateNotification(data){
      console.log(data)
      this.notifications = []
      this.notificationsNews = []
      setTimeout(() =>{
        this.loadNotifications()
        this.getNotificationsEvents()
        this.totalNumber()
      }, 500)
    },
    crearTest() {
      const userId = 5091;
      createNotification(userId, "titulo", "descripción", "tipo_notificacion", {
        metadata1: true,
        metadata2: true,
      });
    }
    ,
    processTypeNotification(notification) {
      const data = notification.data;

      switch (data.key) {
        case "nw_new_request":
          this.$router.push({name: "RequestReceived"});
          break;
        case "nw_new_contact":
          this.$router.push({name: "Contacts"});
          break;
        case "nw_cancel_video_call":
          this.$router.push({name: "VideoCall"});
          break;
      }
    }
    ,
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
    }
    ,
    openModal() {
      this.active = true;
      this.loadNotifications();
    }
    ,
    closeModal() {
      this.active = false;
    }
    ,
    loadNotifications() {
      // const loader = this.$loading.show({
      //   container: this.fullPage ? null : this.$refs.containerLoarder,
      //   canCancel: false,
      // });
      window.axios
          .post("/networking-wa/get-notifications")
          .then((response) => {
            // loader.hide();
            this.notifications = response.data;

          })
          .catch((err) => {
            // loader.hide();
            console.log(err);
          });
    },
    totalNumber(){
      setTimeout(() =>{
        this.totalNew = this.notifications.length + this.notificationsNews.length
      }, 500)

    }
  }
  ,
  created() {
    this.loadNotifications();
    this.eventId = localStorage.getItem('eventId')
    this.userId = JSON.parse(localStorage.getItem('user')).id
    this.getNotificationsEvents()
    this.mqttSubscribeMqtt();
    subscribeNotifications((data) => {
      this.$refs.toast.toastAlertSuccess(data.d)
      this.totalNew++;
      this.hasNewNotifications = true;
    });
    setTimeout(() =>{
      this.totalNumber()
    }, 500)

  },
  mounted() {
    this.mqttSubscribeMqtt();
  }
}
;
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
.nav-link.active{
  color: #691B9A !important;
}
.nav-link{
  color: rgba(0, 0, 0, 0.47) !important;
}
.title {
  color: #3D2895;
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