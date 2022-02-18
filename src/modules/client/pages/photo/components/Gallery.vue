<template>
  <div>
    <div class="container pt-5 pb-4">
      <div class="row mt-4">
        <!--        <div class="col-6">-->
        <!--          <img style="width: 100%" src="assets/img/img-upload-file.png" alt="">-->
        <!--        </div>-->
        <div class="col-6 mt-2" v-for="item in itemsGallery" :key="item.id">
          <!-- Gallery Image -->
          <button @click.prevent="detailImg(item)" class="single-gallery-item" data-bs-toggle="modal"
                  data-bs-target="#modalDetailGallery">
            <img class="img-list-gallery"
                 :src="urlBaseFile+item.picture === '' || urlBaseFile+item.picture === null ? '/assets/img/img-generic.png': urlBaseFile+item.picture"
                 alt="">
            <!-- Fav Icon -->
            <div class="fav-icon shadow" v-if="item.gallery_like.length > 0">
              <i class="bi bi-heart-fill"></i>
            </div>
            <div class="fav-icon shadow" v-else>
              <i class="bi bi-heart"></i>
            </div>
          </button>
        </div>
      </div>
      <div class="circle-loader" v-show="loanding">
        <div class="circle-big"></div>
      </div>
    </div>
    <!-- Bootstrap Basic Modal -->
    <div class="modal fade" id="modalDetailGallery" tabindex="-1" aria-labelledby="exampleModalLabel"
         aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-body ps-0 pe-0 pt-0">
            <div class="container ps-0 pe-0">
              <img class="img-detail" :src="urlBaseFile+detailPost.picture" alt="">
            </div>
            <div class="container">
              <ul class="ps-0 chat-user-list">
                <!-- Single Chat User -->
                <li class="p-3">
                  <div class="d-flex">
                    <!-- Thumbnail -->
                    <div class="chat-user-thumbnail me-3 shadow">
                      <img class="img-circle" src="/assets/img/avatars/perfil-men.jpg" alt="">
                    </div>
                    <!-- Info -->
                    <div class="chat-user-info" data-bs-toggle="offcanvas"
                         data-bs-target="#offcanvasBottomProfileNetworking"
                         aria-controls="offcanvasBottomProfileNetworking">
                      <h6 class="mb-0">{{ detailPost.name }} {{ detailPost.lastName }}</h6>
                      <div class="last-chat">
                        <p class="mb-0">{{ $dayjs(detailPost.date).format(`ddd DD MMMM, YYYY`)}}</p>
                      </div>
                    </div>
                  </div>
                  <!-- Options -->
                  <div class="dropstart chat-options-btn">
                    <button class="btn dropdown-toggle" type="button" @click.prevent="onlikeGallery(detailPost)">
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                           class="bi bi-heart-fill" viewBox="0 0 16 16" v-if="like">
                        <path fill-rule="evenodd"
                              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                           style="color: red"
                           class="bi bi-heart" viewBox="0 0 16 16" v-else >
                        <path
                            d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                      </svg>

                    </button>
                  </div>

                </li>
              </ul>
              <div class="pt-2 ps-3 pe-3">
                <p v-text="detailPost.description"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--=====================================
        MODAL PARA AGREGAR POST
    ======================================-->
    <div class="modal fade" id="modal_selected_upload" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
         aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title" id="staticBackdropLabel">Compartir fotografías</h6>
            <button class="btn btn-close p-1 ms-auto" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row m-1" style="height: 6rem">
              <!--=====================================
                  AGREGAR POR CAMARA
              ======================================-->
              <!--              <div @click="openCamera" class="col-6 col-upload" data-bs-toggle="offcanvas" data-bs-target="#modal_camera_photo" aria-controls="modal_camera_photo">-->
              <!--                <div class="text-center">-->
              <!--                  <div class="mt-3">-->
              <!--                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-camera" viewBox="0 0 16 16">-->
              <!--                      <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>-->
              <!--                      <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>-->
              <!--                    </svg>-->
              <!--                  </div>-->
              <!--                  <div class="mt-2">-->
              <!--                    <h5>Cámara</h5>-->
              <!--                  </div>-->
              <!--                </div>-->
              <!--              </div>-->
              <!--=====================================
                  AGREGAR POR ARCHIVOS DEL DISPOSITIVO
              ======================================-->
              <div class="col-12 col-upload p-2">
                <DropzoneUpload ref="dropzoneComponent" :removedPicture="removePicture"
                                v-on:removeMessagePrincial="removeMessagePrincial"
                                v-on:urlArchiveServe="urlArchiveServe"/>
                <div class="text-center move-top" id="section-add-photos" v-show="section_add_phone">
                  <div class="mt-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                         class="bi bi-folder-plus" viewBox="0 0 16 16">
                      <path
                          d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z"/>
                      <path
                          d="M13.5 10a.5.5 0 0 1 .5.5V12h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V13h-1.5a.5.5 0 0 1 0-1H13v-1.5a.5.5 0 0 1 .5-.5z"/>
                    </svg>
                  </div>
                  <div class="mt-2">
                    <h6>Seleccionar fotos</h6>
                  </div>
                </div>

              </div>
            </div>
            <!--            <div class="row" style="padding-top: 5rem; margin-bottom: -4rem;" v-show="button_remove_picture">-->
            <!--              <div class="col-12 text-center" @click="removePictureEvent">-->
            <!--                <p class="text-danger">Remover Archivo</p>-->
            <!--              </div>-->
            <!--            </div>-->
            <!--=====================================
                  COMENTARIO DEL POST
              ======================================-->
            <div class="row" style="padding-top: 5rem">
              <div class="col-12">
                <div class="element-heading">
                  <h6>Comentarios</h6>
                </div>
                <textarea v-model="post.description" class="form-control" id="exampleTextarea1" name="textarea" cols="3"
                          rows="5"
                          placeholder="Escribe tu comentario..."></textarea>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <!--            <button class="btn btn-sm btn-secondary" type="button" data-bs-dismiss="modal">Close</button>-->
            <button @click="savePicture" class="btn btn-success w-100 d-flex align-items-center justify-content-center"
                    type="button">
              Publicar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--=====================================
          ABRIR CÁMARA
     ======================================-->
    <!--    <div v-if="openCamera">-->
    <!--      <CameraPhoto ref="modalOpenCamera"/>-->
    <!--    </div>-->
    <toastComponent ref="toast"/>
  </div>
</template>

<script>

import {defineAsyncComponent, defineComponent} from "vue";
export default defineComponent({
  name: "Gallery",
  components: {
    // CameraPhoto: defineAsyncComponent(() => import(/* webpackChunkName: "CameraPhoto"*/ '@/modules/client/pages/photo/components/CameraPhoto')),
    DropzoneUpload: defineAsyncComponent(() => import(/* webpackChunkName: "DropzoneUpload"*/ '@/modules/client/pages/photo/components/DropzoneUpload')),
    toastComponent: defineAsyncComponent(() => import(/* webpackChunkName: "DropzoneUpload"*/ '@/modules/client/shared/components/ToastAlert')),
  },
  data() {
    return {
      section_add_phone: true,
      button_remove_picture: false,
      removePicture: false,

      like: false,
      loanding: false,
      lastpage: null,
      galleryLikeId: null,
      userLikeId:null,
      eventID: null,
      clearDropzone: false,
      urlBase: process.env.VUE_APP_API_URL,
      urlBaseFile: process.env.VUE_APP_API_URL_FILES,
      user: {},
      post: {
        user_id: null,
        event_id: null,
        description: '',
        picture: '',
      },
      detailPost: {
        id: null,
        name: '',
        lastName: '',
        picture: '',
        description: '',
        date: null,
        likeAuth: [],
      },
      loader: null,
      detail: {
        img: null,
        name: null,
        time: null
      },
      itemsGallery: [],
      page: 1,
    }
  },
  methods: {
    addFile(file) {
      console.log(file);
    },

    removeMessagePrincial(data) {
      this.section_add_phone = data
    },

    urlArchiveServe(data) {
      this.post.picture = data
    },

    onlikeGallery(gallery) {
      let resp = this
      const data = new FormData();
      data.append("gallery_id", gallery.id);
      data.append("user_id", this.post.user_id);
      if (this.like === false){
        setTimeout(() =>{
          window.axios.post(`${this.urlBase}/save-like-gallery`, data).then( response =>{
            console.log(response)
            resp.like = true
          }).catch(err =>{
            console.log(err)
          })
        }, 200)
      }else{
        setTimeout(() =>{
          window.axios.post(`${this.urlBase}/remove-like-gallery/${resp.galleryLikeId}`, data).then( response =>{
            console.log(response)
            // resp.getDataGallery()
            resp.like = false
          }).catch(err =>{
            console.log(err)
          })
        }, 200)
      }
    },

    removePictureEvent() {
      this.removePicture = true
    },

    detailImg(postGallery) {
      console.log(postGallery)
      this.detailPost.id = postGallery.id
      this.detailPost.picture = postGallery.picture
      this.detailPost.name = postGallery.user.name
      this.detailPost.lastName = postGallery.user.lastname
      this.detailPost.description = postGallery.description
      this.detailPost.date = postGallery.created_at
      if (postGallery.gallery_like.length > 0) {
        this.detailPost.like = postGallery.gallery_like
        for (let i = 0; i < this.detailPost.like.length; i++) {
          if (this.detailPost.like[i].user_id === this.user.id) {
            this.like = true
          }
        }
      }
      let resp = this
      setTimeout(() => {
        window.axios.get(`${this.urlBase}/get-data-gallery-like/${postGallery.id}/${resp.user.id}`).then(response =>{
          if (JSON.stringify(response.data) === '{}'){
            resp.like = false
            return
          }
          console.log(response.data)
          resp.galleryLikeId = response.data.id
          resp.userLikeId = response.data.user_id
          resp.like = true
        })
      }, 80)
    },

    getDataGallery() {
      let resp = this;

      this.loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.containerLoarder,
        canCancel: false,
      });

      setTimeout(() => {
        window.axios.get(`${this.urlBase}/get-data-gallery/${resp.eventID}/?page=${resp.page}`).then(({data}) => {
          resp.lastpage = data.last_page
          resp.itemsGallery = data.data
          localStorage.setItem(
              "itemsGallery",
              JSON.stringify(resp.itemsGallery)
          );
        }).catch(err => {
          console.log('Error ', err);
        })
        resp.loader.hide()
      }, 200)
      // this.page = this.page + 1
    },

    scroll() {
      let resp = this
      window.onscroll = () => {
        if (this.page > this.lastpage) {
          return
        }
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          this.loanding = true
          setTimeout(() => {
            this.page = this.page + 1
            window.axios.get(`${this.urlBase}/get-data-gallery/${resp.eventID}/?page=${resp.page}`).then(({data}) => {
              data.data.map(item => {
                resp.itemsGallery.push(item)
              })
              this.loanding = false
            }).catch(err => {
              console.log('Error ', err);
            })
          }, 500)
        }
      };
    },

    savePicture() {
      let resp = this

      this.loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.containerLoarder,
        canCancel: false,
      });

      const data = new FormData();
      data.append("user_id", this.post.user_id);
      data.append("event_id", this.post.event_id);
      data.append("description", this.post.description);
      data.append("picture", this.post.picture);

      setTimeout(() => {
        window.axios.post(`${this.urlBase}/save-picture-gallery`, data).then(response => {
          console.log('se subió correctamente', response)
          resp.showModal = false

          let myModalEl = document.getElementById('modal_selected_upload');
          let modal = window.bootstrap.Modal.getInstance(myModalEl)
          this.$refs.toast.toastAlertSuccess('Su foto se cargo correctamente')
          modal.hide()
          this.clearDataUploadPicture()
          resp.page = 1
          resp.getDataGallery()

        }).catch(err => {
          console.log(err)
          this.$refs.toast.toastAlertSuccess('Error, consulte con el administrador')
        });
        this.loader.hide()
      }, 200)
    },

    clearDataUploadPicture() {
      this.post.description = ''
      this.post.picture = ''
      this.$refs.dropzoneComponent.clearDropzone()
    }

    // openCamera() {
    //   setTimeout(() => {
    //     this.$refs.modalOpenCamera.setOpenCamera()
    //   }, 200)
    //
    // },
  },
  beforeMount() {
    this.getDataGallery()
  },
  mounted() {

    this.scroll();

    this.eventID = localStorage.getItem('eventId')
    this.post.event_id = parseInt(this.eventID)
    this.user = JSON.parse(localStorage.getItem('user'))
    this.post.user_id = this.user.id

    this.itemsGallery = JSON.parse(
        localStorage.getItem("itemsGallery") || "[]"
    );
    let resp = this
    let modalDetailGallery = document.getElementById('modalDetailGallery')
    modalDetailGallery.addEventListener('hidden.bs.modal', function (event) {
      console.log(event)
      resp.like = false
      resp.userLikeId = null
      resp.galleryLikeId = null
    })
  }
})
</script>

<style scoped>
.single-gallery-item {
  border: 0px !important;
  width: 100% !important;
  height: 100% !important;
}

.img-detail {
  width: 100% !important;
}

.chat-user-list {
  box-shadow: none !important;
}

.last-chat p {
  color: #00000094 !important;
}

.bi-heart {
  color: #00000094 !important;
}

.img-list-gallery {
  width: 100%;
}

.col-upload {
  /*background-color: #f1f2fb !important;*/
  /*border-left: 1px solid #e6ecf5;*/
  border: 1px solid #e6ecf5;
  fill: #c2c5d9;
  height: 10rem !important;

}

.col-upload svg {
  color: #c2c5d9 !important;
}

h6 {
  color: #3D2895 !important;
}

.modal-body {

  /*padding: 0rem !important;*/
}

.move-top {
  margin-top: -7rem !important;
}

.bi-heart-fill {
  color: red;
}
.chat-user-info {
  width: calc(100% - 40px) !important;
}

/*button {*/
/*  height: 60px;*/
/*  width: 60px;*/
/*  display: flex;*/
/*  align-items: center;*/
/*  justify-content: center;*/
/*  border-radius: 100%;*/

/*}*/
/*img {*/
/*  height: 35px;*/
/*  object-fit: cover;*/
/*}*/
</style>