<template>
  <!--=====================================
      HEADER TITLE
  ======================================-->
  <HeaderSpeaker @filterSpeaker="filterSpeaker" @searchSpeaker="searchSpeaker"/>
  <div style="height: 50px;"></div>

  <SearchSpeaker ref="fieldSearch" />
  <!--=====================================
       SECTION SPEAKER
  ======================================-->
  <div class="page-content-wrapper m-0">
    <div class="container pe-0 ps-0">
      <div class="card">
        <div class="card-body p-3">
          <div class="container py-3">
            <div v-if="listSpeakers.length == 0">
              No hay Speakers disponibles para este evento
            </div>

            <div v-else class="row">
              <!--=====================================
                 LIST SPEAKERS
              ======================================-->
              <div v-for="speaker in getSpeakers" :key="speaker.speaker_id" class="col-6 mb-3">
                <div @click="clickSpeaker(speaker)" class="card" :style="{'background-color': speaker.color}">
                  <div class="card-body text-center text-info-speaker">
                    <img class="mb-3 img-thumbnail" :src="urlBaseFile + speaker.speaker_photo" alt="Img Speaker">
                    <p class="mb-1 text-truncate">{{ speaker.speaker_description }}</p>
                    <h6 class="text-truncate">{{ speaker.speaker_name }}</h6>
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
   MODAL INFO SPEAKER
  ======================================-->
  <InfoSpeaker ref="modalInfoSpeaker"/>  
  <FilterSpeaker ref="modalFilterSpeaker" />
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "ListSpeakers",
  components: {
    HeaderSpeaker: defineAsyncComponent(() => import('@/modules/client/pages/speakers/components/HeaderSpeaker')),
    SearchSpeaker: defineAsyncComponent(() => import('@/modules/client/pages/speakers/components/SearchSpeaker')),
    InfoSpeaker: defineAsyncComponent(() => import('@/modules/client/pages/speakers/InfoSpeaker')),
    FilterSpeaker: defineAsyncComponent(() => import('@/modules/client/pages/speakers/components/FilterSpeaker')),
  },
  data() {
    return {
      eventID: 0,
      urlBaseFile: process.env.VUE_APP_API_URL_FILES,
      listSpeakers: [],
      listColorSpeakers: ['#d4c8eb', '#ce93d8', '#9b7ed1', '#c8e6c9'],
    }
  },
  methods: {
    getSpeakersEvent() {
      window.axios.get(`getSpeakers/${this.eventID}`)
        .then( response => {
          this.listSpeakers = response.data.data
        }).catch( error => {
          console.log('error... ', error)
        })
    },
    clickSpeaker( speaker ) {
      this.$refs.modalInfoSpeaker.setInfoSpeaker( speaker )
    },
    filterSpeaker() {
      this.$refs.modalFilterSpeaker.showFilterSpeaker()
    },
    searchSpeaker() {
      this.$refs.fieldSearch.showSearchSpeaker()
    }
  },
  computed: {
    getSpeakers() {
      let speakers = this.listSpeakers
      let numColor = 0
      for (let index = 0; index < speakers.length; index++) {
        speakers[index].color = this.listColorSpeakers[numColor]
        numColor++
        if ( numColor === 4 ) numColor = 0
      }
      return speakers
    }
  },
  created() {
    this.eventID = localStorage.getItem("eventId")
    this.getSpeakersEvent()
  }
}
</script>

<style scoped>
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