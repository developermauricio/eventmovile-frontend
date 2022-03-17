<template>
  <div>
    <div class="modal fade" id="modalSondeoAnswer" tabindex="-1" aria-labelledby="fullscreenModalLabel"
         aria-hidden="true">
      <div class="modal-dialog modal-fullscreen-md-down">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title" id="fullscreenModalLabel">Sondeo</h6>
            <button @click.prevent="closeModal" class="btn btn-close p-1 ms-auto" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="container" v-if="!message">
              <ul class="m-0 p-0">
                <li class="mb-4" v-for="(probe, index)  in  state.collection" :key="probe.id">
                  <!--=====================================
                  TITULO DE LA ENCUESTA
                  ======================================-->
                  <div class="d-flex">
                    <span class="me-2 text-primary">{{ index + 1 }}.</span>
                    <p :class="v.collection.$each.$response.$errors[index].value > 0 ? 'text-danger': ''"
                       :id="`title-poll-${probe.id}`">{{ probe.description }} <span class="text-danger"
                                                                                    v-if="probe.required === 1">*</span>
                    </p>
                  </div>
                  <!--=====================================
                   CAMPOS DE LA ENCUESTA
                   ======================================-->
                  <!--Radio button-->
                  <div class="form-check" v-if="probe.type_question_id === 3">
                    <div v-for="selectOption in JSON.parse(probe.options)" :key="selectOption" class="my-2">
                      <input class="form-check-input" type="radio" name="exampleRadio" :value="selectOption"
                             v-model="probe.value" :id="`radio-${index}`">
                      <label class="form-check-label" :for="`radio-${index}`">{{ selectOption }}</label>
                    </div>
                    <div
                        v-for="error in v.collection.$each.$response.$errors[index].value"
                        :key="error"
                    >
                      <p class="text-danger">{{ error.$message }}</p>
                    </div>
                  </div>
                  <!--Tipo Number-->
                  <div class="input-number" v-if="probe.type_question_id === 2">
                    <input class="form-control" v-model="probe.value" type="number" min="0" placeholder="12">
                    <div
                        v-for="error in v.collection.$each.$response.$errors[index].value"
                        :key="error"
                    >
                      <p class="text-danger">{{ error.$message }}</p>
                    </div>
                  </div>
                  <!--Tipo Number-->
                  <div class="text-area" v-if="probe.type_question_id === 1">
                    <textarea class="form-control text-area-poll"
                              name="textarea" cols="3" v-model="probe.value" rows="5"
                              placeholder="Tu respuesta..." :id="`text-area-input-${probe.id}`"></textarea>
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
            <div class="container" v-else>
              <h4 class="text-center"> Este sondeo ya ha sido respondido</h4>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-sm btn-secondary" type="button" data-bs-dismiss="modal">Cerrar</button>
            <button @click="alertConfirmed" class="btn btn-sm btn-success" type="button" v-if="!message">Guardar y Enviar</button>
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
            <button @click="saveProbe" class="btn btn-sm btn-success" type="button">Aceptar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ToastAlert ref="toast"/>
</template>

<script>

import {onBeforeMount, onMounted, reactive, ref} from "vue";
import {helpers, maxLength, requiredIf} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import ToastAlert from "../../../../shared/components/ToastAlert";
// import router from "../../../../../../router";

export default {
  name: "ModalAnwerSondeo",
  components: {
    ToastAlert
  },
  setup() {
    const user = ref(null)
    const probe = ref(null)
    const toast = ref(null)
    const message = ref(false)
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

    const closeModal = () =>{
      message.value = false
    }
    /*=============================================
      FUNCIÓN PARA TRAER TODA LAs PREGUNTAS
    =============================================*/
    const getDataQuestion = async (probe) => {
      console.log('OAIMASAS', probe)
      probe.value = probe
      await window.axios.get(`probe-questions-probe-wh/${probe.id}`).then(res => {
        state.collection = res.data.data
        if (res.data === "answered"){
          message.value = true
        }
      }).catch(err => {
        console.log(err)
      })
    }

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
    const saveProbe = async () => {
      const truck_modal_alert = document.querySelector('#alertConfirm');
      const modalAlert = window.bootstrap.Modal.getInstance(truck_modal_alert);

      const truck_modal_form = document.querySelector('#modalSondeoAnswer');
      const modalForm = window.bootstrap.Modal.getInstance(truck_modal_form);

      const truck_modal_probe = document.querySelector('#modalSondeo');
      const modalProbe = window.bootstrap.Modal.getInstance(truck_modal_probe)

      setTimeout(() => {
        const data = new FormData();

        data.append("probe_id", parseInt(probe.value));
        data.append("user_id", parseInt(user.value.id));
        data.append("probe_answer", JSON.stringify(state.collection));

        window.axios.post('/probe-save-webapp', data).then(res => {
          console.log(res)
          modalAlert.hide();
          modalForm.hide();
          modalProbe.hide();
          toast.value.toastAlertSuccess('Respuestas enviadas correctamente')
          // router.push('/certificados')

        }).catch(err => {
          console.log(err)
          toast.value.toastAlertError('Error, consulte con el administrador')
        })
      }, 200)
    }

    onBeforeMount(() => {
    })
    onMounted(() => {
      user.value = JSON.parse(localStorage.getItem('user'))
    })

    return {
      v,
      state,
      probe,
      toast,
      message,
      user,
      closeModal,
      saveProbe,
      alertConfirmed,
      getDataQuestion
    }
  }
}
</script>

<style scoped>

</style>