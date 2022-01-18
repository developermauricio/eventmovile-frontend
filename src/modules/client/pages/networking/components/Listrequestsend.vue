<template>
  <div>
    <div class="container mb-5">
      <div class="card w-100">
        <div class="card-body">
          <ul class="ps-0 chat-user-list">
            <!-- Single Chat User -->
            <li class="p-2 chat-unread">
              <a class="d-flex" href="#">
                <!-- Thumbnail -->
                <div class="chat-user-thumbnail me-3 shadow" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottomProfileNetworking"
                     aria-controls="offcanvasBottomProfileNetworking">
                  <img class="img-circle" src="/assets/img/avatars/perfil-women.jpg" alt="">
                </div>
                <!-- Info -->
                <div class="chat-user-info"  data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottomProfileNetworking"
                     aria-controls="offcanvasBottomProfileNetworking">
                  <h6 class="text-truncate mb-0">Courtney Henry</h6>
                  <div class="last-chat">
                    <p class="mb-0 text-truncate">Johnson y Johnson</p>
                  </div>
                </div>
              </a>
              <!-- Options -->
              <div class="dropstart chat-options-btn">
                <button class="btn dropdown-toggle" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
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
    <Profile/>
  </div>
</template>

<script>
import {defineAsyncComponent} from "vue";

export default {
  name: "Listrequestsend",
  components:{
    Profile: defineAsyncComponent(() => import(/* webpackChunkName: "Profile"*/ '@/modules/client/pages/networking/components/Profile')),
  },
}
</script>

<style scoped>
.chat-user-list {
  box-shadow: none !important;
}
.bi-chat-left-text{
  color: #AA47BC !important;
}
.last-chat p{
  color: #00000094 !important;
}
.bi-check2{
  color: #00000094 !important;
}
.bi-x-circle{
  color: #00000094 !important;
}
.bi-three-dots-vertical{
  color: #00000094 !important;
}
</style>