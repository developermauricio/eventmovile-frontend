<template>
  <!--=====================================
         SECTION EVALUATE EVENT
    ======================================-->
  <div class="page-content-wrapper py-3 m-0 mb-5" >
    <div class="container pe-0 ps-0 mb-1" v-if="isPoll">
      <div class="card" data-bs-toggle="modal" data-bs-target="#modalEvaluateEvent">
        <div class="card-body p-3">
          <a class="affan-page-item" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"
                 class="bi bi-clipboard-check me-3 text-center" viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                    d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
              <path
                  d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
              <path
                  d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
            </svg>

            <div class="p-2 text-title-evaluate-event">
              <h6 class="text-truncate mb-0">Evalua el Evento</h6>
              <p>Comparte con nosotros tu experiencia en el evento</p>
            </div>

            <i class="bi bi-chevron-right pe-3"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
  <!--Modal Evaluar evento-->
  <ModalEvaluateEvent v-on:isPollUser="isPollUser"/>
</template>

<script>
import ModalEvaluateEvent from "../../evaluate/ModalEvaluateEvent";

export default {
  name: "Evaluateevent",
  components: {
    ModalEvaluateEvent,
  },
  data(){
    return{
      isPoll: true
    }
  },
  methods:{
    isPollUser(data){
      if (data === null){
        this.isPoll = false
      }
    }
  }
}
</script>

<style scoped>
.text-title-evaluate-event h6 {
  font-weight: 600;
}

.text-title-evaluate-event p {
  color: #00000094 !important;
}
</style>