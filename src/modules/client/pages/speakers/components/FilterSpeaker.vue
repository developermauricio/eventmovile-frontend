<template>
    <div :class="{'show': showFilter}" class="offcanvas offcanvas-bottom" :style="{'visibility' : showFilter ? 'visible' : 'hidden'}" id="">

        <div class="header-content position-relative d-flex align-items-center justify-content-between">
            <!-- Back Button -->
            <div class="back-button">
                <h4 class="mb-0 position-relative text-center fw-bold ps-3 mt-1">Filtrar por</h4>
            </div>
            <!-- Page Title -->
            <div class="page-heading">
                <button @click="closeFilter()" class="btn-close text-reset" type="button"></button>
            </div>
        </div>

        <div class="container mt-3">
            <h6>País</h6>
            <div class="card">
                <div class="card-body">
                    <div class="direction-rtl">
                        <template v-for="speaker in listSpeakers" :key="speaker.id">
                            <span @click="selectedFilter(speaker)" 
                                class="m-1 badge rounded-pill bg-light text-black mb-2" 
                                v-bind:class="{ 'selected' : selectedCountry(speaker) }">{{ speaker.name }}</span>
                        </template>
                    </div>
                </div>
            </div>
        </div>

        <div class="main-content-buttons">
            <div v-if="listEmpty" class="error-filter">Para aplicar el filtro seleccione al menos un parametro</div>
            <div class="content-buttons">
                <button @click="closeFilter()" class="btn btn-secondary mar-bott" type="submit">Cancelar</button>
                <button @click="applyFilter()" class="btn btn-primary mar-bott" type="submit">Aplicar</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "FilterSpeaker",
  data(){
    return {
        showFilter: false,
        listEmpty: false,
        listSpeakers: [],
        countriesSelected: [],
    }
  },
  methods: {
    showFilterSpeaker( list ) {
        this.getCountrySpeaker( list )
        this.listEmpty = false;
        this.showFilter = true
    },
    getCountrySpeaker( list ) {
        list.map( speaker => {
            let exists = this.listSpeakers.some((item) => { return item.name === speaker.name })
            if ( !exists && speaker.name ) this.listSpeakers.push(speaker)
        })
    },
    closeFilter() {
        this.countriesSelected = []
        this.$emit('actionCloseFilter')
        this.showFilter = false
    },
    applyFilter() {
        if ( this.countriesSelected.length ) {
            this.listEmpty = false;
            this.$emit('actionFilter', this.countriesSelected)
            this.showFilter = false
        } else {
            this.listEmpty = true;
        }
    },
    selectedFilter( speaker ){
      let exists = this.countriesSelected.some((item) => {return item.speaker_id === speaker.speaker_id})

      if ( exists ) {
        let pos = this.countriesSelected.indexOf( speaker )
        if ( pos !== -1 ) this.countriesSelected.splice(pos, 1)
      } else {
        this.countriesSelected.push(speaker)
      }
    },
    selectedCountry( speaker ){
      return this.countriesSelected.find( spe => spe.speaker_id === speaker.speaker_id )
    }
  }
}
</script>

<style scoped>
.offcanvas-bottom {
  height: 100vh !important;
}
.badge{
  font-weight: 300 !important;
  padding: 10px 12px !important;
}
.card-body {
  padding: 0.5rem !important;
}
.selected{
  background-color: #aa47bc7d !important;
}
.main-content-buttons {
    width: 100%;
    position: fixed;
    bottom: 3rem;
}
.content-buttons {
    text-align: center;
}
.mar-bott {
    margin: 0 1rem;
}
.error-filter {
    text-align: center;
    font-size: 14px;
    color: #e84438;
    padding: 1rem 0;
}
</style>