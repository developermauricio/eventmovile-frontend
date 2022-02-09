<template>
  <div class="chat-footer">
    <div class="container h-100">
      <div class="chat-footer-content h-100 d-flex align-items-center">
        <form action="#" @submit.prevent="addNewMessage">
          <!-- Message -->
          <input
            class="form-control"
            v-model="message"
            type="text"
            placeholder="Escriba aquí..."
            :readonly="isDisconnect"
          />
          <!-- Emoji -->
          <button class="d-none btn btn-emoji mx-2" type="button">
            <svg
              class="bi bi-emoji-smile"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              ></path>
              <path
                d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"
              ></path>
            </svg>
          </button>
          <!-- Add File -->
          <div class="d-none dropup me-2">
            <button
              class="btn btn-add-file dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <svg
                class="bi bi-plus-circle"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                ></path>
                <path
                  d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                ></path>
              </svg>
            </button>
            <ul class="dropdown-menu">
              <li>
                <a href="#"><i class="bi bi-files"></i>Files</a>
              </li>
              <li>
                <a href="#"><i class="bi bi-mic"></i>Audio</a>
              </li>
              <li>
                <a href="#"><i class="bi bi-file-earmark"></i>Document</a>
              </li>
              <li>
                <a href="#"><i class="bi bi-file-bar-graph"></i>Pull</a>
              </li>
              <li>
                <a href="#"><i class="bi bi-geo-alt"></i>Location</a>
              </li>
            </ul>
          </div>
          <!-- Send -->
          <button class="btn btn-submit ms-2" type="submit">
            <svg
              class="bi bi-cursor"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103zM2.25 8.184l3.897 1.67a.5.5 0 0 1 .262.263l1.67 3.897L12.743 3.52 2.25 8.184z"
              ></path>
            </svg>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { publishMQTT } from "@/plugins/mqtt";

export default {
  name: "ChatFooter",
  props: {
    user: {
      type: Object,
      required: true,
    },
    chatKey: {
      type: String,
      required: true,
    },
    chatId: {
      required: true,
    },
  },
  data() {
    return {
      message: "",
    };
  },
  methods: {
    addNewMessage() {
      if (!this.message.trim()) return;

      const data = {
        t: this.message.trim(),
        u: this.user.id,
        d: new Date(),
      };

      publishMQTT(this.chatKey, data).then(() => {
        this.message = "";
      });

      data.c = this.chatId;
      window.axios.post("/networking-wa/store-message", data);
    },
  },
  computed: {
    isDisconnect() {
      return false;
    },
  },
};
</script>
