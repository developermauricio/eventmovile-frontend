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
            <h4 class="mb-0 position-relative text-center">Califica la Actividad</h4>
          </div>
          <div class="setting-wrapper">
            <div class="setting-trigger-btn" id="settingTriggerBtn">
            </div>
          </div>
        </div>

        <!-- Offcanvas Body -->
        <div class="offcanvas-body p-1">
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
              <button class="btn m-1 btn-primary" @click="sendRateActivity()">ENVIAR CALIFICACIÓN</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vue3starRatings from "vue3-star-ratings";
import {onMounted, ref} from "vue";
export default {
  name: "ModalRating",
  components: {
    vue3starRatings,
  },
  props:['activity'],
  setup(props){
    const rating = ref(null);
    const user = ref(null)

    const sendRateActivity = async () =>{
    if (rating.value === null){
      return
    }
    setTimeout(async ()=>{
      const data = new FormData();
      data.append("activity_id", props.activity.id);
      data.append("user_id", user.value.id);
      data.append("rate", rating.value);
      await window.axios.post(`/save-rate-activity`, data).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }, 500)

    }

    onMounted(() => {
      user.value = JSON.parse(localStorage.getItem('user'))
    })

    return{
      user,
      rating,
      sendRateActivity
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