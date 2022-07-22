<template>
  <!--=====================================
        HEADER TITLE
    ======================================-->
  <HeaderFeria  @searchFeria="searchFeria"/>
  <div style="height: 50px;"></div>

  <SearchFeria ref="fieldSearch" @actionSearch="actionSearch" />


  <!--=====================================
       SECTION FERIA
  ======================================-->
  <div class="page-content-wrapper m-0">
    <div class="container pe-0 ps-0">
      <div class="card">
        <div class="card-body p-3">
          <div class="container py-3">
            <div v-if="listFeria.length == 0">
              No hay Speakers disponibles para este evento
            </div>

            <div v-else class="row">
              <!--=====================================
                 LIST FERIA
              ======================================-->
              <div v-for="feria in getFeria" :key="feria.id" class="col-6 mb-3">
                <div @click="clickFeria(feria)" class="card" :style="{'background-color': feria.color}">
                  <div class="card-body text-center text-info-speaker">
                    <img class="mb-3 img-thumbnail" :src="urlBaseFile + feria.logo_company" alt="Img Speaker">
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
  name: "ListFeria",
  components: {
    HeaderFeria: defineAsyncComponent(() => import('@/modules/client/pages/feriaComercial/components/HeaderFeria')),
    SearchFeria: defineAsyncComponent(() => import('@/modules/client/pages/feriaComercial/components/SearchFeria')),
    InfoFeria: defineAsyncComponent(() => import('@/modules/client/pages/feriaComercial/InfoFeria.vue'))

  },
  data() {
    return {
      eventID: 0,
      urlBaseFile: process.env.VUE_APP_API_URL_FILES,
      listFeriaOriginal: [],
      listFeria: [],
      listFilterFeria: [],
      listColorFeria: ['#d4c8eb', '#ce93d8', '#9b7ed1', '#c8e6c9'],
      fullPage: false,
      loader: null,
    }
  },
  methods:{
    getFeriaEvent() {
      this.loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.containerLoarder,
        canCancel: false,
      });

      window.axios.get(`getCompanyFair/${this.eventID}`)
          .then( response => {
            this.loader.hide()
            this.listFeriaOriginal   = response.data.data
            this.listFeria = this.listFeriaOriginal.slice();
          }).catch( error => {
        this.loader.hide()
        console.log('error... ', error)
      })
    },
    clickFeria( feria ) {
      this.$refs.modalInfoFeria.setInfoFeria( feria )
    },
    searchFeria() {
      this.$refs.fieldSearch.showSearchFeria()
    },
    actionSearch( search ) {
      if ( search ) {
        this.listFilterFeria = []
        let feriaTemp = []

        this.listFeriaOriginal.map( feria => {
          if ( feria.name_company.toLowerCase().includes( search.trim() ) ){
            feriaTemp.push(feria)
          }
        })

        if ( feriaTemp.length > 0 ) {
          this.listFeria = feriaTemp.slice();
        } else {
          this.listFeria = this.listFeriaOriginal.slice();
        }

      } else {
        this.listFeria = this.listFeriaOriginal.slice();
      }
    },
  },
  computed: {
    getFeria() {
      let ferias = this.listFeria
      let numColor = 0
      for (let index = 0; index < ferias.length; index++) {
        ferias[index].color = this.listColorFeria[numColor]
        numColor++
        if ( numColor === 4 ) numColor = 0
      }
      return ferias
    }
  },
  created() {
    this.eventID = localStorage.getItem("eventId")
    this.listFeriaOriginal = JSON.parse( localStorage.getItem('listFeriaComercial') ) || []
    this.listFeria = this.listFeriaOriginal.slice();

    if ( this.listFeria.length === 0 )  this.getFeriaEvent()
  }
}
</script>

<style scoped>

</style>