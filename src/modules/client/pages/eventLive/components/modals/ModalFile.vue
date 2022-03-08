<template>
  <!-- Bootstrap Basic Modal -->
  <div class="modal fade" id="modalFile" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <!-- <h6 class="modal-title" id="exampleModalLabel">Modal Heading</h6> -->
          <button class="btn btn-close p-1 ms-auto" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- <div class="row">
            <div class="col-3">
              <div class="">
                <img class="img-circle img-user" src="/assets/img/avatars/perfil-men.jpg" alt="">
              </div>
            </div>
            <div class="col-9 pt-2">
              <h6 class="text-truncate mb-0">Mustafa Rabbi</h6>
              <div class="last-chat mt-2">
                <p class="text-truncate mb-0">How can I help you?</p>
              </div>
            </div>
          </div> -->
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

          <!-- <div class="shop-pagination pt-3">
            <div class="container">
                <div class="card">
                    <div class="card-body py-3">
                        <nav aria-label="Page navigation example">
                            <ul class="pagination pagination-two justify-content-center">
                                <li class="page-item">
                                    <a class="page-link" href="#" aria-label="Previous">
                                        <svg class="bi bi-chevron-left" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"></path>
                                        </svg>
                                    </a>
                                </li>                                
                                <li class="page-item">
                                    <a class="page-link" href="#">1/3</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#" aria-label="Next">
                                        <svg class="bi bi-chevron-right" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
          </div> -->

        </div>
       
      </div>
    </div>
  </div>
</template>

<script>
import { getSendRequest } from '@/utils/using-axios';

export default {
  name: "ModalFile", 
  data() {
    return {
      activity: {},
      resoursesActivity: [],
      urlBaseFile: process.env.VUE_APP_API_URL_FILES,
    }
  },
  methods: {
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
