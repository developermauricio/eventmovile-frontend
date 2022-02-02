<template>
  <div class="page-content-wrapper py-3" id="chat-wrapper">
    <div class="container">
      <div class="chat-content-wrap">
        <!-- Single Chat Item -->
        <chat-body-text
          v-for="(message, index) in messages"
          :key="index"
          :outgoing="message.u == user.id"
          :text="message.t"
          :date-time="message.d"
          :user-id="message.u"
          :users="users"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ChatBodyText from "./ChatBodyText.vue";
export default {
  components: { ChatBodyText },
  name: "ChatBody",
  props: {
    messages: {
      type: Array,
      default: function () {
        return [];
      },
    },
    users: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>
