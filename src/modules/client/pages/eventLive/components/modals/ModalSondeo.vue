<template>
  <!-- Bootstrap Basic Modal -->
  <div class="modal fade" id="modalSondeo" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <!-- <h6 class="modal-title" id="exampleModalLabel">Modal Heading</h6> -->
          <button class="btn btn-close p-1 ms-auto" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="content-sondeo" v-if="sondeosActivity.length > 0">
            <h4>{{
                sondeosActivity.length > 1 ? 'Te invitamos a llenar los sondeos' : 'Te invitamos a llenar el sondeo'
              }}</h4>

            <div class="d-grid gap-2 mt-3" v-for="(probes, index) in sondeosActivity" :key="index">
              <button @click.prevent="sondeoGet(probes)" class="btn btn-primary" type="button">{{ probes.name }}</button>
            </div>
          </div>
          <div class="content-sondeo" v-else>
            <h4>No hay sondeos disponibles para esta actividad</h4>
          </div>

        </div>
      </div>
    </div>
  </div>
  <ModalAnwerSondeo ref="modalAnswer"/>
</template>

<script>
import {getSendRequest} from '@/utils/using-axios';
import {onBeforeMount, onMounted, ref} from "vue";
import ModalAnwerSondeo from "./ModalAnwerSondeo";

export default {
  name: "ModalSondeo",
  components:{
    ModalAnwerSondeo
  },
  setup() {
    const activity = ref({})
    const sondeosActivity = ref([])
    const urlBaseFile = ref()
    const sondeoId = ref(null)
    const modalAnswer = ref()
    const user = ref(null)

    const getDataSondeo = async (id) => {
      const responseSondeo = await getSendRequest(`probe-questions-activity-wh/${id}`)
      console.log('SONDE', responseSondeo)
      if (responseSondeo) {
        sondeosActivity.value = responseSondeo.data;
        console.log('responseSondeo: ', sondeosActivity.value)
      }
    }

    const verifyUserProbe = async (user) =>{

      getDataSondeo(activity.value.id)
      const responseVerifyUserProbe = await getSendRequest(`probe-verify-user-webapp/${user}`)
      console.log('VERIFY USER SONDEO', responseVerifyUserProbe)
      // if (responseVerifyUserProbe) {
      //
      // }
    }

    const sondeoGet = (probe) =>{

      let alertModal = new window.bootstrap.Modal(document.getElementById('modalSondeoAnswer'), {
        keyboard: false
      });
      alertModal.show();
      modalAnswer.value.getDataQuestion(probe)
    }

    onBeforeMount(() => {
      activity.value = JSON.parse(localStorage.getItem('current_Activity'))
      user.value = JSON.parse(localStorage.getItem('user'))
      verifyUserProbe(user.value.id)

    })

    onMounted(() => {
    })

    return {
      activity,
      sondeosActivity,
      urlBaseFile,
      sondeoId,
      user,
      modalAnswer,
      getDataSondeo,
      sondeoGet,
      verifyUserProbe
    }
  },

  // methods: {
  //     async getDataSondeo( activityID ) {
  //         const responseSondeo = await getSendRequest(`probe-questions-activity-wh/${activityID}`)
  //
  //         if ( responseSondeo ) {
  //             this.sondeosActivity = responseSondeo.data;
  //             console.log('responseSondeo: ', this.sondeosActivity)
  //         }
  //     }
  //
  // },
  // mounted() {
  //     this.activity = JSON.parse( localStorage.getItem('current_Activity') ) || {}
  //
  //     this.getDataSondeo( this.activity.id )
  // }
}
</script>

<style scoped>
.modal-header {
  border-bottom: none !important;
}
</style>
