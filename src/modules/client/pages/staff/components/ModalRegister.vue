<template>
    <div :class="{'show': showModal}" class="modal fade">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ event.name }}</h5>
            <button @click="closeModal" class="btn btn-close p-1 ms-auto" type="button"></button>
          </div>
          <div class="modal-body">
            <h6 class="my-2 text-center">Datos de registro</h6>
            <!-- Register Form -->
            <div class="register-form mt-4">
                             
              <div class="form-group mb-4">
                <label class="form-label">Nombre <span class="required-data">*</span></label>
                <input v-model="newUser.firstName" :class="v$.firstName.$error ? 'is-invalid' : ''" class="form-control" type="text" placeholder="Ingrese nombre.">
                <div v-if="v$.firstName.$error" class="input-error">El nombre es requerido.</div>
              </div>

              <div class="form-group mb-4">
                <label class="form-label">Apellido <span class="required-data">*</span></label>
                <input v-model="newUser.lastName" :class="v$.lastName.$error ? 'is-invalid' : ''" class="form-control" type="text" placeholder="Ingrese apellido.">
                <div v-if="v$.lastName.$error" class="input-error">El apellido es requerido.</div>
              </div>

              <div class="form-group mb-4">
                <label class="form-label">Correo electrónico <span class="required-data">*</span></label>
                <input v-model="newUser.email" :class="v$.email.$error ? 'is-invalid' : ''" class="form-control" type="email" placeholder="Ingrese correo electrónico.">
                <div v-if="v$.email.$error" class="input-error">{{ v$.email.$errors[0].$message }}</div>
              </div>

              <!-- Dymanic form -->
              <template v-for="(field, index) in fields.listFields" :key="index">    
                
                <div class="form-group mb-4">
                  <label class="form-label">{{ field.name }} <span v-if="field.required === 1" class="required-data">*</span></label>

                  <template v-if="field.type == 'text' || field.type == 'number'">
                    <input v-model="field.value" :class="validatefields.listFields.$each.$message[index].length > 0 ? 'is-invalid' : ''" class="form-control" :type="field.type" :placeholder="'Ingrese '+field.name">
                  </template>

                  <template v-if="field.type == 'textarea'">
                    <textarea v-model="field.value" :class="validatefields.listFields.$each.$message[index].length > 0 ? 'is-invalid' : ''" class="form-control" :placeholder="'Ingrese '+field.name"></textarea>
                  </template>

                  <template v-if="field.type == 'select'">
                    <select v-model="field.value" class="form-select form-control-clicked">
                      <option v-for="item in field.options.split(',')" :key="item" :value="item.trim()">{{item}}</option>
                  </select>
                  </template>

                  <div v-if="validatefields.listFields.$each.$message[index].length > 0" class="input-error">{{ validatefields.listFields.$each.$message[index][0] }}</div>
                </div>
              </template>
              
              <button @click="sendInfoUser" class="btn btn-primary w-100 my-2" type="submit">Registrar</button>
              
            </div>
          </div>
        </div>
      </div>
    </div>

    <div @click="showModal = false" :class="{'show': showModal}" class="offcanvas-backdrop fade" style="display: none"></div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email, helpers, requiredIf } from '@vuelidate/validators'
import { getSendRequest, postSendRequest, putSendRequest } from '@/utils/using-axios';
import { useLoading } from 'vue-loading-overlay'

export default defineComponent({
    name: 'ModalRegister',
    emits: ['updateList'],
    setup( props, { emit } ) {
      const $loading = useLoading()
      let event = ref({})
      let showModal = ref(false)

      let newUser = reactive({
        firstName: '',
        lastName: '',
        email: '',
      })
      const rules = {
        firstName: { required },
        lastName: { required },
        email: { 
          required: helpers.withMessage('El correo electrónico es requerido.', required), 
          email: helpers.withMessage('El valor no es una dirección de correo electrónico válida.', email) 
        },
      }
      const v$ = useVuelidate(rules, newUser)    
      
      let fields = reactive({
        listFields: []
      })
      const rulesFields = {
        listFields: {
          $each: helpers.forEach({
            value: {
              required: helpers.withMessage('Este campo es requerido.', requiredIf( (value, item) => {
                return (item.required === 1) ? true : false
              }))
            }
          })
        }
      }
      const validatefields = useVuelidate(rulesFields, fields)

      /***  Guardar información de un nuevo usuario  ***/
      const sendInfoUser = async () => {
        let loader = $loading.show({
          canCancel: false,
          color: '#ac58bc'
        });

        fields.listFields.map( item => {
          if ( item['value'] === undefined ) item.value = ''
        })

        await v$.value.$validate()
        await validatefields.value.$validate()
                
        if ( v$.value.$error || validatefields.value.$error ) {
          loader.hide()
          return      
        }

        let userID = 0
        newUser.password = event.value.password
        newUser.event = event.value.id
        const validateEmail = await getSendRequest(`validateUser/${newUser.email}`)

        if ( validateEmail == false ) {
          /***  Guardar nuevo usuario  ***/         
          newUser.name = newUser.firstName 
          newUser.lastname = newUser.lastName 

          const newResponse = await postSendRequest( 'auth/register', newUser )   
          //TODO: Pendiente revisar si se produce algun error
          if ( newResponse.data.id ) userID = newResponse.data.id
        } else {
          /***  actualizar password  ***/
          userID = validateEmail.id
          let params = { password: newUser.password }

          await putSendRequest(`restorePassword/${userID}`, params)
        }

        //TODO: falta guardar los campos dinamicos...

        if ( userID == 0 ) {
          loader.hide()
          return
        }

        /***  Guardar campos extra del registro  ***/
        await Promise.all( fields.listFields.map( async item => {
          if ( item.value ) {
            let dataValue = {
              register_id: item.id,
              user_id: userID,
              value: item.value
            }
            
            await postSendRequest('dataRegistersExternal', dataValue)
          }
        }))

        /***  Asociar el usuario al evento  ***/
        const eventUser = {
          user_id: userID,
          event_id: newUser.event,
          event_type_id: event.value.type.id,
          message_email_1: 'Registro exito',
          message_email_2: 'Virtual / Presencial',
          message_email_3: 'Ir al sitio del evento',
          message_email_4: 'Salas',
          message_email_5: 'Inicia/',
          message_email_6: 'Termina/',
          message_email_7: 'Añadir a calendario'
        }  
        
        await postSendRequest('eventUsers', eventUser)       

        await closeModal()
        emit('updateList');
        loader.hide()
      }

      const closeModal = () => {    
        newUser.firstName = ''
        newUser.lastName = ''
        newUser.email = ''

        fields.listFields = []

        v$.value.$reset()
        validatefields.value.$reset()
        showModal.value = false
      }

      const openModal = async () => {     
        let loader = $loading.show({
          canCancel: false,
          color: '#ac58bc'
        });             
        await getFieldsEvent(event.value.id)      
        showModal.value = true   
        loader.hide() 
      }

      const getFieldsEvent = async ( event_id ) => {
        let listFieldsEvent = await getSendRequest( `fieldsEventExternal/${event_id}` )
        
        if ( listFieldsEvent ) {
          let data = listFieldsEvent.data

          data.map( item => {
            if ( item.options ) item.options = JSON.parse(item.options)
          })

          fields.listFields = data
        }
      }

      onMounted(() => {
        event.value = JSON.parse( localStorage.getItem('event') ) || {} 
      });

      return {
        v$,
        event,
        newUser,
        showModal,
        sendInfoUser,
        openModal,
        fields,
        validatefields,
        closeModal,
      }
    },
})
</script>

<style scoped>
span.required-data {
  color: #9f1b1b;
}
.input-error {
  color: #e84438;
  font-size: 14px;
  margin-top: 5px;
}
.show {
  display: block !important;
}
</style>
