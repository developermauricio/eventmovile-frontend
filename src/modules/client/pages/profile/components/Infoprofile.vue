<template>
  <div class="card user-data-card">
    <div class="card-body">
      <form action="#">
        <div class="form-group mb-3">
          <label class="form-label">Nombre</label>
          <p>{{ dataUser }}</p>
        </div>
        <div class="form-group mb-3">
          <label class="form-label">Correo electrónico</label>
          <p>silviotista93@gmail.com</p>
        </div>
        <div class="form-group mb-3">
          <label class="form-label">Empresa</label>
          <p>Creategicalatina</p>
        </div>
        <button @click="loggout" class="btn btn-danger w-100" type="submit">Cerrar sesión</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Infoprofile",
  data(){
    return {
      dataUser: '',
    }
  },
  methods:{
    loggout(){
      localStorage.clear()
      this.$router.push('Login')
    }
  },
  mounted() {
    this.dataUser = localStorage.getItem("_current_user_name") + ' ' + localStorage.getItem("_current_user_lastname");
  },
}
</script>

<style scoped>

</style>