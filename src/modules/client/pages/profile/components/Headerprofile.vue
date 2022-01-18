<template>
  <div class="container-profile">
    <div class="card user-info-card mb-3">
      <div class="card-body d-flex align-items-center">
        <div class="user-profile me-3">
          <img src="assets/img/bg-img/2.jpg" alt="">
        </div>
        <div class="user-info">
          <div class="d-flex align-items-center">
            <h5 class="mb-1">{{ dataUser }}</h5>
          </div>
          <p class="mb-0">Creategicalatina</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Headerprofile",
  data(){
    return {
      dataUser: '',
    }
  },
  mounted() {
    this.dataUser = localStorage.getItem("_current_user_name") + ' ' + localStorage.getItem("_current_user_lastname");
  },
}
</script>

<style scoped>
.container-profile {
  margin-top: 4rem !important;
}
</style>