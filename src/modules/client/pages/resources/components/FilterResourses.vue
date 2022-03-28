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
            <h6>Actividades</h6>
            <div class="card">
                <div class="card-body">
                    <div class="direction-rtl">
                        <template v-for="activity in listActivities" :key="activity.id">
                            <span @click="selectedFilter(activity)" 
                                class="m-1 badge rounded-pill bg-light text-black mb-2" 
                                v-bind:class="{ 'selected' : selectedCountry(activity) }">{{ activity.name }}</span>
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
  name: "FilterResources",
  data(){
    return {
        showFilter: false,
        listActivities: [],
        listActivitiesSelected: [],
        listEmpty: false,        
    }
  },
  methods: {
    showFilterResources( list ) {
        this.listActivities = list
        this.listEmpty = false;
        this.showFilter = true
    },
    closeFilter() {
        this.listActivitiesSelected = []
        this.$emit('actionCloseFilter')
        this.showFilter = false
    },
    selectedFilter( activity ) {
        let exists = this.listActivitiesSelected.some((item) => {return item.id === activity.id})

        if ( exists ) {
            let pos = this.listActivitiesSelected.indexOf( activity )
            if ( pos !== -1 ) this.listActivitiesSelected.splice(pos, 1)
        } else {
            this.listActivitiesSelected.push(activity)
        }
    },
    selectedCountry( activity ){
      return this.listActivitiesSelected.find( act => act.id === activity.id )
    },
    applyFilter() {
        if ( this.listActivitiesSelected.length ) {
            this.listEmpty = false;
            this.$emit('actionFilterResources', this.listActivitiesSelected)
            this.showFilter = false
        } else {
            this.listEmpty = true;
        }
    },
    
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