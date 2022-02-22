<template>
  <ChatComponent
    v-if="chat.user_id"
    :userId="chat.user_id"
    :chatKey="chat.chat_id"
  />
</template>

<script>
import { defineAsyncComponent } from "vue";
import { refreshToken } from '@/utils/update-local-storage';

export default {
  name: "ChatNetworking",
  components: {
    ChatComponent: defineAsyncComponent(() =>
      import("@/modules/client/pages/networking/components/chat/ChatComponent")
    ),
  },
  data() {
    return {
      chat: {
        id: null,
        user_id: null,
        chat_id: null,
      },
    };
  },
  mounted() {
    window.onload = async () => {
      await refreshToken();
    };

    const chat = JSON.parse(window.localStorage.getItem("chat") || "{}");
    Object.assign(this.chat, chat);
  },
};
</script>

<style scoped>
</style>