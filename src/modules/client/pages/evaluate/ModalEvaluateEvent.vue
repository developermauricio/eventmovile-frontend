<template>
  <div>
    <div class="modal fade" id="modalEvaluateEvent" tabindex="-1" aria-labelledby="fullscreenModalLabel"
         aria-hidden="true">
      <div class="modal-dialog modal-fullscreen-md-down">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title" id="fullscreenModalLabel">Evalua el evento</h6>
            <button class="btn btn-close p-1 ms-auto" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="container">
              <ul class="m-0 p-0">
                <li class="mb-4" v-for="(poll, index)  in  state.collection" :key="poll.id">
                  <!--=====================================
                  TITULO DE LA ENCUESTA
                  ======================================-->
                  <div class="d-flex">
                    <span class="me-2 text-primary">{{ index + 1 }}.</span>
                    <p :class="v.collection.$each.$response.$errors[index].value > 0 ? 'text-danger': ''"
                       :id="`title-poll-${poll.id}`">{{ poll.description }} <span class="text-danger"
                                                                                  v-if="poll.required === 1">*</span>
                    </p>
                  </div>
                  <!--=====================================
                   CAMPOS DE LA ENCUESTA
                   ======================================-->
                  <!--Radio button-->
                  <div class="form-check" v-if="poll.type_question_id === 3">
                    <template v-for="(selectOption, i) in JSON.parse(poll.options)" :key="selectOption" class="my-2">
                      <input class="form-check-input" type="radio" :value="selectOption"
                             v-model="poll.value" :id="`radio-${i}-${poll.id}`">
                      <label class="form-check-label" :for="`radio-${i}-${poll.id}`">{{ selectOption }}</label>
                      <br>
                    </template>
                    <div
                        v-for="error in v.collection.$each.$response.$errors[index].value"
                        :key="error"
                    >
                      <p class="text-danger">{{ error.$message }}</p>
                    </div>
                  </div>
                  <!--Tipo Number-->
                  <div class="input-number" v-if="poll.type_question_id === 2">
                    <input class="form-control" v-model="poll.value" type="number" min="0" placeholder="12">
                    <div
                        v-for="error in v.collection.$each.$response.$errors[index].value"
                        :key="error"
                    >
                      <p class="text-danger">{{ error.$message }}</p>
                    </div>
                  </div>
                  <!--Tipo Number-->
                  <div class="text-area" v-if="poll.type_question_id === 1">
                    <textarea class="form-control text-area-poll"
                              name="textarea" cols="3" v-model="poll.value" rows="5"
                              placeholder="Tu respuesta..." :id="`text-area-input-${poll.id}`"></textarea>
                    <div
                        v-for="error in v.collection.$each.$response.$errors[index].value"
                        :key="error"
                    >
                      <p class="text-danger">{{ error.$message }}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

          </div>
          <div class="modal-footer">
            <button class="btn btn-sm btn-secondary" type="button" data-bs-dismiss="modal">Cerrar</button>
            <button @click="alertConfirmed" class="btn btn-sm btn-success" type="button">Guardar y Enviar</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="alertConfirm" tabindex="-1" aria-labelledby="alertConfirm" aria-hidden="true"
         style="background-color: rgba(0,0,0,0.7)">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title" id="exampleModalLabel">Confirmar</h6>
            <button class="btn btn-close p-1 ms-auto" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p class="mb-0">¿Esta seguro de enviar respuestas?</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-sm btn-secondary" type="button" data-bs-dismiss="modal">Cancelar</button>
            <button @click="savePoll" class="btn btn-sm btn-success" type="button">Aceptar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ToastAlert ref="toast"/>
</template>

<script>
import {onMounted, reactive, ref} from "vue";
import {helpers, maxLength, requiredIf} from '@vuelidate/validators'
import ToastAlert from "../../shared/components/ToastAlert";
import useVuelidate from '@vuelidate/core'
import router from "../../../../router";

export default {
  name: "ModalEvaluateEvent",
  components: {
    ToastAlert
  },
  setup(props, context) {
    /*=============================================
        DATA DE LA ENCUENSTA
    =============================================*/
    const idEvent = ref(null)
    const idUser = ref(null)
    const dataPoll = ref([])
    const toast = ref(null)
    const isRequerid = (value) => {
      console.log(value)
    }
    const rules = {
      collection: {
        $each: helpers.forEach({
          value: {
            required: helpers.withMessage('Este campo es requerido', requiredIf((value, item) => {
              return (item.required === 1) ? true : false
            }),),
            maxLengthValue: helpers.withMessage('La cantidad máxima permitida es de 100 caractares', maxLength(100))
          }
        })
      }
    }
    const state = reactive({
      collection: []
    })
    const v = useVuelidate(rules, state)

    const alertConfirmed = async () => {
      state.collection.map(data => {
        if (data['value'] === undefined) {
          data.value = ''
        }
      })
      if (!await v.value.$validate()) {
        return
      }
      let alertModal = new window.bootstrap.Modal(document.getElementById('alertConfirm'), {
        keyboard: false
      });
      alertModal.show();
    }

    /*=============================================
      FUNCIÓN PARA GUARDAR LAS RESPUESTAS DE LA ENCUESTA
    =============================================*/
    const savePoll = async () => {
      const truck_modal_alert = document.querySelector('#alertConfirm');
      const modalAlert = window.bootstrap.Modal.getInstance(truck_modal_alert);

      const truck_modal_form = document.querySelector('#modalEvaluateEvent');
      const modalForm = window.bootstrap.Modal.getInstance(truck_modal_form);

      setTimeout(() => {
        const data = new FormData();

        data.append("event_id", parseInt(idEvent.value));
        data.append("user_id", parseInt(idUser.value.id));
        data.append("poll_answer", JSON.stringify(state.collection));

        window.axios.post('/poll-save-webapp', data).then(res => {
          console.log(res)
          modalAlert.hide();
          modalForm.hide();
          toast.value.toastAlertSuccess('Respuestas enviadas correctamente')
          router.push('/certificados')

        }).catch(err =>{
          console.log(err)
          toast.value.toastAlertError('Error, consulte con el administrador')
        })
      }, 200)
    }

    /*=============================================
      FUNCIÓN PARA TRAER TODA LA ENCUESTA
    =============================================*/
    const getDataPoll = async () => {
      await window.axios.get(`pollQuestionsEvent/${idEvent.value}`).then(res => {
        state.collection = res.data.data
        if (res.data.data === undefined) {
          context.emit("isPollUser", null)
        }
      }).catch(err => {
        console.log(err)
      })
    }

    /*=============================================
     CARGAMOS POR DEFECTO LA INFORMACIÓN DE LA ENCUESNTA
    =============================================*/
    onMounted(() => {
      idEvent.value = localStorage.getItem('eventId')
      idUser.value = JSON.parse(localStorage.getItem('user'))
      getDataPoll()

    })
    return {idEvent, dataPoll, state, v, toast, isRequerid, getDataPoll, savePoll, alertConfirmed}
  }
}
</script>

<style scoped>

</style>