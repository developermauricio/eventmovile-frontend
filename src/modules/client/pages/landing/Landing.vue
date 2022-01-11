<template>
<h1>Hola Landing</h1>
  <router-link to="/login">Ir al login</router-link>
</template>

<script>
export default {
  name: "Landing",

  data() {
    return{
      event:{},
      eventId:0,
      onLogin:false,
      onRegister:false,
      styles:[],
      // uriImg: process.env.VUE_APP_API_URL_FILES,
      contPswd:'0',
    }
  },

  props:{
    webAppPath: {
      type: String,
      default:''
    },
    inSession:{
      type:Boolean,
      default:false
    },
    dataUser:{
      type: String,
      default:'data user'
    }
  },

  mounted(){

    if(this.webAppPath!=='')             {
      localStorage.setItem('webAppPath',this.webAppPath)
    }
    let validPath = localStorage.getItem('webAppPath')
    if(validPath!==''){
      this.validWebApp(validPath)
    }else{
      this.validWebApp(this.webAppPath)
    }
    // setTimeout(() => this.validNotifications(), 5000);
  },

  methods:{
    validWebApp(path_web_app){
      let data = new FormData
      data.append('path_wep_app',path_web_app)
      window.axios.post('validPathEvent',data).then(res=>{
        this.eventId = res.data[0].id
        localStorage.setItem('eventId',this.eventId)
        //cargamos los styles
        // this.getStyles(res.data[0].id)
        //traemos la info del evento
        this.getEvent()
      }).catch(err=>{
        // this.$swal("No existe evento asociado a este dominio")
        console.log(err)
        this.$router.push({ name: "notFoundPage"})
      })
    },

    getEvent(){
      window.axios.get(`showEvent/${this.eventId}`).then(response =>{
        this.event = response.data[0]
        this.contPswd = response.data[0].password.trim()
        console.log('CONTPSWD ',this.contPswd)
        console.log('event ',this.event)
      })
    },
  }
}
</script>

<style scoped>

</style>