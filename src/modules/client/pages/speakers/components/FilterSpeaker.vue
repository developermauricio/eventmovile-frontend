<template>
    <!-- <div class="offcanvas offcanvas-bottom" id="modalFilterNetworking" tabindex="-1" aria-labelledby="modalFilterNetworking"> -->
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
            <h6>Día</h6>
            <div class="card">
                <div class="card-body">
                    <div class="direction-rtl">
                        <span class="m-1 badge rounded-pill bg-light text-black mb-2" v-for="day in listDay" :key="day.id">{{ day.name }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="container mt-3">
            <h6>Modalidad</h6>
            <div class="card">
                <div class="card-body">
                    <div class="direction-rtl">
                        <span class="m-1 badge rounded-pill bg-light text-black mb-2" v-for="modalidad in modalidades" :key="modalidad.id">{{ modalidad.name }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="container mt-3">
            <h6>País</h6>
            <div class="card">
                <div class="card-body">
                    <div class="direction-rtl">
                        <span @click="selectedFilter(country)" class="m-1 badge rounded-pill bg-light text-black mb-2" v-bind:class="{ 'selected' : selectedCountry(country) }" v-for="country in countries" :key="country.id">{{ country.name }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="main-content-buttons">
            <div class="content-buttons">
                <button @click="closeFilter()" class="btn btn-secondary mar-bott" type="submit">Cancelar</button>
                <button @click="closeFilter()" class="btn btn-primary mar-bott" type="submit">Aplicar</button>
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
        listDay: [
            { id: 1, name: 'Oct 10' },
            { id: 2, name: 'Hoy' },
            { id: 3, name: 'Mañana' },
            { id: 4, name: 'Esta semana' },
        ],
        modalidades: [
            { id: 1, name: 'Online'  },
            { id: 2, name: 'Presencial'  },
            { id: 3, name: 'On Demanda'  },
        ],
        countries: [
            { id:1, name: 'Colombia' },
            { id:2, name: 'Estados Unidos' },
            { id:3, name: 'Argentina' },
            { id:4, name: 'España' },
            { id:5, name: 'Francia' },
            { id:6, name: 'Portugal' },
        ],            
        countriesSelected: []
    }
  },
  methods: {
    showFilterSpeaker() {
        console.log('mostrar filtro')
        this.showFilter = true
        console.log('mostrar filtro: ', this.showFilter)
    },
    closeFilter() {
        this.showFilter = false
    },
    selectedFilter(country){
      let exists = this.countriesSelected.some((item) => {return item.id === country.id})
      if (!exists) {
        this.countriesSelected.push(country)
        this.$emit('dataFilter', this.countriesSelected)
      }
    },
    selectedCountry(country){
      return this.countriesSelected.find(c => c.id === country.id)
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
  background-color: #F3E5F5 !important;
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
</style>