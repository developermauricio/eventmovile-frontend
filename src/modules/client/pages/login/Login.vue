<template>
  <div>
    <!-- Header Area -->
    <div class="header-area header-home" id="headerArea">
      <div class="container">
        <div class="header-content header-style-five position-relative d-flex align-items-center justify-content-between">
          <!-- Logo Wrapper -->
          <router-link :to="`/${urlBack}`">
            <svg class="bi bi-arrow-left-short" width="32" height="32" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"></path>
            </svg>
          </router-link>
          <!-- Navbar Toggler -->
          <div class="chat-user--info d-flex align-items-center">
            <div class="user-thumbnail-name  ms-4">
              <a href="" class="text-register">REGISTRATE</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Login Wrapper Area -->
    <div class="login-wrapper d-flex align-items-center justify-content-center">
      <div class="custom-container">
        <div class="text-center px-4">
          <img class="login-intro-img" src="assets/img/logo-pm.png" alt="">
        </div>
        <!-- Register Form -->
        <div class="register-form mt-4">
          <h6 class="mb-3 text-center text-title">Ingresa tu correo para validar tu identidad</h6>
          <form action="page-home.html">
            <div class="form-group">
              <input v-model="form.email" class="form-control" type="email" placeholder="Correo electrónico" required>
              <div class="error-email">
                {{ errorEmail }}
              </div>
            </div>
            <!--          <div class="form-group position-relative">-->
            <!--            <input class="form-control" id="psw-input" type="password" placeholder="Enter Password">-->
            <!--            <div class="position-absolute" id="password-visibility"><i class="bi bi-eye"></i><i class="bi bi-eye-slash"></i></div>-->
            <!--          </div>-->
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
      uriImg: process.env.VUE_APP_API_URL_FILES,
      styles: [],
      form: {
        email: "",
        password: "",
      },
      errorEmail: '',
      eventId: 0,
      urlBack: '',
      event: {},
    };
  },

  methods: {
    getEvent() {
      window.axios.get(`showEvent/${this.eventId}`)
        .then(response => {
          this.event = response.data[0]
        })
    },
    setInfoLocalUser( user ) {
      localStorage.setItem("_current_user_name", user.name);
      localStorage.setItem("_current_user_company", user.company_id);
      localStorage.setItem("_current_user_lastname", user.lastname);
      localStorage.setItem("_current_user_id", user.id);
      localStorage.setItem("_current_user_email", user.email);
      localStorage.setItem("_current_model_id", user.model_id);
      localStorage.setItem("_current_token", user.token);
    },
    onSubmit() {
      if ( this.urlBack === '' ) {
        alert('Es requerida la información del evento en la url.')
        return;
      }


      if ( this.form.email === '' ) {
        this.errorEmail = 'Por favor ingrese el correo electrónico'
        return
      }

      // TODO falta validar el correo ingresado

      const dataLogin = {
        email: this.form.email,
        password: this.event.password.trim(),
        eventId: this.eventId,
      };

      window.axios.post("auth/basic", dataLogin)
        .then( response => {
          const user = response.data;
          this.setInfoLocalUser(user)
          window.axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
          let dataUserQr = JSON.stringify(user)
          this.$router.push({name: "Home", params: {inSession: true, dataUser: dataUserQr}});
        })
        .catch( error => {
          console.log('error login:  ', error)
          if (error.response.status == 401) {
            console.log('Usuario o contraseña incorrectos');
          }
          if ( error.response.status == 422 && typeof error.response.data.error.email !== "undefined" ) {
            console.log('El usuario no se encuentra registrado en el evento.');
          }
        });
      
    },
  },

  created() {
    this.urlBack = localStorage.getItem("webAppPath") || ''
    this.eventId = localStorage.getItem("eventId")

    if ( this.eventId ) this.getEvent()
  },

  mounted() { },
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