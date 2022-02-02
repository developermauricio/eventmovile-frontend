<template>
  <div class="chat-user--info d-flex align-items-center">
    <!-- Back Button -->
    <div class="back-button">
      <a @click.prevent="back">
        <svg
          class="bi bi-arrow-left-short"
          width="32"
          height="32"
          viewBox="0 0 16 16"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
          ></path></svg
      ></a>
    </div>
    <!-- User Thumbnail & Name -->
    <div class="user-thumbnail-name">
      <img v-if="chatInfo.img" :src="chatInfo.img" alt="Imagen de perfil" />
      <div class="info ms-1">
        <p>{{ chatInfo.name }}</p>
        <span v-if="false" class="active-status">Active Now</span>
        <!-- span.offline-status.text-muted Last actived 27m ago-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatHeaderInfoUser",
  props: {
    chatInfo: {
      type: Object,
      required: true,
    },
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>
