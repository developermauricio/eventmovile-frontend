<template>
  <!-- Bootstrap Basic Modal -->
  <div :class="{'show': showModal}" class="modal fade">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <!-- <h6 class="modal-title" id="exampleModalLabel">Modal Heading</h6> -->
          <button @click="showModal = false" class="btn btn-close p-1 ms-auto" type="button"></button>
        </div>
        <div class="modal-body">
          
          <div class="content-sondeo">
            <h4>Recursos</h4>

            <div v-if="resoursesActivity.length == 0">
              No hay recursos disponibles para esta actividad.
            </div>

            <div v-else>
              <template v-for="(resource, index) in resoursesActivity" :key="index">
                <a v-if="resource.type == 'url'" class="single-plan-check shadow-sm active-effect mt-4" :href="resource.url" target="_blank">
                  <div class="form-check mb-0">
                    <label class="form-check-label" for="Individual">{{ resource.name }}</label>
                  </div>
                  <i class="bi bi-link" style="font-size: 20px;"></i>
                </a>
                <a v-else class="single-plan-check shadow-sm active-effect mt-4" :href="urlBaseFile + resource.url" target="_blank">
                  <div class="form-check mb-0">
                    <label class="form-check-label" for="Individual">{{ resource.name }}</label>
                  </div>
                  <i class="bi bi-cloud-arrow-down" style="font-size: 20px;"></i>
                </a>                
              </template>
            </div>
          </div>
        </div>       
      </div>
    </div>
  </div>

  <div @click="showModal = false" :class="{'show': showModal}" class="offcanvas-backdrop fade" style="display: none"></div>
</template>

<script>
import { getSendRequest } from '@/utils/using-axios';

export default {
  name: "ModalFile", 
  data() {
    return {
      showModal: false,
      activity: {},
      resoursesActivity: [],
      urlBaseFile: process.env.VUE_APP_URL_BASE,
    }
  },
  methods: {
    openModal() {
      this.showModal = true
    },
    async getResourcesActivity( activityID ) {
      const responseDocs = await getSendRequest(`modelDocuements/activity/${activityID}`) 
      console.log('estos son los recursos: ', responseDocs)

      if ( responseDocs ) {
        if ( responseDocs.data.length == 0 ) return

        responseDocs.data.map( doc => {
          this.resoursesActivity.push(doc)
        })
      }
    }
  },
  mounted() {
    this.activity = JSON.parse( localStorage.getItem('current_Activity') ) || {}

    this.getResourcesActivity( this.activity.id )
  }
}
</script>

<style scoped>
.show {
  display: block !important;
}
.marg-top {
  margin-top: 50px;
}
.form-check {
  padding-left: 0 !important;
}
.modal-header {
  border-bottom: none !important;
}
</style>
