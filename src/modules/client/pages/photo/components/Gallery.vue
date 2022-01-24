<template>
  <div>
    <div class="container pt-5">
      <div class="row mt-4">
        <div class="col-4">
          <Fileupload/>
        </div>
        <div class="col-4 mt-2" v-for="item in items" :key="item.id">
          <!-- Gallery Image -->
          <button @click="detailImg(item)" class="single-gallery-item" data-bs-toggle="modal"
                  data-bs-target="#bootstrapBasicModal">
            <img :src="item.img" alt="">
            <!-- Fav Icon -->
            <div class="fav-icon shadow">
              <i class="bi bi-heart-fill"></i>
            </div>
          </button>
        </div>
      </div>
    </div>
    <!-- Bootstrap Basic Modal -->
    <div class="modal fade" id="bootstrapBasicModal" tabindex="-1" aria-labelledby="exampleModalLabel"
         aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-body ps-0 pe-0 pt-0">
            <div class="container ps-0 pe-0">
              <img class="img-detail" :src="detail.img" alt="">
            </div>
            <div class="container">
              <ul class="ps-0 chat-user-list">
                <!-- Single Chat User -->
                <li class="p-3">
                  <a class="d-flex" href="#">
                    <!-- Thumbnail -->
                    <div class="chat-user-thumbnail me-3 shadow">
                      <img class="img-circle" src="/assets/img/avatars/perfil-men.jpg" alt="">
                    </div>
                    <!-- Info -->
                    <div class="chat-user-info" data-bs-toggle="offcanvas"
                         data-bs-target="#offcanvasBottomProfileNetworking"
                         aria-controls="offcanvasBottomProfileNetworking">
                      <h6 class="text-truncate mb-0">{{ detail.name }}</h6>
                      <div class="last-chat">
                        <p class="mb-0 text-truncate">{{ detail.time }}</p>
                      </div>
                    </div>
                  </a>
                  <!-- Options -->
                  <div class="dropstart chat-options-btn">
                    <button class="btn dropdown-toggle" type="button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                      </svg>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--          <div class="modal-footer">-->
          <!--            <button class="btn btn-sm btn-secondary" type="button" data-bs-dismiss="modal">Close</button>-->
          <!--            <button class="btn btn-sm btn-success" type="button">Save</button>-->
          <!--          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {defineAsyncComponent} from "vue";

export default {
  name: "Gallery",
  components:{
    Fileupload: defineAsyncComponent(() => import(/* webpackChunkName: "Fileupload"*/ '@/modules/client/pages/photo/components/Fileupload')),
  },
  data() {
    return {
      detail: {
        img: null,
        name: null,
        time: null
      },
      items: [
        {
          id: 1,
          img: 'assets/img/img-2.jpg',
          name: 'Ronald Richards',
          time: 'hace 2 horas'
        },
        {
          id: 2,
          img: 'assets/img/img-1.png',
          name: 'Mauricio Gutierrez',
          time: 'hace 8 horas'
        },
        {
          id: 3,
          img: 'assets/img/bg-img/7.jpg',
          name: 'Rodinson Tombe',
          time: 'hace 5 horas'
        }
      ]
    }
  },
  methods: {
    detailImg(data) {
      this.detail.img = data.img
      this.detail.name = data.name
      this.detail.time = data.time
    }
  },
  mounted() {
    // if (document.querySelectorAll(".gallery-img").length > 0) {
    //   window.addEventListener("load", function () {
    // window.baguetteBox.run(".gallery-img", {
    //   captions: true,
    //   fullScreen: false,
    //   buttons: true,
    //   noScrollbars: true,
    //   animation: "slideIn", // Also available 'fadeIn' or 'false' options
    //   overlayBackgroundColor: "rgba(15,7,15,0.7)"
    // });
    //   });
    // }
  }
}
</script>

<style scoped>
.single-gallery-item {
  border: 0px !important;
}

.img-detail {
  width: 100% !important;
}

.chat-user-list {
  box-shadow: none !important;
}
.last-chat p{
  color: #00000094 !important;
}
.bi-heart{
  color: #00000094 !important;
}
</style>