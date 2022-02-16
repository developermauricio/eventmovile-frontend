<template>
    <!-- Bootstrap Basic Modal -->
    <div :class="{'show': showModalTermCond}" class="modal fade" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title" id="exampleModalLabel">Términos y condiciones</h6>
            <button @click="showModalTermCond = !showModalTermCond" class="btn btn-close p-1 ms-auto" type="button"></button>
          </div>
          <div class="modal-body">
            <p class="mb-0">{{ habeasdata.content }}</p>
          </div>
          <div class="modal-footer">
            <button @click="showModalTermCond = !showModalTermCond" class="btn btn-sm btn-primary" type="button">Cerrar</button>
          </div>
        </div>
      </div>
    </div>

    <div :class="{'show': showModalTermCond}" class="offcanvas-backdrop fade" style="display: none"></div>

    <!-- Login Wrapper Area -->
    <div class="login-wrapper d-flex align-items-center justify-content-center">
        <div class="custom-container">
            <div class="text-center mb-5">
                <h2>Formulario de Registro</h2>
                <p>Lo invitamos a ingresar los siguientes datos para poder acceder al evento</p>
                <h5>¡{{ event.name }}!</h5>
            </div>

            <!-- Falta subir la foto -->
            <div v-if="this.event.image_on_register && this.event.image_on_register == 1" class="text-center px-4">
                <img class="login-intro-img" src="/assets/img/img-generic.png" alt="">
            </div>

            <!-- Register Form -->
            <div class="register-form mt-4">
                <form @submit.prevent="SendInfoUser" action="page-otp.html">
                    <!-- Terminos y condiciones -->
                    <template v-if="habeasdata.position == 'up'">
                        <div class="form-check mb-3">
                            <input v-model="checkTerm" class="form-check-input" type="checkbox" id="checkTermCond">
                            <label for="checkTermCond">
                                <a v-if="habeasdata.type=='file'" :href="uriImg+'storage/'+habeasdata.content" target="_black">Aceptar términos y condiciones.</a>
                                <a v-if="habeasdata.type=='url'" :href="habeasdata.content" target="_black">Aceptar términos y condiciones.</a>
                                <span v-else @click="showModalTermCond = !showModalTermCond" class="form-check-label text-muted fw-normal">Aceptar términos y condiciones.</span>
                            </label>
                        </div>
                    </template>

                    <div class="form-group">
                        <label class="form-label">Nombre</label>
                        <input v-model="newUser.name" class="form-control" type="text" placeholder="Ingrese nombre." required>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Apellido</label>
                        <input v-model="newUser.lastname" class="form-control" type="text" placeholder="Ingrese apellido." required>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Correo electrónico</label>
                        <input v-model="newUser.email" class="form-control" type="email" placeholder="Ingrese correo electrónico." required>
                    </div>

                    <!-- Dymanic form -->
                    <template v-for="(field, index) in fieldsEvent" :key="index">
                        <div v-if="field.type == 'text' || field.type == 'number' || field.type == 'textarea'" class="form-group">
                            <label class="form-label">{{ field.name }} <template v-if="field.required === 1">*</template></label>
                            <input v-model="field.value" class="form-control" :type="field.type" :placeholder="'Ingrese '+field.name" :required="field.required == 1 ? true : false">
                        </div>
                        <!-- TODO: Falta validar campo tipo select -->
                    </template>
                    
                    <!-- Terminos y condiciones -->
                    <template v-if="habeasdata.position == 'down'">
                        <div class="form-check mb-3">
                            <input v-model="checkTerm" class="form-check-input" type="checkbox" id="checkTermCond" required>
                            <label for="checkTermCond">
                                <a v-if="habeasdata.type=='file'" :href="uriImg+'storage/'+habeasdata.content" target="_black">Aceptar términos y condiciones.</a>
                                <a v-if="habeasdata.type=='url'" :href="habeasdata.content" target="_black">Aceptar términos y condiciones.</a>
                                <span v-else @click="showModalTermCond = !showModalTermCond" class="form-check-label text-muted fw-normal">Aceptar términos y condiciones.</span>
                            </label>
                        </div>
                    </template>

                    <button class="btn btn-primary w-100" type="submit">Registrarme</button>
                </form>
            </div>
            <!-- Login Meta -->
            <div class="login-meta-data text-center">
                <p class="mt-3 mb-0">
                    ¿Ya tienes una cuenta? 
                    <router-link to="/login" class="stretched-link">Login</router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { getSendRequest, postSendRequest } from '@/utils/using-axios';

export default {
    name: 'Register',
    data() {
        return {
            event: {},
            fieldsEvent: [],
            habeasdata: [],
            checkTerm: false,
            newUser: {
                name: '',
                lastname: '',
                email: '',
                password: 'password',         
                event: 0,
                event_type_id: null,       
            },
            loader: null,
            fullPage: false,
            uri: process.env.VUE_APP_API_URL,
            uriImg:process.env.VUE_APP_API_URL_FILES,
            showModalTermCond: false,
        }
    },
    methods: {
        eventActived() {
            let endDate = this.$dayjs(this.event.end_date).format('YYYY-MM-DD HH:mm:ss')
            let nowDate = this.$dayjs().format('YYYY-MM-DD HH:mm:ss')

            if ( !this.event.actived || endDate <= nowDate ) {
                this.$swal({ icon: 'error', text: 'El proceso de registro ya fue cerrado.' })
                this.$router.push({path: '/login'});
            }
        },       
        async SendInfoUser() {
            this.loader = this.$loading.show({
                container: this.fullPage ? null : this.$refs.containerLoarder,
                canCancel: false,
            });
            // TODO: falta validar los datos, los fieldsEvent tambien se validan

            if ( this.event.password ) {
                this.newUser.password = this.event.password
            } 

            this.newUser.event = this.event.id
            
            //TODO: Revisar la parte de la imagen de perfil.

            /***  Guardar nuevo usuario  ***/
            const newResponse = await postSendRequest( 'auth/register', this.newUser )            
            console.log('new user: ', newResponse)
            let userCreated = newResponse.data

            /***  Validar los campos extra del registro  ***/
            let emptyfields = false

            this.fieldsEvent.forEach( field => {
                if ( field.value ) emptyfields = true
            })

            /***  Guardar campos extra del registro  ***/
            if ( emptyfields ) {
                await Promise.all( this.fieldsEvent.map( async item => {
                    let dataValue = {
                        register_id: item.id,
                        user_id: userCreated.id,
                        value: item.value
                    }
                    
                    await postSendRequest('dataRegistersExternal', dataValue)
                }))
            }

            /***  Asociar el usuario al evento  ***/
            const eventUser = {
                user_id: userCreated.id,
                event_id: this.newUser.event,
                event_type_id: this.newUser.event_type_id,
                message_email_1: 'Registro exito',
                message_email_2: 'Virtual / Presencial',
                message_email_3: 'Ir al sitio del evento',
                message_email_4: 'Salas',
                message_email_5: 'Inicia/',
                message_email_6: 'Termina/',
                message_email_7: 'Añadir a calendario'
            }            
            
            await postSendRequest('eventUsers', eventUser)

            this.goTopHome()
        },
        async goToHome() {            
            const dataLogin = {
                email: this.newUser.email,
                password: this.newUser.password,
                eventId: this.newUser.event,
            };

            const loginUser =  await postSendRequest('auth/basic', dataLogin)
            console.log('loginUser: ', loginUser)

            this.loader.hide()

            if ( loginUser ) {
                localStorage.setItem("user", JSON.stringify(loginUser));
                localStorage.setItem("_current_token", loginUser.token);
                window.axios.defaults.headers.common["Authorization"] = `Bearer ${loginUser.token}`;
                this.$router.push({path: "/"});
            }
        },
        async validateEmailNewUser() {
            let em = 'rodinsonst@gmail.com'
            const validateEmail = await getSendRequest(`validateUser/${em}`)
            console.log('retorno esto: ', validateEmail)
        }
       
    },
    async created() {
        this.event = JSON.parse( localStorage.getItem('event') ) || {}

        if ( !this.event.id ) this.$router.push({path: '/login'});

        this.loader = this.$loading.show({
            container: this.fullPage ? null : this.$refs.containerLoarder,
            canCancel: false,
        });
        
        this.eventActived()

        let listFieldsEvent = await getSendRequest( `fieldsEventExternal/${this.event.id}` )
        if ( listFieldsEvent ) this.fieldsEvent = listFieldsEvent.data;

        let listHabeasdata = await getSendRequest( `habeasdataExternal/${this.event.id}` )
        if ( listHabeasdata ) this.habeasdata = listHabeasdata
        
        this.loader.hide()

        //TODO: falta revisar cuando el password del evento sea nulo, es necesario una contraseña 
        //TODO: falta validar el numero de personas que asisten al evento, si supera el # no se debe registrar.

        this.validateEmailNewUser();        
    }
}
</script>

<style scoped>
.show {
    display: block !important;
}
</style>