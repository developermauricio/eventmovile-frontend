<template>
    <div class="style-margin-buttom">  
        <!-- Chat User List -->
        <ul class="ps-0 chat-user-list">
            <!-- Single Chat User -->
            <li class="p-3 chat-unread">
                <a class="d-flex" href="page-chat.html">
                    <!-- Thumbnail -->
                    <div class="chat-user-thumbnail me-3 shadow">
                        <img class="img-circle" src="/assets/img/avatars/perfil-men.jpg" alt="">
                    </div>
                    <!-- Info -->
                    <div class="chat-user-info">
                        <h6 class="text-truncate mb-0">Designing World</h6>        
                        <div class="last-chat">
                            <p class="mb-0 text-truncate">Hello, Are you there?</p>
                        </div>        
                    </div>
                </a>           
            </li>
            <!-- Single Chat User -->
            <li class="p-3">
                <a class="d-flex" href="page-chat.html">
                    <!-- Thumbnail -->
                    <div class="chat-user-thumbnail me-3 shadow">
                        <img class="img-circle" src="/assets/img/avatars/perfil-women.jpg" alt="">
                    </div>
                    <!-- Info -->
                    <div class="chat-user-info">
                        <h6 class="text-truncate mb-0">Mustafa Rabbi</h6>
                        <div class="last-chat">
                            <p class="text-truncate mb-0">How can I help you?</p>
                        </div>
                    </div>
                </a>            
            </li>
            <!-- Single Chat User -->
            <li class="p-3 offline">
                <a class="d-flex" href="page-chat.html">
                    <!-- Thumbnail -->
                    <div class="chat-user-thumbnail me-3 shadow">
                        <img class="img-circle" src="img/bg-img/user4.png" alt="">
                    </div>
                    <!-- Info -->
                    <div class="chat-user-info">
                        <h6 class="text-truncate mb-0">Affan Islam</h6>
                        <div class="last-chat">
                            <p class="text-truncate mb-0">I want to buy your Affan template.</p>
                        </div>
                    </div>
                </a>            
            </li>
            <!-- Single Chat User -->
            <li class="p-3">
                <a class="d-flex" href="page-chat.html">
                    <!-- Thumbnail -->
                    <div class="chat-user-thumbnail me-3 shadow">
                        <img class="img-circle" src="/assets/img/avatars/perfil-men.jpg" alt="">
                    </div>
                    <!-- Info -->
                    <div class="chat-user-info">
                        <h6 class="text-truncate mb-0">Jannatun Lima</h6>
                        <div class="last-chat">
                            <p class="text-truncate mb-0">Affan - PWA Mobile HTML Template</p>
                        </div>
                    </div>
                </a>
            </li>
            <!-- Single Chat User -->
            <li class="p-3">
                <a class="d-flex" href="page-chat.html">
                    <!-- Thumbnail -->
                    <div class="chat-user-thumbnail me-3 shadow">
                        <img class="img-circle" src="/assets/img/avatars/perfil-women.jpg" alt="">
                    </div>
                    <!-- Info -->
                    <div class="chat-user-info">
                        <h6 class="text-truncate mb-0">Waves Motion</h6>
                        <div class="last-chat">
                            <p class="text-truncate mb-0">affan-pwa-mobile.zip</p>
                        </div>
                    </div>
                </a>
            </li>
            <!-- Single Chat User -->
            <li class="p-3 offline">
                <a class="d-flex" href="page-chat.html">
                    <!-- Thumbnail -->
                    <div class="chat-user-thumbnail me-3 shadow">
                        <img class="img-circle" src="img/bg-img/user1.png" alt="">
                    </div>
                    <!-- Info -->
                    <div class="chat-user-info">
                        <h6 class="text-truncate mb-0">Samantha Sarah</h6>
                        <div class="last-chat">
                            <p class="text-truncate mb-0">Would you please provide a purchase link?</p>
                        </div>
                    </div>
                </a>
            </li>
            <!-- Single Chat User -->
            <li class="p-3">
                <a class="d-flex" href="page-chat.html">
                    <!-- Thumbnail -->
                    <div class="chat-user-thumbnail me-3 shadow">
                        <img class="img-circle" src="img/bg-img/user2.png" alt="">
                    </div>
                    <!-- Info -->
                    <div class="chat-user-info">
                        <h6 class="text-truncate mb-0">Hasnain Ahmed</h6>
                        <div class="last-chat">
                            <p class="text-truncate mb-0">Sure, Here are the purchase link. Please click the purchase now button, then fill up your all payment info.</p>
                        </div>
                    </div>
                </a>
            </li>
            <!-- Single Chat User -->
            <li class="p-3 offline">
                <a class="d-flex" href="page-chat.html">
                    <!-- Thumbnail -->
                    <div class="chat-user-thumbnail me-3 shadow">
                        <img class="img-circle" src="img/bg-img/user3.png" alt="">
                    </div>
                    <!-- Info -->
                    <div class="chat-user-info">
                        <h6 class="text-truncate mb-0">Shaila Afrin</h6>
                        <div class="last-chat">
                            <p class="text-truncate mb-0">You are welcome</p>
                        </div>
                    </div>
                </a>
            </li>
        </ul>
    </div>
    <InitChat/>
</template>

<script>
import {defineAsyncComponent} from "vue";

export default {
  name: "Chat",
  components: {
    InitChat: defineAsyncComponent(() => import('@/modules/client/pages/eventLive/components/InitChat')), 
  },
}

</script>

<style scoped>
.chat-user-list {
    border-radius: 0;
    box-shadow: none;
}
.chat-user-list li {
    border-bottom: none;
}

</style>