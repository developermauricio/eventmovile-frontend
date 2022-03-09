<template>
    <div class="modal fade" id="bootstrapBasicModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title" id="exampleModalLabel">Crear nuevo usuario</h6>
            <button class="btn btn-close p-1 ms-auto" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- Register Form -->
            <div class="register-form mt-4">
              <form @submit.prevent="sendInfoUser">                    
                <div class="form-group mb-4">
                  <label class="form-label">Nombre <span class="required-data">*</span></label>
                  <input v-model="newUser.name" class="form-control" type="text" placeholder="Ingrese nombre." required>
                  <!-- <input @input="changeValueName" v-model="newUser.name" :class="{'form-is-invalid': errors.name.required}" class="form-control" type="text" placeholder="Ingrese nombre." required>
                  <div v-if="errors.name.required" :class="{'invalid-feedback': errors.name.required}">{{ errors.name.msg }}</div> -->
                </div>

                <div class="form-group mb-4">
                  <label class="form-label">Apellido <span class="required-data">*</span></label>
                  <input v-model="newUser.lastname" class="form-control" type="text" placeholder="Ingrese apellido." required>
                  <!-- <input @input="changeValueLastName" v-model="newUser.lastname" :class="{'form-is-invalid': errors.lastname.required}" class="form-control" type="text" placeholder="Ingrese apellido." required>
                  <div v-if="errors.lastname.required" :class="{'invalid-feedback': errors.lastname.required}">{{ errors.lastname.msg }}</div> -->
                </div>

                <div class="form-group mb-4">
                  <label class="form-label">Correo electrónico <span class="required-data">*</span></label>
                  <input v-model="newUser.email" class="form-control" type="email" placeholder="Ingrese correo electrónico." required>
                  <!-- <input  @input="changeValueEmail" v-model="newUser.email" :class="{'form-is-invalid': errors.email.required}" class="form-control" type="email" placeholder="Ingrese correo electrónico." required>
                  <div v-if="errors.email.required" :class="{'invalid-feedback': errors.email.required}">{{ errors.email.msg }}</div> -->
                </div>
                
                <button class="btn btn-primary w-100 mt-2" type="submit">Registrar</button>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-sm btn-secondary" type="button" data-bs-dismiss="modal">Cerrar</button>
            <button class="btn btn-sm btn-success" type="button">Guardar</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'ModalRegister',
    setup() {
      let newUser = ref({}) 

      const sendInfoUser = () => {
        console.log('enviar formulario.')
      }

      return {
        newUser,
        sendInfoUser,
      }
    },
})
</script>

<style scoped>

</style>
