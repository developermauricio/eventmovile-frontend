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
            <div v-if="this.event.image_on_register && this.event.image_on_register == 1" class="content-photo mb-5">
                <PhotoUser v-on:removeMessagePrincial="removeMessagePrincial"
                    v-on:urlArchiveServe="urlArchiveServe" />
                <div v-if="showTextDropzone" class="text-icon-dropzone">
                    <p>Arrastre y suelte una imagen o haga clic aquí</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-cloud-arrow-up icon-upload-dropzone" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"/>
                        <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
                    </svg>
                </div>
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

                    <div v-if="event.enable_company && event.enable_company == '1'" class="form-group mb-4">
                        <label class="form-label">Nombre empresa</label>
                        <input v-model="newUser.name_company" class="form-control" type="text" placeholder="Ingrese el nombre de la empresa.">
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
import {defineAsyncComponent, defineComponent} from "vue";
import { getSendRequest, postSendRequest } from '@/utils/using-axios';
import { updateEvent, updateStyles } from '@/utils/update-local-storage';

export default defineComponent ({
    name: 'Register',
    components: {
        PhotoUser: defineAsyncComponent(() => import('@/modules/client/pages/login/components/PhotoUser'))
    },
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
                pic: '',
                name_company: '',
            },
            showTextDropzone: true,
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
        removeMessagePrincial( data ) {
            this.showTextDropzone = data
        },
        urlArchiveServe( data ) {
            console.log('urlArchiveServe llega esto: ', data)
            this.newUser.pic = data
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

            if ( this.event.password ) {
                this.newUser.password = this.event.password
            } 

            this.newUser.event = this.event.id
            let userID = 0;

            // TODO: falta validar los datos, los fieldsEvent tambien se validan
            const validateEmail = await getSendRequest(`validateUser/${this.newUser.email}`)
            console.log('retorno esto: ', validateEmail)            
           
            if ( validateEmail == false ) {
                /***  Guardar nuevo usuario  ***/
                const newResponse = await postSendRequest( 'auth/register', this.newUser )            
                console.log('new user: ', newResponse)
                let userCreated = newResponse.data
                if ( userCreated ) userID = userCreated.id
            } else {
                /***  actualizar password  ***/
                userID = validateEmail.id
                let params = { password: this.newUser.password }

                await window.axios.put(`restorePassword/${userID}`, params)
                    .then( response => {
                        console.log('Response: ', response)
                    })
                    .catch( error => {
                        console.log('Error: ', error)
                    })
            }            

            /***  Validar los campos extra del registro  ***/
            let emptyfields = false

            this.fieldsEvent.forEach( field => {
                if ( field.required ) {
                    if ( field.value ) emptyfields = true
                }                
            })

            if ( userID == 0 ) return

            /***  Guardar campos extra del registro  ***/
            if ( emptyfields ) {
                await Promise.all( this.fieldsEvent.map( async item => {
                    if ( item.value ) {
                        let dataValue = {
                            register_id: item.id,
                            user_id: userID,
                            value: item.value
                        }
                        
                        await postSendRequest('dataRegistersExternal', dataValue)
                    }
                }))
            }

            /***  Asociar el usuario al evento  ***/
            const eventUser = {
                user_id: userID,
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

                // TODO: se guarda el regitro del login para el usario.
                let loginParams = {
                    event_id: this.newUser.event,
                    user_id: loginUser.id
                }
                window.axios.post('loginTracking', loginParams)
                .then( resp => {
                    console.log("resp register tracking:", resp.data);
                    localStorage.setItem("current_tracking_login", resp.data.data.id)
                }).catch( error => {
                    console.log(error)
                })
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
})
</script>

<style scoped>
.text-icon-dropzone {
    position: absolute;
    width: 130px;
    margin-top: 37px;
    text-align: center;
}
.icon-upload-dropzone {
    color: #7e4aa7;
}
.content-photo {
    width: 100%;
    display: flex;
    align-content: center;
    justify-content: center;
}
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