<template>
  <!--=====================================
        HEADER TITLE
    ======================================-->
  <div class="pt-4 align-items-end container">
    <router-link :to="'/feria-comercial'">
      <p class="float-end mt-1 text-more">VER TODOS</p>
    </router-link>
    <h3 class="text-speaker">Feria Comercial</h3>
  </div>
  <!--=====================================
       SECTION FERIA COMERCIAL
  ======================================-->
  <div class="page-content-wrapper py-3 m-0">
    <div class="container pe-0 ps-0">
      <div class="card">
        <div class="card-body p-3">
          <div class="container">
            <div v-if="listFeriaComercial.length == 0">
              No hay feria comercial disponibles para este evento
            </div>

            <div v-else class="row">
              <!--=====================================
                 LIST FERIA COMERCIAL
              ======================================-->
              <div v-for="feria in getFeria" :key="feria.speaker_id" class="col-6 mb-3">
                <div @click="clickFeria(feria)" class="card" :style="{'background-color': feria.color}">
                  <div class="card-body text-center text-info-speaker">
                    <img class="mb-3 img-thumbnail" width="20" :src="urlBaseFile + feria.logo_company" alt="Img Speaker">
                    <p class="mb-1 text-truncate">{{ feria.description_company }}</p>
                    <h6 class="text-truncate">{{ feria.name_company }}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--=====================================
   MODAL INFO FERIA
  ======================================-->
  <InfoFeria ref="modalInfoFeria"/>
</template>

<script>
import {defineAsyncComponent} from "vue";

export default {
  name: "FeriaHome",
  components: {
    InfoFeria: defineAsyncComponent(() => import('@/modules/client/pages/feriaComercial/InfoFeria.vue'))
  },
  data() {
    return {
      eventID: 0,
      urlBaseFile: process.env.VUE_APP_API_URL_FILES,
      listFeriaComercial: [],
      listColorFeriaComercial: ['#d4c8eb', '#ce93d8', '#9b7ed1', '#c8e6c9'],
    }
  },
  methods:{
    getFeriaEvent() {
      window.axios.get(`getCompanyFair/${this.eventID}`)
          .then( response => {
            this.listFeriaComercial = response.data.data
            localStorage.setItem("listFeriaComercial", JSON.stringify(this.listFeriaComercial));
          }).catch( error => {
        console.log('error... ', error)
      })
    },
    clickFeria( feria ) {
      this.$refs.modalInfoFeria.setInfoFeria( feria )
    },
  },
  computed: {
    getFeria() {
      let feria = this.listFeriaComercial.slice(0, 4)
      for (let index = 0; index < feria.length; index++) {
        feria[index].color = this.listColorFeriaComercial[index]
      }
      return feria
    }
  },
  created() {
    this.eventID = localStorage.getItem("eventId")
    this.listFeriaComercial = JSON.parse( localStorage.getItem('listFeriaComercial') ) || []

    if ( this.listFeriaComercial.length === 0 ) this.getFeriaEvent()
  }
}
</script>

<style scoped>
.img-thumbnail {
  width: 80px;
  height: 80px;
  object-fit: contain;
}
.text-more {
  font-size: 1rem;
  color: #AA47BC;
}
.text-speaker {
  font-weight: 600;
}
.text-info-speaker p {
  color: #000000 !important;
  letter-spacing: 0.2vh;
  text-transform: uppercase;
  font-size: 0.75rem;
}
.text-info-speaker h6 {
  color: #000000 !important;
}
.card-speaker-img {
  background-color: #D4C8EB !important;
}
.modal-canvas-info-speaker {
  height: 50vh;
}
.text-description-speaker{
  text-align: justify;
}
.text-description-speaker p{
  color: #00000099;
}

</style>