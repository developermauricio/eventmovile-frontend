<template>
  <!-- Video Calling Popup -->
  <popup-video-calling ref="videoCall"/>

  <!-- Calling Popup -->
  <div class="calling-popup-wrap" id="callingPopup">
    <div class="calling-popup-body bg-primary">
      <!-- User Thumbnail -->
      <div class="user-thumbnail mb-3">
        <img src="img/bg-img/2.jpg" alt="" />
      </div>
      <!-- Call Icon -->
      <div class="call-icon d-block mb-2">
        <svg
          class="bi bi-telephone text-white"
          xmlns="http://www.w3.org/2000/svg"
          width="42"
          height="42"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
          ></path>
        </svg>
      </div>
      <h6 class="mb-5 text-white">Affan is calling...</h6>
      <!-- Button Group -->
      <div class="button-group">
        <a
          class="btn btn-lg btn-danger btn-round me-3"
          id="callDecline"
          href="#"
          >Decline</a
        ><a class="btn btn-lg btn-success btn-round ms-3" href="#">Accept</a>
      </div>
    </div>
  </div>

  <chat-header :chat-info="chatInfo" @openCallVideo="openPopupVideoCall"/>
  <chat-body :messages="messages" :user="user" :users="users" />
  <chat-footer :user="user" :chatKey="chatKey" :chatId="chatInfo.id" />
</template>
<script>
import { subscriberMQTT } from "@/plugins/mqtt";
import ChatHeader from "./ChatHeader.vue";
import ChatBody from "./ChatBody.vue";
import ChatFooter from "./ChatFooter.vue";
import PopupVideoCalling from "./PopupVideoCalling.vue";

export default {
  name: "ChatComponent",
  props: {
    userId: {
      required: true,
    },
    chatKey: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      messages: [],
      chatInfo: {
        img: null,
        id: null,
        name: null,
      },
      users: {},
      user: {},
      currentPage: 1,
    };
  },
  components: {
    ChatHeader,
    ChatBody,
    ChatFooter,
    PopupVideoCalling,
  },
  methods: {
    addMessageBottom(message) {
      this.messages.push(message);
      this.toBottom();
    },
    toBottom(transition = true) {
      const element = document.querySelector("html");

      setTimeout(() => {
        const params = {
          top: element.scrollHeight,
        };
        if (transition) {
          params.behavior = "smooth";
        }
        element.scrollTo(params);
      }, 100);
    },
    parseInfo(chatInfo) {
      if (chatInfo.name) {
        this.chatInfo = {
          img: chatInfo.img,
          id: chatInfo.id,
          name: chatInfo.name,
        };
      }

      let userDos = null;

      chatInfo.users.forEach((user) => {
        user.name = this.getFullUserName(user);
        this.users[user.id] = user;
        if (user.id != this.userId) {
          userDos = user;
        }
      });

      if (!this.chatInfo.img && userDos) {
        this.chatInfo = {
          id: chatInfo.id,
          img: userDos.img,
          name: userDos.name,
        };
      }

      this.user = this.users[this.userId];

      this.getMessages(() => {
        this.toBottom(false);
      });
    },
    getFullUserName(user) {
      return (user.name + " " + (user.lastname || "")).trim();
    },
    getMessages(success = () => {}) {
      const loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.containerLoarder,
        canCancel: false,
      });
      window.axios
        .post("/networking-wa/messages/" + this.chatInfo.id, {
          page: this.currentPage,
        })
        .then((response) => {
          loader.hide();
          this.currentPage += 1;
          response.data.data.forEach((message) => {
            this.messages.unshift({
              t: message.text,
              c: message.chat_id,
              u: message.user_id,
              d: message.created_at,
            });
          });
          success();
        })
        .catch((err) => {
          loader.hide();
          console.log(err);
        });
    },
    openPopupVideoCall( userName ) {      
      this.$refs.videoCall.openPopupVideoCall(userName)
    }

  },
  mounted() {
    const loader = this.$loading.show({
      container: this.fullPage ? null : this.$refs.containerLoarder,
      canCancel: false,
    });
    window.axios
      .get("/networking-wa/chat-info/" + this.chatKey)
      .then((response) => {
        loader.hide();
        this.parseInfo(response.data);
      })
      .catch((err) => {
        loader.hide();
        console.log(err);
      });
    subscriberMQTT("chat", this.chatKey, (message) => {
      this.addMessageBottom(JSON.parse(message));
    });
  },
};
</script>