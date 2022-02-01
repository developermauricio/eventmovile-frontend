<template>
  <div class="card user-data-card">
    <div class="card-body">
      <div>
        <div class="form-group mb-3">
          <label class="form-label">Nombre</label>
          <p>{{ fullName }}</p>
        </div>
        <div class="form-group mb-3">
          <label class="form-label">Correo electrónico</label>
          <p>{{ dataUser.email ? dataUser.email : 'Por definir' }}</p>
        </div>
        <div class="form-group mb-3">
          <label class="form-label">Empresa</label>
          <p>{{ dataUser.company ? dataUser.company : 'Por definir' }}</p>
        </div>
        <button @click="loggout" class="btn btn-danger w-100" type="submit">Cerrar sesión</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Infoprofile",
  props: {
    dataUser: {
      type: Object,
      default: function() {
        return {};
      }
    },
  },
  data() {
    return {
      fullName: '',
    }
  },  
  methods:{
    loggout(){
      localStorage.clear()
      this.$router.push('Login')
    }
  },
  created() {
    this.fullName = this.dataUser.name + ' ' + this.dataUser.lastname
  },
  mounted() { },
}
</script>

<style scoped>

</style>