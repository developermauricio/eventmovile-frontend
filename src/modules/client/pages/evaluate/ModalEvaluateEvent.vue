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
                    <p :class="v.collection.$each.$response.$errors[index].value > 0 ? 'text-danger': ''" :id="`title-poll-${poll.id}`">{{ poll.description }} <span class="text-danger" v-if="poll.required === 1">*</span></p>
                  </div>
                  <!--=====================================
                   CAMPOS DE LA ENCUESTA
                   ======================================-->
                  <!--Radio button-->
                  <div class="form-check" v-if="poll.type_question_id === 3">
                    <div v-for="selectOption in JSON.parse(poll.options)" :key="selectOption" class="my-2">
                      <input class="form-check-input" type="radio" name="exampleRadio" :value="selectOption"
                             v-model="poll.value" :id="`radio-${index}`">
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
            <button @click="savePoll" class="btn btn-sm btn-success" type="button">Guardar y Enviar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted, reactive, ref, watchEffect} from "vue";
import {between, helpers, maxLength, requiredIf} from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

export default {
  name: "ModalEvaluateEvent",
  setup() {
    /*=============================================
        DATA DE LA ENCUENSTA
    =============================================*/
    const idEvent = ref(null)
    const dataPoll = ref([])
    const isRequerid = (value) => {
      console.log(value)
    }
    const rules = {
      collection: {
        $each: helpers.forEach({
          value: {
            // required:  requiredIf((value, item) => {
            //  return (item.required === 1) ? true : false
            // }),
            betweenValue: (( value, item) =>{
              return (item.type_question_id === 2) ? between(1, 100) : ''
            }),
            required: helpers.withMessage('Este campo es requerido', requiredIf((value, item) => {
              return (item.required === 1) ? true : false
            }),),
            maxLengthValue: helpers.withMessage('La cantidad máxima permitida es de 100 caractares', maxLength(10))
          }
        })
      }
    }
    const state = reactive({
      collection: []
    })
    const v = useVuelidate(rules, state)

    /*=============================================
      FUNCIÓN PARA GUARDAR LAS RESPUESTAS DE LA ENCUESTA
    =============================================*/
    const savePoll = async () => {
      state.collection.map(data => {
        if (data['value'] === undefined) {
          data.value = ''
        }
      })
      if (!await v.value.$validate()) {
        return
      }
      alert('PASO')
      // state.collection.map(data => {
      //   if (data.value === '' || data['value'] === undefined) {
      //     console.log(data)
      //     document.getElementById("title-poll-" + data.id).classList.add('text-danger')
      //     document.getElementById("text-validate-form-"+data.id).style.display = "block";
      //     return
      //   }
      // })
    }

    /*=============================================
      FUNCIÓN PARA TRAER TODA LA ENCUESTA
    =============================================*/
    const getDataPoll = async () => {
      await window.axios.get(`pollQuestionsEvent/${idEvent.value}`).then(res => {
        state.collection = res.data.data
        // state.collection.map(data =>{
        //   // console.log(data)
        //   // data.value = ''
        //   // console.log(data)
        // })
      }).catch(err => {
        console.log(err)
      })
    }

    /*=============================================
      FUNCIÓN QUE PERMITE VALIDAR CANTIDAD DE CARACTERES TEXT AREA
    =============================================*/
    // const updateValue = (character, id) => {
    //   let idQuestion = id
    //   if (character.length >= 10) {
    //     document.getElementById("text-area-" + idQuestion).style.display = "block";
    //     document.getElementById("text-area-input-" + idQuestion).classList.add('is-invalid')
    //     document.getElementById("text-limit-caracter-" + idQuestion).style.display = "none";
    //   } else {
    //     document.getElementById("text-area-" + idQuestion).style.display = "none";
    //     document.getElementById("text-area-input-" + idQuestion).classList.remove('is-invalid')
    //     document.getElementById("text-limit-caracter-" + idQuestion).style.display = "block";
    //   }
    // }

    /*=============================================
     CARGAMOS POR DEFECTO LA INFORMACIÓN DE LA ENCUESNTA
    =============================================*/
    onMounted(() => {
      idEvent.value = localStorage.getItem('eventId')
      getDataPoll()

    })

    /*=============================================
     CARGAMOS POR DEFECTO LA INFORMACIÓN DE LA ENCUESNTA
    =============================================*/
    watchEffect(() => {

    })
    return {idEvent, dataPoll, state, v, isRequerid, getDataPoll, savePoll}
  }
}
</script>

<style scoped>

</style>