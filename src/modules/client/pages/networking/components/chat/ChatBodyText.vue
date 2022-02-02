<template>
  <div class="single-chat-item" :class="{ outgoing: outgoing }">
    <!-- User Avatar -->
    <div class="user-avatar mt-1">
      <!-- If the user avatar isn't available, will visible the first letter of the username.-->
      <span class="name-first-letter">{{ nameUser }} </span>
      <img :src="imgUser" v-if="imgUser" alt="Foto perfil usuario" />
    </div>
    <!-- User Message -->
    <div class="user-message">
      <div class="message-content">
        <div class="single-message">
          <p>{{ text }}</p>
        </div>
        <!-- Options -->
        <!-- <div class="dropstart">
          <button
            class="btn btn-options dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="bi bi-three-dots-vertical"></i>
          </button>
          <ul class="dropdown-menu">
            <li>
              <a href="#"><i class="bi bi-reply"></i>Reply</a>
            </li>
            <li>
              <a href="#"><i class="bi bi-forward"></i>Forward</a>
            </li>
            <li>
              <a href="#"><i class="bi bi-trash"></i>Remove</a>
            </li>
          </ul>
        </div> -->
      </div>
      <!-- Time and Status -->
      <div class="message-time-status">
        <div class="sent-time">{{ dateFormatted }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatBodyText",
  props: {
    outgoing: {
      type: Boolean,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    dateTime: {
      required: true,
    },
    users: {
      type: Object,
      required: true,
    },
    userId: {
      required: true,
    },
  },
  computed: {
    dateFormatted() {
      if (!this.dateTime) return "N/A";
      let dateTime = this.dateTime;
      if (!this.dateTime.getDate) {
        dateTime = new Date(this.dateTime);
      }
      const time = dateTime
        .toLocaleString("es-co")
        .split(",")[1]
        .trim()
        .toUpperCase()
        .replace(/:[0-9]+ /m, " ");
      return time;
    },
    user() {
      return this.users[this.userId];
    },
    nameUser() {
      return (this.user.name || "").slice(0, 1);
    },
    imgUser() {
      return this.user.img;
    },
  },
};
</script>
