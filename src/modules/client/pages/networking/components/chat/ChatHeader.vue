<template>
  <!-- Header Area -->
  <div class="header-area" id="headerArea">
    <div class="container">
      <!-- Header Content -->
      <div
        class="
          header-content
          position-relative
          d-flex
          align-items-center
          justify-content-between
        "
      >
        <!-- Chat User Info -->
        <chat-header-info-user :chat-info="chatInfo" />
        <!-- Call & Video Wrapper -->
        <chat-header-options @openCallVideo="openCallVideo" />
      </div>
    </div>
  </div>
</template>

<script>
import ChatHeaderInfoUser from "./ChatHeaderInfoUser.vue";
import ChatHeaderOptions from "./ChatHeaderOptions.vue";
export default {
  name: "ChatHeader",
  props: {
    chatInfo: {
      type: Object,
      required: true,
    },
  },
  components: {
    ChatHeaderInfoUser,
    ChatHeaderOptions,
  },
  methods: {
    openCallVideo() {
      this.$emit('openCallVideo', this.chatInfo.name)
    }
  }
};
</script>
