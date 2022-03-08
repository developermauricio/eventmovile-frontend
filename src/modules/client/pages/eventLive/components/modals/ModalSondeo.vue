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
                        <h4>¿Quieres regresar al trabajo desde la oficina?</h4>
                        <div class="single-plan-check shadow-sm active-effect mt-4">
                            <div class="form-check mb-0">
                                <input class="form-check-input" type="radio" name="planChoose" id="Individual">
                                <label class="form-check-label" for="Individual">Si</label>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check-circle style-color-icon" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                            </svg>
                        </div>
                        <div class="single-plan-check shadow-sm active-effect">
                            <div class="form-check mb-0">
                                <input class="form-check-input" type="radio" name="planChoose" id="Team" checked>
                                <label class="form-check-label" for="Team">No</label>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
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
                <!-- <div class="modal-footer">
                    <button class="btn btn-sm btn-secondary" type="button" data-bs-dismiss="modal">Close</button>
                    <button class="btn btn-sm btn-success" type="button">Save</button>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import { getSendRequest } from '@/utils/using-axios';

export default {
    name: "ModalSondeo",
    data() {
        return {
            activity: {},
            sondeosActivity: [],
            urlBaseFile: process.env.VUE_APP_API_URL_FILES,
        }
    },
    methods: {        
        async getDataSondeo( activityID ) {
            const responseSondeo = await getSendRequest(`probe-questions-activity-wh/${activityID}`)

            if ( responseSondeo ) {
                this.sondeosActivity = responseSondeo.data;
                console.log('responseSondeo: ', this.sondeosActivity)
            }
        }
        
    },
    mounted() {
        this.activity = JSON.parse( localStorage.getItem('current_Activity') ) || {}

        this.getDataSondeo( this.activity.id )
    }
}
</script>

<style scoped>
.modal-header {
  border-bottom: none !important;
}
</style>
