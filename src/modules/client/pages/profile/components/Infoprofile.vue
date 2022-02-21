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
      urlBase: process.env.VUE_APP_API_URL,
    }
  },  
  methods:{
    inactiveOnlineUser(){
      window.axios.post(`${this.urlBase}/inactive-online-user/${this.dataUser.id}`).then(response =>{
        console.log(response)
      }).catch(err =>{
        console.log(err)
      })
    },
    loggout(){
      this.inactiveOnlineUser()
      localStorage.removeItem('itemsGallery')
      localStorage.removeItem('listUserChat')
      localStorage.removeItem('listChat')
      localStorage.removeItem('user')
      localStorage.removeItem('_current_token')
      localStorage.removeItem('listSpeakers')
      localStorage.removeItem('galleryHome')
      this.$router.push('Login')
    }
  },
  created() {
    this.fullName = this.dataUser.name + ' ' + this.dataUser.lastname
  },
  mounted() {

  },
}
</script>

<style scoped>

</style>