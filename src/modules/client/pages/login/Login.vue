<template>
  <!-- Login Wrapper Area -->
  <div class="login-wrapper d-flex align-items-center justify-content-center">
    <div class="custom-container">
      <div class="text-center px-4"><img class="login-intro-img" src="img/bg-img/36.png" alt=""></div>
      <!-- Register Form -->
      <div class="register-form mt-4">
        <h6 class="mb-3 text-center">Log in to continue to Affan.</h6>
        <form action="page-home.html">
          <div class="form-group">
            <input v-model="form.email" class="form-control" type="email" placeholder="Correo electrónico">
          </div>
<!--          <div class="form-group position-relative">-->
<!--            <input class="form-control" id="psw-input" type="password" placeholder="Enter Password">-->
<!--            <div class="position-absolute" id="password-visibility"><i class="bi bi-eye"></i><i class="bi bi-eye-slash"></i></div>-->
<!--          </div>-->
          <button class="btn btn-primary w-100" type="submit" @click.prevent="onSubmit">Sign In</button>
        </form>
      </div>
      <!-- Login Meta -->
      <div class="login-meta-data text-center"><a class="stretched-link forgot-password d-block mt-3 mb-1" href="page-forget-password.html">Forgot Password?</a>
        <p class="mb-0">Didn't have an account? <a class="stretched-link" href="page-register.html">Register Now</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  props: {
    webAppPath:{
      type:String
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
      eventId: 0,
      pswd:''
    };
  },

  methods:{
    onSubmit() {
      window.axios.get(`showEvent/${this.eventId}`).then(response =>{
        this.pswd = response.data[0].password.trim()
        let data = {
          email:this.form.email,
          password:this.pswd,
          eventId: this.eventId,
        };
        window.axios.post("auth/basic", data)
            .then((response) => {
              const user = response.data;
              localStorage.setItem("_current_user_name", user.name);
              localStorage.setItem("_current_user_company", user.company_id);
              localStorage.setItem("_current_user_lastname", user.lastname);
              localStorage.setItem("_current_user_id", user.id);
              localStorage.setItem("_current_user_email", user.email);
              localStorage.setItem("_current_model_id", user.model_id);
              localStorage.setItem("_current_token", user.token);
              window.axios.defaults.headers.common[
                  "Authorization"
                  ] = `Bearer ${user.token}`;
              let dataUserQr = JSON.stringify(user)
              this.$router.push({ name: "Home", params:{inSession:true,dataUser:dataUserQr}});
              // this.$router.push({ name: "indexWA", params:{inSession:true,dataUser:dataUserQr}});
            })
            .catch((error) => {
              if (error.response.status == 401) {
                // this.$swal({
                //   icon: "error",
                //   text: this.$t("pages.Auth.Login.emailOrPasswordWasNotCorrect"),
                // });
              }
              //target="_blanck" href='#/Register-Event?eventId=${this.event}'
              if (
                  error.response.status == 422 &&
                  typeof error.response.data.error.email !== "undefined"
              ) {
                if (
                    error.response.data.error.email[0] ==
                    "The selected email is invalid."
                ) {
                  this.$swal
                      .fire({
                        icon: "info",
                        text: this.$t("pages.Auth.Login.weDidNotFindAccount"),
                        showCancelButton: false,
                        confirmButtonText: this.$t("pages.Auth.Login.signUp"),
                        showCloseButton: true,
                        preConfirm: () => {
                          return { event: this.event };
                        },
                      })
                      .then((result) => {
                        if (result.isConfirmed) {
                          if (this.paymentActive) {
                            this.$router.push({
                              name: "Register-Event",
                              query: {
                                eventId: result.value.event,
                                payment: true,
                                ticket_id: this.ticket_id,
                                quanty: this.quanty,
                              },
                            });
                          } else {
                            window.location.href =
                                "#/Register-Event?eventId=" + result.value.event;
                          }
                        }
                      });
                } else {
                  // this.$swal({
                  //   icon: "error",
                  //   text: this.$t("pages.Auth.Login.emailOrPasswordWasNotCorrect"),
                  // });
                }
              } else {
                // this.$swal({
                //   icon: "error",
                //   text: this.$t("pages.Auth.Login.emailOrPasswordWasNotCorrect"),
                // });
              }
            });
      })
    },
  },

  mounted() {
    this.eventId = localStorage.getItem("eventId")
  },
}
</script>

<style scoped>

</style>