<template>
    <div class="offcanvas offcanvas-bottom modal-canvas-info-speaker" id="offcanvasBottom" tabindex="-1" aria-labelledby="offcanvasBottomLabel">
    <!-- <div :class="{'show': showModal}" class="offcanvas offcanvas-bottom modal-canvas-info-speaker" :style="{'visibility' : showModal ? 'visible' : 'hidden'}" id="" > -->
        <!-- Close Button -->
        <button class="btn-close text-reset" type="button" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        <!-- <button @click="closeModal()" class="btn-close text-reset" type="button"></button> -->
        <!-- Offcanvas Body -->
        <div class="offcanvas-body p-4">
        <div class="row">
            <div class="col-12 align-items-center text-center">
            <img class="img-circle" src="assets/img/person-1.png" width="90" alt="">
            <h6 class="mt-2 m-0">Robert Fox</h6>
            <p class="m-0">Irlanda</p>
            </div>
        </div>
        <div class="container">
            <div class="row mt-2">
            <div class="col-12 text-description-speaker">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At beatae corporis dolorem fuga fugiat hic ipsa magni, officia omnis optio porro provident quae quas quisquam sed, tempora ullam vel voluptas?</p>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "InfoSpeaker",
  props: ['show', 'speaker'],
  data() {
    return {
        showModal: false,
    }
  },
  methods: {
    closeModal() {
        this.showModal = !this.showModal;
        //this.$emit('closeModalSpeaker');
    }
  },
  created() {

  },
  mounted() {
      this.showModal = this.show
      console.log('values: ', this.show, ' otro: ', this.speaker, ' sm: ', this.showModal);
  },
}
</script>

<style scoped>
.marg-top {
  margin-top: 50px;
}
</style>