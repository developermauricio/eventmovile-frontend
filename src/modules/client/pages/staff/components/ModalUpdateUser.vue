<template>
    <div :class="{'show': showModal}" class="modal fade">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ event.name }}</h5>
            <button @click="closeModal" class="btn btn-close p-1 ms-auto" type="button"></button>
          </div>
          <div class="modal-body">
            <h6 class="my-2 text-center">Datos del usuario</h6>
            
            <!-- Update Form -->
            <div class="register-form mt-4">
                             
              <div class="form-group mb-4">
                <label class="form-label">Nombre <span class="required-data">*</span></label>
                <input v-model="userUpdate.name" :class="v$.name.$error ? 'is-invalid' : ''" class="form-control" type="text" placeholder="Ingrese el nombre.">
                <div v-if="v$.name.$error" class="input-error">El nombre es requerido.</div>
              </div>

              <div class="form-group mb-4">
                <label class="form-label">Apellido <span class="required-data">*</span></label>
                <input v-model="userUpdate.lastname" :class="v$.lastname.$error ? 'is-invalid' : ''" class="form-control" type="text" placeholder="Ingrese el apellido.">
                <div v-if="v$.lastname.$error" class="input-error">El apellido es requerido.</div>
              </div>

              <div class="form-group mb-4" disabled>
                <label class="form-label">Correo electrónico</label>
                <input v-model="user.email" class="form-control" type="email" disabled >
                <div class="field-email-info">El campo de correo electrónico no se debe modificar.</div>
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
              
              <button @click="sendInfoUser" class="btn btn-primary w-100 my-2" type="submit">Actualizar</button>
              
            </div>
          </div>
        </div>
      </div>
    </div>

    <div @click="closeModal" :class="{'show': showModal}" class="offcanvas-backdrop fade" style="display: none"></div>
</template>

<script>
import { defineComponent, ref, onMounted, reactive } from 'vue'
import { useLoading } from 'vue-loading-overlay'
import useVuelidate from '@vuelidate/core'
import { required, helpers, requiredIf } from '@vuelidate/validators'
import { getSendRequest, putSendRequest } from '@/utils/using-axios';

export default defineComponent({
  name: 'ModalUpdateUser',
  emits: ['updateList'],
  setup( props, { emit } ) {
    const $loading = useLoading()
    let showModal = ref(false)
    let event = ref({})
    let user = ref({})


    let userUpdate = reactive({
      name: '',
      lastname: '',
    })
    const rules = {
      name: { required },
      lastname: { required }
    }
    const v$ = useVuelidate( rules, userUpdate )

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


    /***  Actualizar datos del usuario  ***/
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

      let reload = false 

      // validar si se cambiaron los datos para poder guardar, enviar el id user
      if (user.value.name != userUpdate.name || user.value.lastname != userUpdate.lastname ) {
        const data = {
          'user_id': user.value.id,
          'name': userUpdate.name,
          'lastname': userUpdate.lastname
        }

        await putSendRequest('update-data-user', data)
        reload = true 
      } 

      /***  Guardar campos extra del registro  ***/
      await Promise.all( fields.listFields.map( async item => {
        if ( item.value ) {
          let dataValue = {
            data_register_id: item.dateRegister ? item.dateRegister : 0,
            register_id: item.id,
            user_id: user.value.id,
            value: item.value
          }
          
          await putSendRequest('update-data-register', dataValue)
        }
      }))

      v$.value.$reset()
      showModal.value = false
      emit('updateList', reload)
      loader.hide()
    }

    const closeModal = () => {
      userUpdate.name = ''
      userUpdate.lastName = ''

      fields.listFields = []

      v$.value.$reset()
      validatefields.value.$reset()
      showModal.value = false
    }

    const openModalUpdate = async ( user_id ) => {
      let loader = $loading.show({
        canCancel: false,
        color: '#ac58bc'
      });

      await getDataUser( user_id )   
      await getDateRegister( user_id )         
      showModal.value = true
      loader.hide()
    }

    /***  obtener datos del usuario por su id  ***/
    const getDataUser = async ( user_id ) => {
      const responseUser = await getSendRequest(`get-data-user/${user_id}`)
      
      if ( responseUser ) {
        user.value = responseUser
        userUpdate.name = responseUser.name
        userUpdate.lastname = responseUser.lastname
      }      
    }

    /***  obteber los campos de registro adicionales con sus valores.  ***/
    const getDateRegister = async ( user_id ) => {
      let data = []
      let listFieldsEvent = await getSendRequest( `fieldsEventExternal/${event.value.id}` )
      
      if ( listFieldsEvent ) {
        data = listFieldsEvent.data

        data.map( item => {
          if ( item.options ) item.options = JSON.parse(item.options)
        })
      }

      const responseData = await getSendRequest(`get-data-register/${user_id}/${event.value.id}`)
      
      if ( responseData.length ) {
        data.map( item => {
          const valueItem = responseData.find( val => item.id === val.register_id )         
          
          if ( valueItem ) {
            item.dateRegister = valueItem.id
            item.value = valueItem.value
          }
        })
      }

      fields.listFields = data
    }

    onMounted(() => {
      event.value = JSON.parse( localStorage.getItem('event') ) || {}        
    });

    return {
      showModal,
      event,
      user,
      userUpdate,
      v$,
      fields,
      validatefields,
      openModalUpdate,
      sendInfoUser,
      closeModal,
    }
  },
})
</script>

<style scoped>
.show {
  display: block !important;
}
span.required-data {
  color: #9f1b1b;
}
.input-error {
  color: #e84438;
  font-size: 14px;
  margin-top: 5px;
}
.field-email-info {
  font-size: 14px;
  color: #8480ae;
  margin-top: 6px;
}
</style>