<template onload="recargar()">
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
                <!-- <img class="login-intro-img" src="/assets/img/img-generic.png" alt=""> -->
                
            </div>

            <!-- Register Form -->
            <div class="register-form mt-4">
                <form @submit.prevent="SendInfoUser" action="page-otp.html">
                    <!-- Terminos y condiciones -->
                    <template v-if="habeasdata.position == 'up'">
                        <div class="form-check mb-4">
                            <input v-model="checkTerm" class="form-check-input" type="checkbox" id="checkTermCond">
                            <label for="checkTermCond">
                                <a v-if="habeasdata.type=='file'" :href="uriImg+'storage/'+habeasdata.content" target="_black">Aceptar términos y condiciones.</a>
                                <a v-if="habeasdata.type=='url'" :href="habeasdata.content" target="_black">Aceptar términos y condiciones.</a>
                                <span v-else @click="showModalTermCond = !showModalTermCond" class="form-check-label text-muted fw-normal">Aceptar términos y condiciones.</span>
                            </label>
                            <div v-if="errors.term.required" :class="{'invalid-feedback': errors.term.required}">{{ errors.term.msg }}</div>
                        </div>
                    </template>

                    <div class="form-group mb-4">
                        <label class="form-label">Nombre <span class="required-data">*</span></label>
                        <input @input="changeValueName" v-model="newUser.name" :class="{'form-is-invalid': errors.name.required}" class="form-control" type="text" placeholder="Ingrese nombre." required>
                        <div v-if="errors.name.required" :class="{'invalid-feedback': errors.name.required}">{{ errors.name.msg }}</div>
                    </div>

                    <div class="form-group mb-4">
                        <label class="form-label">Apellido <span class="required-data">*</span></label>
                        <input @input="changeValueLastName" v-model="newUser.lastname" :class="{'form-is-invalid': errors.lastname.required}" class="form-control" type="text" placeholder="Ingrese apellido." required>
                        <div v-if="errors.lastname.required" :class="{'invalid-feedback': errors.lastname.required}">{{ errors.lastname.msg }}</div>
                    </div>

                    <div class="form-group mb-4">
                        <label class="form-label">Correo electrónico <span class="required-data">*</span></label>
                        <input  @input="changeValueEmail" v-model="newUser.email" :class="{'form-is-invalid': errors.email.required}" class="form-control" type="email" placeholder="Ingrese correo electrónico." required>
                        <div v-if="errors.email.required" :class="{'invalid-feedback': errors.email.required}">{{ errors.email.msg }}</div>
                    </div>

                    <!-- Dymanic form -->
                    <template v-for="(field, index) in fieldsEvent" :key="index">
                        <div v-if="field.type == 'text' || field.type == 'number'" class="form-group mb-4">
                            <label class="form-label">{{ field.name }} <span v-if="field.required === 1" class="required-data">*</span></label>
                            <input v-model="field.value" class="form-control" :type="field.type" :placeholder="'Ingrese '+field.name" :required="field.required == 1 ? true : false">
                        </div>
                        <div v-if="field.type == 'textarea'" class="form-group mb-4">
                            <label class="form-label">{{ field.name }} <span v-if="field.required === 1" class="required-data">*</span></label>
                            <textarea v-model="field.value" class="form-control" :placeholder="'Ingrese '+field.name" :required="field.required == 1 ? true : false"></textarea>
                        </div>
                        <div v-if="field.type == 'select'" class="form-group mb-4">
                            <label class="form-label">{{ field.name }} <span v-if="field.required === 1" class="required-data">*</span></label>
                            <select v-model="field.value" class="form-select form-control-clicked" :required="field.required == 1 ? true : false">
                                <option v-for="item in getOptions(field.options)" :key="item" :value="item.trim()">{{item}}</option>
                            </select>
                        </div>
                    </template>
                    
                    <!-- Terminos y condiciones -->
                    <template v-if="habeasdata.position == 'down'">
                        <div class="form-check mb-4">
                            <input v-model="checkTerm" class="form-check-input" type="checkbox" id="checkTermCond" required>
                            <label for="checkTermCond">
                                <a v-if="habeasdata.type=='file'" :href="uriImg+'storage/'+habeasdata.content" target="_black">Aceptar términos y condiciones.</a>
                                <a v-if="habeasdata.type=='url'" :href="habeasdata.content" target="_black">Aceptar términos y condiciones.</a>
                                <span v-else @click="showModalTermCond = !showModalTermCond" class="form-check-label text-muted fw-normal">Aceptar términos y condiciones.</span>
                                <span class="required-data"> *</span>
                            </label>
                            <div v-if="errors.term.required" :class="{'invalid-feedback': errors.term.required}">{{ errors.term.msg }}</div>
                        </div>
                    </template>

                    <button class="btn btn-primary w-100 mt-2" type="submit">Registrarme</button>
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
import { updateEvent, updateStyles } from '@/utils/update-local-storage';


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
            validatorEmail: null,
            errors: {
                name: { required: false, msg: 'El nombre es requerido.' },
                lastname: { required: false, msg: 'El Apellido es requerido.' },
                email: { required: false, msg: '' },
                term: { required: false, msg: 'Los términos y condiciones son requeridos' }
            }
        }
    },
    methods: {   
        onChangePicture( image ) {
            console.log('New picture selected!')
            if (image) {
                console.log('Picture loaded.')
                this.image = image
            } else {
                console.log('FileReader API not supported: use the <form>, Luke!')
            }
        },
        getOptions( options ) {
            options = options.slice(1)
            options = options.slice(0, -1)
            options = options.split(',')

            return options
        },   
        changeValueName() {
            this.newUser.name ? this.errors.name.required = false : this.errors.name.required = true
        },    
        changeValueLastName() {
            this.newUser.lastname ? this.errors.lastname.required = false : this.errors.lastname.required = true
        },   
        changeValueEmail() {
            if ( this.newUser.email ) {
                if ( this.validatorEmail.test(this.newUser.email) ) {
                    this.errors.email.required = false
                } else {
                    this.errors.email.required = true
                    this.errors.email.msg = 'Ingrese un correo electrónico valido.'
                }                
            } else {
                this.errors.email.required = true
                this.errors.email.msg = 'El correo electrónico es requerido.'
            }
        },
        async validateForm() {
            await this.changeValueName()
            await this.changeValueLastName()
            await this.changeValueEmail()
            let validationOk = false;

            //for ( const [key, val] of Object.entries(this.errors) ) {
            for ( const val of Object.values(this.errors) ) {
                if ( val.required ) validationOk = true
            }

            if ( this.checkTerm ) {
                this.errors.term.required = false
            } else {
                this.errors.term.required = true
                validationOk = true
            }
            console.log('value ok: ', validationOk)
            return validationOk;
        },
        async SendInfoUser() {
            this.loader = this.$loading.show({
                container: this.fullPage ? null : this.$refs.containerLoarder,
                canCancel: false,
            });

            if ( await this.validateForm() ) {
                this.loader.hide()
                return
            }

            // TODO: falta validar los datos, los fieldsEvent tambien se validan
            const validateEmail = await getSendRequest(`validateUser/${this.newUser.email}`)
            console.log('retorno esto: ', validateEmail)            
           
            if ( validateEmail != false ) {
                this.errors.email.required = true
                this.errors.email.msg = 'Este correo electrónico ya se encuentra registrado.'
                this.loader.hide()
                return
            }

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
                if ( field.required ) {
                    if ( field.value ) emptyfields = true
                }                
            })

            /***  Guardar campos extra del registro  ***/
            if ( emptyfields ) {
                await Promise.all( this.fieldsEvent.map( async item => {
                    if ( item.value ) {
                        let dataValue = {
                            register_id: item.id,
                            user_id: userCreated.id,
                            value: item.value
                        }
                        
                        await postSendRequest('dataRegistersExternal', dataValue)
                    }
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

            this.goToHome()
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

        async setInfoPage() {
            this.event = JSON.parse( localStorage.getItem('event') ) || {}

            if ( !this.event.id ) this.$router.push({path: '/login'});            
            
            let endDate = this.$dayjs(this.event.end_date).format('YYYY-MM-DD HH:mm:ss')
            let nowDate = this.$dayjs().format('YYYY-MM-DD HH:mm:ss')

            if ( !this.event.actived || endDate <= nowDate ) {
                this.$swal({ icon: 'error', text: 'El proceso de registro ya fue cerrado.' })
                this.$router.push({path: '/login'});
            }

            let listFieldsEvent = await getSendRequest( `fieldsEventExternal/${this.event.id}` )
            if ( listFieldsEvent ) this.fieldsEvent = listFieldsEvent.data;

            let listHabeasdata = await getSendRequest( `habeasdataExternal/${this.event.id}` )
            if ( listHabeasdata ) this.habeasdata = listHabeasdata
            
            if ( this.loader ) this.loader.hide()
            this.loader = null

            //TODO: falta utilizar los estilos
            //TODO: falta revisar cuando el password del evento sea nulo, es necesario una contraseña 
            //TODO: falta validar el numero de personas que asisten al evento, si supera el # no se debe registrar. pendiente
            const peoleLimit = await getSendRequest( `peopleLimit/${this.event.id}` )
            console.log('peoleLimit: ', peoleLimit)
        }
       
    },  
    created() {      
        this.loader = this.$loading.show({
            container: this.fullPage ? null : this.$refs.containerLoarder,
            canCancel: false,
        });

        this.validatorEmail = RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");
        
        window.onload = async () => {
            
            await updateEvent()
            await updateStyles()

            this.setInfoPage();
        };
        
        this.setInfoPage();    
    },
}
</script>

<style scoped>
.show {
    display: block !important;
}
textarea.form-control {
    min-height: 80px;
}
.form-select.form-control-clicked {
    background-color: #ffffff;
    border-color: #ebebeb;
    color: #691b9a;
}
span.required-data {
    color: #9f1b1b;
}
.form-is-invalid {
    border-color: #dc3545;
}
.invalid-feedback {
    display: block;
    width: 100%;
    margin-top: 0.25rem;
    font-size: .875em;
    color: #dc3545;
}
</style>