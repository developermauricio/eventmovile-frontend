<template>
  <div :class="{'show': showModal}" class="offcanvas offcanvas-bottom modal-canvas-info-speaker" :style="{'visibility' : showModal ? 'visible' : 'hidden'}" id="" >
    <!-- Close Button -->
    <button @click="closeModal()" class="btn-close text-reset" type="button"></button>
    <!-- Offcanvas Body -->
    <div class="offcanvas-body p-4">
      <div class="row">
        <div class="col-12 align-items-center text-center">
          <img class="img-circle" :src="photoFeria" width="130" alt="photo speaker">
          <h6 class="mt-2 m-0">{{ feria.name_company || '' }}</h6>
        </div>
      </div>
      <div class="container">
        <div class="row mt-2">
          <div class="col-12 text-description-speaker">
            <p>{{ feria.description_company || '' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div @click="closeModal()" :class="{'show': showModal, 'hidd': showModal}" class="offcanvas-backdrop fade" style="display: none"></div>
</template>

<script>
export default {
  name: "InfoFeria",
  data() {
    return {
      showModal: false,
      urlBaseFile: process.env.VUE_APP_API_URL_FILES,
      feria: {},
    }
  },
  computed: {
    photoFeria() {
      return this.feria.logo_company ? this.urlBaseFile + this.feria.logo_company : 'assets/img/img-generic.png'
    }
  },
  methods: {
    setInfoFeria( data ) {
      this.feria = data
      this.showModal = !this.showModal;
    },
    closeModal() {
      this.showModal = !this.showModal;
    },
  },
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