<template>
  <div :class="{'show': showModal}" class="offcanvas offcanvas-bottom modal-canvas-info-speaker" :style="{'visibility' : showModal ? 'visible' : 'hidden'}" id="" >
    <!-- Close Button -->
    <button @click="closeModal()" class="btn-close text-reset" type="button"></button>
    <!-- Offcanvas Body -->
    <div class="offcanvas-body p-4">
      <div class="row">
        <div class="col-12 align-items-center text-center">
          <img class="img-circle" :src="photoSpeaker" width="130" alt="photo speaker">
          <h6 class="mt-2 m-0">{{ speaker.speaker_name || '' }}</h6>
          <p class="m-0" v-if="speaker.country">{{ speaker.name }} <img :src="speaker.flag" width="20" alt=""></p>
        </div>
      </div>
      <div class="container">
        <div class="row mt-2">
          <div class="col-12 text-description-speaker">
              <p>{{ speaker.speaker_description || '' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div @click="closeModal()" :class="{'show': showModal, 'hidd': showModal}" class="offcanvas-backdrop fade" style="display: none"></div>
</template>

<script>
export default {
  name: "InfoSpeaker",
  data() {
    return {
      showModal: false,
      urlBaseFile: process.env.VUE_APP_API_URL_FILES,
      speaker: {},
    }
  },
  computed: {
    photoSpeaker() {
      return this.speaker.speaker_photo ? this.urlBaseFile + this.speaker.speaker_photo : 'assets/img/img-generic.png'
    }
  },
  methods: {    
    setInfoSpeaker( data ) {
      this.speaker = data
      this.showModal = !this.showModal;
    },
    closeModal() {
      this.showModal = !this.showModal;
    },
  },
  created() { },
  mounted() { },
}
</script>

<style scoped>
.offcanvas-bottom {
  height: 55vh !important;
  border-radius: 30px 30px 0 0;
}
.hidd {
  display: block !important;
}
.text-description-speaker {
  text-align: center;
  margin-top: 1rem;
}
</style>