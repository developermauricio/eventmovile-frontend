<template>
  <div :style="{'display' : showSearch ? 'block' : 'none'}" class="container offcanvas-body p-1">
    <div class="chat-search-box py-1">
      <form action="#">
        <div class="input-group">
                    <span class="input-group-text">
                        <i class="bi bi-search"></i>
                    </span>
          <input v-model="inputSearch" @input="inputActionSearch" class="form-control" type="search" placeholder="Buscar..." aria-describedby="searchbox">
          <span class="style-close-search">
                        <button @click="closeSearch()" class="btn-close text-reset" type="button"></button>
                    </span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchFeria",
  data() {
    return {
      showSearch: false,
      inputSearch: '',
    }
  },
  methods: {
    showSearchFeria() {
      this.showSearch = !this.showSearch
    },
    closeSearch() {
      this.showSearch = false
    },
    inputActionSearch() {
      this.$emit('actionSearch', this.inputSearch)
    }
  },
}
</script>

<style scoped>

</style>