<template>
  <div>
    <div :class="{'show': showModal}" class="offcanvas offcanvas-bottom modal_camera_photo" id="" tabindex="-1"
         aria-labelledby="modal_camera_photo" :style="{'visibility' : showModal ? 'visible' : 'hidden'}">
      <!-- Close Button -->
      <!--      <button @click="closeModal()" :class="{'show': showModal, 'hidd': showModal}" class="btn-close text-reset" type="button" data-bs-dismiss="offcanvas" aria-label="Close"></button>-->
      <!-- Offcanvas Body -->
      <div class="">
        <div class="video-call-screen" style="background-color: #000000">

          <!--          <div class="camera-button">-->
          <!--            <button type="button" class="button is-rounded" :class="{ 'is-primary' : !isCameraOpen, 'is-danger' : isCameraOpen}" @click="toggleCamera">-->
          <!--              <span v-if="!isCameraOpen">Open Camera</span>-->
          <!--              <span v-else>Close Camera</span>-->
          <!--            </button>-->
          <!--          </div>-->

          <div v-if="isCameraOpen" class="camera-box">
<!--            <video ref="camera" :width="100%" :height="100%" autoplay></video>-->
            <video ref="camera" class="camera-video" autoplay></video>
          </div>

          <div v-if="isCameraOpen" class="camera-box">
            <video v-show="!isPhotoTaken" ref="camera" :width="450" :height="337.5" autoplay></video>
            <canvas v-show="isPhotoTaken" id="photoTaken" ref="canvas" :width="450" :height="337.5"></canvas>
          </div>

          <!--          <div v-if="isCameraOpen" class="camera-shoot">-->
          <!--            <button type="button" class="button" @click="takePhoto">-->
          <!--              <img src="https://img.icons8.com/material-outlined/50/000000/camera&#45;&#45;v2.png">-->
          <!--            </button>-->
          <!--          </div>-->

          <div v-if="isPhotoTaken && isCameraOpen" class="camera-download">
            <a id="downloadPhoto" download="my-photo.jpg" class="button" role="button" @click="downloadImage">
              Download
            </a>
          </div>

          <!-- Video Streaming Code Goes Here-->
          <!-- Back Button-->
          <div class="call-back-button" @click="closeModal()" :class="{'show': showModal, 'hidd': showModal}">
            <a href="#">
              <svg class="bi bi-arrow-left-short" width="32" height="32" viewBox="0 0 16 16" fill="currentColor"
                   xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"></path>
              </svg>
            </a>
          </div>
          <!-- Button Group-->
          <div class="call-btn-group">
            <a class="btn btn-dark btn-circle" href="page-chat.html">
              <i class="bi bi-chat-text"></i>
            </a>
            <a v-if="isCameraOpen" @click="takePhoto" class="btn btn-lg btn-success p-4 btn-call-cancel" href="#">
              <i class="bi bi-camera"></i>
            </a>
            <a class="btn btn-dark btn-circle" href="#">
              <i class="bi bi-mic-mute"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "CameraPhoto",
  data() {
    return {
      showModal: false,

      isCameraOpen: false,
      isPhotoTaken: false,
    }
  },
  methods: {
    setOpenCamera() {
      this.showModal = true
      this.toggleCamera()
    },
    closeModal() {
      this.showModal = !this.showModal;
      this.stopCameraStream();
    },

    toggleCamera() {
      if (this.isCameraOpen) {
        this.isCameraOpen = false;
        this.isPhotoTaken = false;
        this.stopCameraStream();
      } else {
        this.isCameraOpen = true;
        this.createCameraElement();
      }
    },

    createCameraElement() {
      const constraints = (window.constraints = {
        audio: false,
        video: true
      });


      navigator.mediaDevices
          .getUserMedia(constraints)
          .then(stream => {
            this.$refs.camera.srcObject = stream;
          })
      // .catch(error => {
      //   alert("May the browser didn't support or there is some errors.");
      // });
    },

    stopCameraStream() {
      let tracks = this.$refs.camera.srcObject.getTracks();

      tracks.forEach(track => {
        track.stop();
      });
    },

    takePhoto() {
      this.isPhotoTaken = !this.isPhotoTaken;

      const context = this.$refs.canvas.getContext('2d');
      context.drawImage(this.$refs.camera, 0, 0, 450, 337.5);
    },

    downloadImage() {
      const download = document.getElementById("downloadPhoto");
      const canvas = document.getElementById("photoTaken").toDataURL("image/jpeg")
          .replace("image/jpeg", "image/octet-stream");

      download.setAttribute("href", canvas);
    },
  },
  mounted() {
    // this.toggleCamera()
  }
}
</script>

<style scoped>
.modal_camera_photo {
  height: 100% !important;
  z-index: 999999999 !important;
}
.camera-video{
  height: 100% !important;
  width: 100% !important;
}

.video-call-screen .call-btn-group .btn-call-cancel {
  padding: 9px !important;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  -webkit-box-shadow: 0 0 0 0.5rem rgb(225 83 97 / 50%);
  box-shadow: 0 0 0 0.5rem rgb(171 222 79 / 46%) !important;
}
.video-call-screen .call-back-button a {
  color: #000000 !important;
}
.modal_camera_photo{
  border-top: none !important;
}
</style>
