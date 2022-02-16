<template>
  <div>
    <!-- Header Area -->
    <div class="header-area header-home" id="">
      <div class="container">
        <div class="header-content header-style-five position-relative d-flex align-items-center justify-content-between">
          <!-- Logo Wrapper -->
          <router-link v-if="eventId" :to="`/${urlBack}`">
            <svg class="bi bi-arrow-left-short" width="32" height="32" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"></path>
            </svg>
          </router-link>
          <div v-else style="opacity:0">Go back</div>
          <!-- Navbar Toggler -->
          <div class="chat-user--info d-flex align-items-center">
            <div class="user-thumbnail-name  ms-4">
              <a @click="goRegisterEvent" href="#" class="text-register">REGISTRATE</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Login Wrapper Area -->
    <div class="login-wrapper d-flex align-items-center justify-content-center">  
      <div class="custom-container">
        <!-- Danger Toast-->
        <div :class="{'show': showAlert}" class="toast custom-toast-1 toast-danger mb-5" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="5000" data-bs-autohide="false">
          <div class="toast-body">
            <div class="toast-text">
              <p class="mb-0 text-white">Es requerida la información del evento.</p><small class="d-block">Ejemplo: {{ urlBase }}nombre-evento</small>
            </div>
          </div>
          <button @click="closeAlert" class="btn btn-close btn-close-white position-absolute p-1" type="button" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>

        <div class="text-center px-4">
          <img class="login-intro-img" :src="this.styles.home_img_logo ? this.urlBaseFile + this.styles.home_img_logo : 'assets/img/img-generic.png'" width="180" alt="Logo evento">
        </div>
        <!-- Register Form -->
        <div class="register-form mt-4">
          <h6 class="mb-3 text-center text-title">Ingresa tu correo para validar tu identidad</h6>
          <form action="page-home.html">
            <div class="form-group">
              <input v-model="form.email" @input="changeValue" class="form-control" type="email" placeholder="Correo electrónico" required>
              <div class="error-email">
                {{ errorEmail }}
              </div>
            </div>
            <div class="px-5">
              <button class="btn btn-primary w-100" type="submit" @click.prevent="onSubmit">INGRESAR</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Login",
  props: {
    webAppPath: {
      type: String
    },
  },
  data() {
    return {
      urlBaseFile: process.env.VUE_APP_API_URL_FILES,
      urlBase: process.env.VUE_APP_URL_FRONT,
      styles: {},
      form: {
        email: "",
        password: "",
      },
      errorEmail: '',
      eventId: null,
      urlBack: '',
      event: {},
      validatorEmail: null,
      fullPage: false,
      loader: null,
      showAlert: false,
    };
  },
  methods: {
    getEvent() {
      window.axios.get(`showEvent/${this.eventId}`)
        .then(response => {
          this.event = response.data[0]
        })
    },
    changeValue() {
      this.errorEmail = ''
      this.validatedEmail()
    },
    validatedEmail() {
      if ( this.form.email ) {        
        this.errorEmail = this.validator.test(this.form.email) ? '' : 'El correo electrónico debe ser valido.'        
      } else {
        this.errorEmail = 'El correo electrónico es requerido.'
      }
    },
    setInfoLocalUser( user ) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("_current_token", user.token);
    },
    goRegisterEvent() {
      if ( !this.urlBack ) {
        this.showContentAlert()
        return
      }

      this.$router.push({path: "/register"})
    },
    onSubmit() {
      if ( this.urlBack === '' ) {
        this.showContentAlert()
        return;
      }

      this.validatedEmail()
      
      if ( this.errorEmail ) return;
 
      const dataLogin = {
        email: this.form.email,
        password: this.event.password.trim(),
        eventId: this.eventId,
      };

      this.loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.containerLoarder,
        canCancel: false,
      });
      window.axios.post("auth/basic", dataLogin)
        .then( response => {
          this.loader.hide()
          const user = response.data;
          this.setInfoLocalUser(user)
          window.axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
          let dataUserQr = JSON.stringify(user)          
          this.$router.push({name: "Home", params: {inSession: true, dataUser: dataUserQr}});
        })
        .catch( error => {
          this.loader.hide()
          console.log('error login:  ', error)
          if (error.response.status == 401) {
            console.log('Usuario o contraseña incorrectos');
          }
          if ( error.response.status == 422 && typeof error.response.data.error.email !== "undefined" ) {
            console.log('El usuario no se encuentra registrado en el evento.');
            this.$swal.fire({
              title: 'Sin registro',
              text: "El usuario ingresado no se encuentra registrado. ¿Desea registrase?",
              icon: 'info',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si',
              cancelButtonText: 'No',
            }).then((result) => {
              if (result.isConfirmed) {
                this.$router.push({path: "/register"})
              }
            })
          }
        }); 
      
    },
    getStyleLocalStorage(){
      let styleEvent = localStorage.getItem('style-event')
      this.styles = JSON.parse(styleEvent)
    }, 
    showContentAlert() {
      this.showAlert = true

      setTimeout( () => {
        this.showAlert = false
      }, 5000)
    },
    closeAlert() {
      this.showAlert = false;
    }
  },
  created() {
    this.urlBack = localStorage.getItem("webAppPath") || ''
    this.eventId = localStorage.getItem("eventId") || ''
    this.validator = RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");

    if ( this.eventId ) {
      this.event = JSON.parse( localStorage.getItem('event') ) || {}
      if ( !this.event ) this.getEvent()
      this.getStyleLocalStorage()
    }
  },
}
</script>

<style scoped>
.text-title{
  color: #000000;
  font-size: 0.8rem;
}
.header-content svg{
  color: #AA47BC !important;
}
.text-register{
  color: #AA47BC !important;
}
.header-area{
  border: none !important;
}
.error-email {
  color: #ea4c62;
  margin-top: 1rem;
  font-size: 0.8rem;
  padding-left: 5px;
}
</style>