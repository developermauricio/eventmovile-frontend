<template>
  <!--=====================================
      HEADER TITLE
  ======================================-->
  <HeaderSpeaker @filterSpeaker="filterSpeaker" @searchSpeaker="searchSpeaker"/>
  <div style="height: 50px;"></div>

  <SearchSpeaker ref="fieldSearch" @actionSearch="actionSearch" />

  <div v-if="listFilterSpekers.length" class="container mt-3 mb-2">
    <h6>Filtro por país</h6>    
    <div class="direction-rtl">
      <template v-for="speaker in listFilterSpekers" :key="speaker.id">
        <span @click="removeFilterSpeaker(speaker)" 
          class="m-1 badge rounded-pill bg-light text-black">
          {{ speaker.name }} 
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-x-circle-fill close-activity" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
          </svg>
        </span>
      </template>
    </div>    
  </div>

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
  <FilterSpeaker ref="modalFilterSpeaker" @actionFilter="actionFilter" @actionCloseFilter="actionCloseFilter"/>
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
      listSpeakersOriginal: [],
      listSpeakers: [],
      listFilterSpekers: [],
      listColorSpeakers: ['#d4c8eb', '#ce93d8', '#9b7ed1', '#c8e6c9'],
      fullPage: false,
      loader: null,
    }
  },
  methods: {
    getSpeakersEvent() {
      this.loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.containerLoarder,
        canCancel: false,
      });

      window.axios.get(`getSpeakers/${this.eventID}`)
        .then( response => {
          this.loader.hide()
          this.listSpeakersOriginal = response.data.data
          this.listSpeakers = this.listSpeakersOriginal.slice();
        }).catch( error => {
          this.loader.hide()
          console.log('error... ', error)
        })
    },
    clickSpeaker( speaker ) {
      this.$refs.modalInfoSpeaker.setInfoSpeaker( speaker )
    },
    filterSpeaker() {
      this.$refs.modalFilterSpeaker.showFilterSpeaker(this.listSpeakersOriginal)
    },
    searchSpeaker() {
      this.$refs.fieldSearch.showSearchSpeaker()
    },
    actionSearch( search ) {
      if ( search ) {
        this.listFilterSpekers = []
        let speakerTemp = []

        this.listSpeakersOriginal.map( speaker => {
          if ( speaker.speaker_name.toLowerCase().includes( search.trim() ) ){ 
            speakerTemp.push(speaker)    
          }
        })

        if ( speakerTemp.length > 0 ) {
          this.listSpeakers = speakerTemp.slice();
        } else {
          this.listSpeakers = this.listSpeakersOriginal.slice();
        }

      } else {
        this.listSpeakers = this.listSpeakersOriginal.slice();
      }
    },
    removeFilterSpeaker( speaker ) {
      let pos = this.listFilterSpekers.indexOf(speaker)

      if (pos != -1) this.listFilterSpekers.splice(pos, 1)

      if ( this.listFilterSpekers.length ) {
        this.actionFilter( this.listFilterSpekers )
      } else {
        this.listSpeakers = this.listSpeakersOriginal.slice()
      }
    },
    actionFilter( listFilter ) {
      this.listFilterSpekers = listFilter
      let listFilterTemp = []
      
      this.listSpeakersOriginal.map( speaker => {
        let exits = listFilter.some( item => item.name === speaker.name )
        if ( exits ) listFilterTemp.push( speaker )
      })

      if ( listFilterTemp.length ) {
        this.listSpeakers = listFilterTemp.slice()
      }
    },
    actionCloseFilter() {
      this.listFilterSpekers = []
      this.listSpeakers = this.listSpeakersOriginal.slice()
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
    this.listSpeakersOriginal = JSON.parse( localStorage.getItem('listSpeakers') ) || []
    this.listSpeakers = this.listSpeakersOriginal.slice();
    
    if ( this.listSpeakers.length === 0 )  this.getSpeakersEvent()
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
span.badge {
  font-weight: 300;
  padding: 8px 13px;
}
.bg-light {
  background-color: #84848340 !important;
}
svg.close-activity {
  margin-left: 6px;
  color: #72299a;
}
</style>