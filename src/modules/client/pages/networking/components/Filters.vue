<template>
  <div class="offcanvas offcanvas-bottom" id="modalFilterNetworking" tabindex="-1"
       aria-labelledby="modalFilterNetworking">

    <div class="header-content position-relative d-flex align-items-center justify-content-between">
      <!-- Back Button -->
      <div class="back-button">
        <h4 class="mb-0 position-relative text-center fw-bold ps-3 mt-1">Filtar por</h4>
      </div>
      <!-- Page Title -->
      <div class="page-heading">
        <button class="btn-close text-reset" type="button" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
    </div>

    <div class="container ms-0 me-0">
      <div class="card">
        <div class="card-body">
          <div class="direction-rtl">
            <span @click="selectedFilter(country)" class="m-1 badge rounded-pill bg-light text-black mb-2" v-bind:class="{ 'selected' : selectedCountry(country) }" v-for="country in countries" :key="country.id">{{ country.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Filters",
  data(){
    return {
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
    selectedFilter(country){
      let exists = this.countriesSelected.some((item) => {return item.id === country.id})
      if (!exists) {
        this.countriesSelected.push(country)
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
  height: 50% !important;
}
.badge{
  font-weight: 300 !important;
}
.card-body {
  padding: 0.5rem !important;
}
.selected{
  background-color: #F3E5F5 !important;
}
</style>