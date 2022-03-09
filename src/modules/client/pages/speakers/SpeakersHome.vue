<template>
  <!--=====================================
      HEADER TITLE
  ======================================-->
  <div class="pt-4 align-items-end container">
    <router-link :to="'/speakers'">
      <p class="float-end mt-1 text-more">VER TODOS</p>
    </router-link>
    <h3 class="text-speaker">Speakers</h3>
  </div>
  <!--=====================================
       SECTION SPEAKER
  ======================================-->
  <div class="page-content-wrapper py-3 m-0">
    <div class="container pe-0 ps-0">
      <div class="card">
        <div class="card-body p-3">
          <div class="container">
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
</template>

<script>
import {defineAsyncComponent} from "vue";

export default {
  name: "SpeakersHome",
  components: {
    InfoSpeaker: defineAsyncComponent(() => import('@/modules/client/pages/speakers/InfoSpeaker')),
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
          localStorage.setItem("listSpeakers", JSON.stringify(this.listSpeakers));
        }).catch( error => {
          console.log('error... ', error)
        })
    },
    clickSpeaker( speaker ) {
      this.$refs.modalInfoSpeaker.setInfoSpeaker( speaker )
    },
  },
  computed: {
    getSpeakers() {
      let speakers = this.listSpeakers.slice(0, 4) 
      for (let index = 0; index < speakers.length; index++) {
        speakers[index].color = this.listColorSpeakers[index]
      }
      return speakers
    }
  },
  created() {
    this.eventID = localStorage.getItem("eventId")
    this.listSpeakers = JSON.parse( localStorage.getItem('listSpeakers') ) || []
    
    if ( this.listSpeakers.length === 0 ) this.getSpeakersEvent()
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