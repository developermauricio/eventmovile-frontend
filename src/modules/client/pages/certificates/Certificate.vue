<template>
    <HeaderCertificate @searchCertificate="searchCertificate"/>
    <div style="height: 50px;"></div>
    <SearchCertificate ref="fieldSearchCertificate" @actionSearch="actionSearch" />

    <div>
       <div class="container p-3">
            <!-- <div class="content-certificate-event">
                <h4 class="text-center my-3">Certificado del evento {{ event.name }}</h4>

                <div v-if="eventCertificate" class="row mt-3">                
                    <div class="col-3 "></div>
                    <div class="col-6 my-3">
                        <div class="card">
                            <div class="style-card-body">
                                <span class="content-icon-certificate">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="28" fill="currentColor" class="bi bi-trophy" viewBox="0 0 16 16">
                                        <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935zM3.504 1c.007.517.026 1.006.056 1.469.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.501.501 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667.03-.463.049-.952.056-1.469H3.504z"/>
                                    </svg>
                                </span>
                                <h6 class="mt-4 color-title">Nombre del certificado</h6>
                                <div @click="download" class="mt-4 content-btn-download">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-download icon-download" viewBox="0 0 16 16">
                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                    </svg>
                                    <span class="text-download">Descargar</span>
                                </div>               
                            </div>
                        </div>
                    </div>
                    <div class="col-3 "></div>
                </div>

                <div v-else class="text-center">
                    <p>Lo sentimos no hay Certificados disponibles para este evento.</p>
                </div>
            </div> -->


            <!--  <div v-if="listCertificates.length == 0">
                No hay Certificados disponibles 
            </div> -->

            <!-- <div v-else class="row"> -->
            <div class="content-certificate-event">    
                <div class="row mt-3">                
                    <div class="col-3 "></div>

                    <div class="col-6 mb-3">
                        <div class="card">
                            <div class="style-card-body">
                                <span class="content-icon-certificate">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="28" fill="currentColor" class="bi bi-trophy" viewBox="0 0 16 16">
                                        <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935zM3.504 1c.007.517.026 1.006.056 1.469.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.501.501 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667.03-.463.049-.952.056-1.469H3.504z"/>
                                    </svg>
                                </span>
                                <h6 class="mt-4 color-title">Certificado {{ event.name }}</h6>
                                <div @click="download" class="mt-4 content-btn-download">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-download icon-download" viewBox="0 0 16 16">
                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                    </svg>
                                    <span class="text-download">Descargar</span>
                                </div>               
                            </div>
                        </div>
                    </div> 
                    
                    <div class="col-3 "></div>                             
                </div>                               
            </div>            
        </div>
    </div>

    <div id="nav">
        <Navbar/>
    </div>
</template>

<script>
import {defineAsyncComponent} from "vue";
import { getSendRequest } from '@/utils/using-axios';

export default {
  name: "Certificate",
  components: {
    HeaderCertificate: defineAsyncComponent(() => import('@/modules/client/pages/certificates/componets/HeaderCetificate')),
    SearchCertificate: defineAsyncComponent(() => import('@/modules/client/pages/certificates/componets/SearchCertificate')),
    Navbar: defineAsyncComponent(() => import('@/modules/client/shared/components/Navbutton')),
  },
  data(){
    return {
      listCertificates: [],
      eventCertificate: null,
      event: {},
      user: {},
    }
  },
  methods: {
    searchCertificate() {
      this.$refs.fieldSearchCertificate.showSearchSpeaker()
    },
    actionSearch( search ) {
        console.log('termino de busqueda: ', search)
    },
    async getCertificateEvent() {
        const certificateResponse = await getSendRequest(`get-certificate-event/${this.event.id}`) 
        
        if ( certificateResponse ) {
            this.eventCertificate = certificateResponse
        }
    },
    async download() { 
        // https://eventmovil.com/entradas/event-products-certificate.php?id=247 
        if ( this.event.url_certificate ) {
            console.log('url cerificado: ', this.event.url_certificate)
            window.open(this.event.url_certificate)
        } else {
            console.log('No hay url de valida para descargar el certificado.')
        }
        
        //window.open(`${process.env.VUE_APP_API_URL}/download-certificate/${this.event.id}/${this.user.id}`)
    }
  },
  created() {
    this.user = JSON.parse( localStorage.getItem('user') ) || {}
    this.event = JSON.parse( localStorage.getItem('event') ) || {}
    this.getCertificateEvent();
  }
}
</script>

<style scoped>
.style-card-body {
    text-align: center;
    padding: 1.5rem 7px;
}
span.content-icon-certificate {
    background: #e1bee7;
    padding: 15px 12px;
    border-radius: 5px;
}
.color-title {
    color: black;
}
.content-btn-download {
    cursor: pointer;
}
.icon-download {
    color: #9b27b0;
}
span.text-download {
    color: #691b9a;
    text-transform: uppercase;
    margin-left: 10px;
}
</style>