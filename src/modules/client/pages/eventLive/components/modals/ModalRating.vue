<template>
  <div>
    <div class="container">
      <div class="offcanvas offcanvas-bottom pt-2 pe-0 ps-0" id="modalRatingActivity" tabindex="-1"
           aria-labelledby="offcanvasBottomLabel">

        <div class="header-content position-relative d-flex align-items-center justify-content-between">
          <!-- Back Button -->
          <div class="back-button" data-bs-dismiss="offcanvas">
            <!--            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">-->
            <!--              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>-->
            <!--            </svg>-->
          </div>
          <!-- Page Title -->
          <div class="page-heading">
            <h4 class="mb-0 position-relative text-center">{{ qualify ? 'Gracias por calificar esta actividad' : 'Califica la Actividad'}}</h4>
          </div>
          <div class="setting-wrapper">
            <div class="setting-trigger-btn" id="settingTriggerBtn">
            </div>
          </div>
        </div>

        <!-- Offcanvas Body -->
        <div class="offcanvas-body p-1" v-if="!qualify">
          <div class="container">
            <p class="text-center">Para nosotros es impoartante tu opinión, por favor califica la actividad</p>
            <div style="margin-top: -1rem">
              <vue3starRatings
                  :showControl="false"
                  :step="2.5"
                  :controlSize="'15'"
                  v-model="rating"/>
            </div>
            <div class="text-center">
              <button @click="openModalConfirm()" class="btn m-1 btn-primary">ENVIAR CALIFICACIÓN</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="alertConfirmRating" tabindex="-1" aria-labelledby="alertConfirm" aria-hidden="true"
         style="background-color: rgba(0,0,0,0.7)">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title" id="exampleModalLabel">Confirmar</h6>
            <button class="btn btn-close p-1 ms-auto" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p class="mb-0">¿Esta seguro de enviar tu calificación?</p>
          </div>
          <div class="modal-footer">
            <button id="closeModalConfirm" class="btn btn-sm btn-secondary" type="button" data-bs-dismiss="modal">Cancelar</button>
            <button @click="sendRateActivity()" class="btn btn-sm btn-success" type="button">Aceptar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ToastAlert ref="toast"/>
</template>

<script>
import vue3starRatings from "vue3-star-ratings";
import {onMounted, ref} from "vue";
import ToastAlert from "../../../../shared/components/ToastAlert";
export default {
  name: "ModalRating",
  components: {
    vue3starRatings,
    ToastAlert
  },
  props:['activity'],
  setup(props){
    const rating = ref(null);
    const user = ref(null)
    const qualify = ref(false)
    const toast = ref(null)

    const openModalConfirm = () =>{
      if (rating.value === null || rating.value === ''){
        toast.value.toastAlertError('Por favor, asigne una calificación con las estrellas')
        return
      }
      let alertModal = new window.bootstrap.Modal(document.getElementById('alertConfirmRating'), {
        keyboard: false
      });
      alertModal.show();
    }

    const getRatingActivity = async () =>{
      setTimeout(async () =>{
        await window.axios.get(`/get-rate-activity/${props.activity.id}/${user.value.id}`).then(resp =>{
          rating.value = resp.data.rate
        }).catch(err =>{
          console.log(err);
        })
      }, 200)
    }

    const sendRateActivity = async () =>{
    if (rating.value === null){
      return
    }
    setTimeout(async ()=>{
      let event = JSON.parse( localStorage.getItem('event') ) || {}
      let eventId = event.id ? event.id : 0;      

      const data = new FormData();
      data.append("activity_id", props.activity.id);
      data.append("user_id", user.value.id);
      data.append("rate", rating.value);
      data.append("event_id", eventId);
      
      await window.axios.post(`/save-rate-activity`, data).then(res => {
        console.log(res)
        qualify.value = true;
        document.getElementById('closeModalConfirm').click()        
      }).catch(err => {
        console.log(err)
      })
    }, 500)

    }

    onMounted(() => {
      user.value = JSON.parse(localStorage.getItem('user'))
      // getRatingActivity()
    })

    return{
      user,
      rating,
      qualify,
      openModalConfirm,
      sendRateActivity,
      getRatingActivity,
    }
  }
  // data() {
  //   return {
  //     rating: null
  //   }
  // }
}
</script>

<style scoped>
.btn {
  /*padding: 0px !important;*/
}

.offcanvas-bottom {
  height: 35% !important;
  border-top: none !important;
  border-radius: 25px 25px 0 0 !important;
}
</style>