<template>
  <!-- Header Area -->
  <div class="header-area" id="">
    <div class="container">
      <!-- Header Content -->
      <div class="header-content position-relative d-flex align-items-center justify-content-between">
        <!-- Back Button -->
        <div class="back-button">
          <router-link to="/">
            <svg class="bi bi-arrow-left-short icon-back" width="32" height="32" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"></path>
            </svg>
          </router-link>
        </div>
        <!-- Page Title -->
        <div class="page-heading">
          <h6 class="mb-0 position-relative text-center fw-bold style-color-title">Mapa del evento</h6>
        </div>
        <div class="setting-wrapper"></div>
      </div>
    </div>
  </div>

  <div class="style-content-map">
    <img :src="urlImgMap ? urlBaseFile + urlImgMap : 'assets/img/img-generic.png'" alt="Img map">
  </div>
</template>

<script>
export default {
  name: "Map",
  data() {
    return {
        urlBaseFile: process.env.VUE_APP_API_URL_FILES,
        urlImgMap: '',
        eventId: '',
    }
  },
  methods: {
    getMap() {
        window.axios.get( 'getMapa/'+this.eventId )
            .then( response => {            
                this.urlImgMap = response.data.data
            }).catch( error => {
                console.log('error get map: ', error)
            })
    }
  },
  created() {
    this.eventId = localStorage.getItem("eventId") || ''

    if ( this.eventId ) this.getMap()
  }
}
</script>

<style scoped>
.style-content-map {
    margin-top: 80px;
    text-align: center;
}
</style>