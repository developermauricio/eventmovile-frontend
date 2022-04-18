<template>  
    <div class="mt-5">
    <!-- <div class="container mt-5"> -->
        <div class="card">
            <div class="card-body">
                <h2 class="text-center">{{ event.name }}</h2>

                <div class="content-data-view">                  
                  <div class="card-numbers text-center">
                    <h1 class="title">{{ listUsers.length }}</h1>
                    <span>Total de Registros</span>
                  </div>
                                    
                  <div class="card-numbers text-center">
                    <h1 class="title">{{ listUsersAttendance.length }}</h1>
                    <span>Asistentes {{ ((listUsersAttendance.length*100) / listUsers.length).toFixed(2) }}%</span>
                  </div>                  
                </div>

                <div class="row">
                  <div class="text-end my-3">
                    <!-- Boton para crear un nuevo usuario -->
                    <!-- <button type="button" class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#bootstrapBasicModal" > -->
                    <button @click="btnShowModal" type="button" class="btn btn-primary me-2">
                      <i class="bi bi-person-plus me-1"></i>
                      Nuevo registro
                    </button>
                    <!-- Boton para leer codigo QR -->
                    <!-- <router-link to="/reader-qr" class="btn btn-dark"> -->
                    <button @click="btnShowModalQR" class="btn btn-dark">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-qr-code-scan me-1" viewBox="0 0 16 16">
                        <path d="M0 .5A.5.5 0 0 1 .5 0h3a.5.5 0 0 1 0 1H1v2.5a.5.5 0 0 1-1 0v-3Zm12 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1h-2.5a.5.5 0 0 1-.5-.5ZM.5 12a.5.5 0 0 1 .5.5V15h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5Zm15 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H15v-2.5a.5.5 0 0 1 .5-.5ZM4 4h1v1H4V4Z"/>
                        <path d="M7 2H2v5h5V2ZM3 3h3v3H3V3Zm2 8H4v1h1v-1Z"/>
                        <path d="M7 9H2v5h5V9Zm-4 1h3v3H3v-3Zm8-6h1v1h-1V4Z"/>
                        <path d="M9 2h5v5H9V2Zm1 1v3h3V3h-3ZM8 8v2h1v1H8v1h2v-2h1v2h1v-1h2v-1h-3V8H8Zm2 2H9V9h1v1Zm4 2h-1v1h-2v1h3v-2Zm-4 2v-1H8v1h2Z"/>
                        <path d="M12 9h2V8h-2v1Z"/>
                      </svg>                            
                      Scanear QR
                    </button>
                  </div>
                </div>

                <hr class="mb-3" />
                
                <div class="content-search">
                  <label class="me-2">Buscar: </label>
                  <input v-model="searchTerm" />
                </div>
                <div class="table-responsive my-3">
                  <table-lite
                    :is-static-mode="true"
                    :is-loading="table.isLoading"
                    :columns="table.columns"
                    :rows="table.rows"
                    :sortable="table.sortable"
                    :total="table.totalRecordCount"                    
                    :messages="table.messages"  
                    @is-finished="tableLoadingFinish" />
                </div>
            </div>
        </div>
    </div>

    <!-- print ticket -->
    <!-- <div ref="contentPrint" id="my-print" :class="{'show-print': showPrint}" class="print-ticke" style="display:none"> -->
    <!-- <div ref="contentPrint" id="my-print" :class="{'show-print': showPrint}" class="print-ticke" >
      <div class="fields">
        <p>{{ userPrint.name || 'Nombre' }}</p>
        <p>{{ userPrint.lastname || 'Apellido' }}</p>
        <p>{{ userPrint.email || 'Email' }}</p>
      </div>
      <div>
        <img src="/assets/img/avatars/badge.png" class="img-qr">
      </div>
    </div> -->
    <div id="my-print2" :class="{'show-print': showPrint}" class="print-ticke2" >
      <div class="fields2">
        <p>{{ userPrint.name || 'Nombre' }}</p>
        <p>{{ userPrint.lastname || 'Apellido' }}</p>
        <p>{{ userPrint.email || 'Email' }}</p>
      </div>
      <div style="margin-top: -15px;">
        <vue-qr :text="dataUser" :size="150"></vue-qr>
        <!-- <img id="imgCodeQR" src="" class="img-qr2"> -->
       <!--  <img :src="getUrlBase64('https://uploads.sitepoint.com/wp-content/uploads/2015/12/1450377118cors3.png')" class="img-qr2"> -->
       <!--  <img src="https://backend-eventmovile.aicode-test.art/storage/documents/qr-code14235.png" class="img-qr2"> -->
      </div>
    </div>

    <!-- btn -->
    <button @click="printTicket" class="btn btn-primary"> generar pdf </button>

    <!-- Modal Register -->
    <ModalRegister ref="modalRegisterOpen" @updateList="updateUser" />
    <ModalReaderQR ref="modalReaderQROpen" @readerCode="registerAttendance" />
    <ModalUpdateUser ref="modalUpdateDataUser" @updateList="updateUser"/>
</template>

<script>
import { defineAsyncComponent, defineComponent, reactive, ref, computed, watch, onMounted } from "vue";
import { useLoading } from 'vue-loading-overlay'
import TableLite from 'vue3-table-lite'
import dayjs from 'dayjs';
import { getSendRequest, postSendRequest } from '@/utils/using-axios';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import VueQr from 'vue-qr/src/packages/vue-qr.vue'

export default defineComponent({
  name: "LandingStaff",
  components: { 
    VueQr,
    TableLite,
    ModalRegister: defineAsyncComponent(() => import('@/modules/client/pages/staff/components/ModalRegister')),
    ModalReaderQR: defineAsyncComponent(() => import('@/modules/client/pages/staff/components/ModalReaderQR')),
    ModalUpdateUser: defineAsyncComponent(() => import('@/modules/client/pages/staff/components/ModalUpdateUser')),
  },  
  setup() {
    const $loading = useLoading()
    let user = ref({})
    let event = ref({})
    const listUsers = ref([]);
    const listUsersAttendance = ref([]);
    const searchTerm = ref(""); 
    const modalRegisterOpen = ref(null)
    const modalReaderQROpen = ref(null)
    const modalUpdateDataUser = ref(null)
    let showPrint = ref(false)
    let userPrint = ref({})
    const contentPrint = ref(null);
    let dataUser = JSON.stringify({
      name: 'Rodinson',
      lastname: 'Tombe',
      id: 123456,
    })
    
    // Fake data
    const data = reactive({
      rows: [],
    });

    const getInfoUsers = async () => {
      if ( !event.value.id ) event.value = JSON.parse( localStorage.getItem('event') ) || {}
      
      const responseAssistants = await getSendRequest(`/get-user-register/${event.value.id}`) 
      const responseAttendance = await getSendRequest(`get-all-attendance/${event.value.id}`)
      
      if ( responseAssistants ) {
        if ( responseAttendance ) {
          responseAssistants.map( item => {
            const attend = responseAttendance.find( att => att.user_id === item.id )
            
            if ( attend ) {
              item.date_register = attend.date_register
            }
          }) 
          listUsersAttendance.value = responseAttendance
        } 
        
        listUsers.value = responseAssistants
      }
    }

    /*** Get server data request  ***/
    const myRequest = async (keyword, reload = false) => {
      table.isLoading = true;
      if ( reload ) await getInfoUsers()

      return await new Promise((resolve, reject) => {
        try {
          setTimeout(() => {            
            let newData = listUsers.value.filter( (x) => {
              let fullname = x.name + ' ' + x.lastname
              return x.email.toLowerCase().includes(keyword.toLowerCase()) || fullname.toLowerCase().includes(keyword.toLowerCase())
            });

            table.isLoading = false;
            resolve(newData);
          }, 1000);
        } catch (error) {
          console.log("Fetch error", error);
          reject();
        }
      });
    };

    /***  Configuración de la tabla  ***/
    const table = reactive({
      isLoading: false,
      columns: [        
        {
          label: "Nombre",
          field: "name",
          width: "15%",
          sortable: true,
          display: (row) => {
            return row.name + ' ' + row.lastname
          }
        },
        {
          label: "Email",
          field: "email",
          width: "15%",
          sortable: true,
          display: (row) => {
            return (`<div class="field-email-user" style="color:#AA47BC;cursor:pointer;" user_id="${row.id}">${row.email}</div>`)
          }
        },
        {
          label: "Fecha de registro",
          field: "created_at",
          width: "17%",     
          display: (row) => {
            return ( getDateRegister(row.created_at) )
          }     
        },
        {
          label: "Asistencia",
          field: "",
          width: "10%",
          display: (row) => {
            return (
              row.date_register ? row.date_register : `<div class="text-center"><button user_id="${row.id}" class="btn m-1 btn-sm btn-primary btn-register">Registrar</button></div>`
            )
          }
        },
      ],
      rows: computed(() => {
        return data.rows;
      }),
      totalRecordCount: computed(() => {
        return table.rows.length;
      }),
      sortable: {
        order: "id",
        sort: "desc",
      },
      messages: {
        pagingInfo: "",
        pageSizeChangeLabel: "Filas: ",
        gotoPageLabel: " ir a la página: ",
        noDataAvailable: "No hay datos disponibles",
      },
    });   

    const getDateRegister = ( date ) => {      
      return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
    }

    /***  Use vue.js watch to watch your state's change  ***/
    watch(
      () => searchTerm.value,
      (val) => {
        myRequest(val).then((newData) => {
          data.rows = newData;
        });
      }      
    );

    /***  Función para asignar eventos clicks al email y para registrar  ***/
    const tableLoadingFinish = () => {
      setTimeout(() => {        
        addEventClicksTable()
      }, 300);    
    }

    const addEventClicksTable = () => {
      const listEmailUser = document.querySelectorAll('.field-email-user') 

      if ( listEmailUser.length > 0 ) {
        listEmailUser.forEach( email => {          
          email.addEventListener("click", function() {
            clickEmailUser( email.getAttribute('user_id') )
          })
        })
      }

      const listBtnRegisters = document.querySelectorAll('.btn-register')  
         
      if ( listBtnRegisters.length > 0 ) {  
        listBtnRegisters.forEach( btn => {          
          btn.addEventListener("click", function() {
            registerAttendance( btn.getAttribute('user_id'), 0 )
          })
        })   
      }  
    }

    /***  funciones para mostrar las modales de registro y lectura de codigo QR  ***/
    const btnShowModal = () => {            
      modalRegisterOpen.value.openModal()
    }

    const btnShowModalQR = () => {      
      modalReaderQROpen.value.openModalQR()
    }

    const clickEmailUser = ( user ) => {
      modalUpdateDataUser.value.openModalUpdate( user )
    }

    /***  Registrar la aistencia del usuario por QR o por el btn registrar  ***/
    const registerAttendance = async ( user = 0, qr = 1 ) => {     
      let loader = $loading.show({
        canCancel: false,
        color: '#ac58bc'
      });

      const dataRegister = {
        event_id: event.value.id,
        user_id: user,
        register_qr: qr
      }

      const newResponse = await postSendRequest( '/register-attendance', dataRegister )      
         
      if ( newResponse ) {
        await myRequest("", true).then((newData) => {
          data.rows = newData;
        });
      }

      /***  Se imprime solo si el evento es diferente a virtual  ***/
      if ( event.value.type.id != 1 ) {
        userPrint.value = listUsers.value.find( item => item.id == user )   
        await printTicket()
      }

      loader.hide()
    }

    const getUrlBase64 = ( url ) => {
      const img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 200;
        canvas.height = 200;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/png");
        console.log(dataURL)
        document.getElementById("imgCodeQR").src = dataURL;
      }
      img.src = url
      /* const getBase64Image = (url) => {
  const img = new Image();
  img.setAttribute('crossOrigin', 'anonymous');
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL("image/png");
    console.log(dataURL)
  }
  img.src = url
}
getBase64Image('https://uploads.sitepoint.com/wp-content/uploads/2015/12/1450377118cors3.png') */
    }

    const printTicket = () => {
      
      /* showPrint.value = true      

      setTimeout(() => {
        window.print()
        showPrint.value = false
      }, 500); */
      /* const doc = new jsPDF();
      doc.text("Hello world!", 10, 10);
      doc.save("a4.pdf"); */

      /* var doc = new jsPDF();

      doc.setFontSize(40);
      doc.text("Octonyan loves jsPDF", 35, 25);
      //doc.addImage(imgData, "JPEG", 15, 40, 180, 180);   html2canvas

      // Set the document to automatically print via JS
      doc.autoPrint(); */
      /* const element = document.getElementById('my-print')
      console.log('elemento:  ',element)
      console.log('ancho:  ',element.offsetWidth)
      console.log('alto:  ',element.offsetHeight) */

      
      window.html2canvas = html2canvas
      const elementHTML = document.getElementById('my-print2')
      //const heightPDF = elementHTML.offsetHeight

      //var doc = new jsPDF('l', 'px', [elementHTML.offsetWidth, elementHTML.offsetHeight]);
      //var doc = new jsPDF('p', 'mm', [80, heightPDF]);
      var doc = new jsPDF('p', 'pt', 'a7');
      
      // margin: [left, top, right ,bottom] // the default is [0, 0, 0, 0]

      doc.html( elementHTML, {
        margin: [-2, -2, 0, 0],
        callback: (pdf) => {
          pdf.save('mypdf.pdf')
        }
      })      

    }

    const updateUser = ( reload = true ) => {
      if ( reload ) {
        myRequest("", true).then((newData) => {
          data.rows = newData;
        });
      }
    }

    onMounted(() => {
      user.value = JSON.parse( localStorage.getItem('user') ) || {}  
      /* setTimeout(() => {        
        getUrlBase64('https://uploads.sitepoint.com/wp-content/uploads/2015/12/1450377118cors3.png')
        //getUrlBase64('https://backend-eventmovile.aicode-test.art/storage/documents/qr-code14235.png')
      }, 1000); */   
    });

    // Obtener datos sobre el primer renderizado
    myRequest("", true).then((newData) => {
      data.rows = newData;
    });

    return {
      searchTerm,
      table,
      user,
      event,  
      listUsers, 
      listUsersAttendance,
      modalRegisterOpen,   
      modalReaderQROpen,
      modalUpdateDataUser,
      btnShowModal,
      btnShowModalQR,
      updateUser,
      registerAttendance,
      tableLoadingFinish,
      showPrint,
      userPrint,
      printTicket,
      contentPrint,
      getUrlBase64,
      dataUser,
    };
  },
});
</script>

<style scoped>
@media print{
  body *:not(#my-print):not(#my-print *) {
    visibility: hidden;
  }
  #my-print {
    position: absolute;
    top: 0;
    left: 0;
  }
}
/* @media print{
  body *:not(#my-print2):not(#my-print2 *) {
    visibility: hidden;
  }
  #my-print2 {
    position: absolute;
    top: 0;
    left: 0;
  }
} */

.show-print {
  display: block !important;
}

.print-ticke {
  /* width: 340px; */
  width: 80mm;
  height: 168px;
  background: white;
  border-radius: 14px;
  padding: 24px;
}
.fields {
  float: left;
}
.img-qr {
  width: 57px;
  height: 116px;
  margin-top: 4px;
  float: right;
}

div#my-print2 {
  width: 80mm;
  height: auto;
  background: white;
  border-radius: 14px;
  padding: 15px;
  text-align: center;
}
img.img-qr2 {
  width: 150px;
  height: 150px;
}

.content-data-view {
  width: 100%;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}
.card-numbers {
  padding: 10px 1rem;
  border: 1px dotted #6e449d;
  border-radius: 5px;
  margin-right: 1rem;
}
h1.title {
  font-weight: 600;
  margin-bottom: 0;
}
.content-search {
  text-align: end;
}
::v-deep(.vtl-table .vtl-thead .vtl-thead-th) {
  color: #000000e8;
  font-weight: bold;
  background-color: #f3f2f7;
  border-color: #f3f2f7;
}
::v-deep(.vtl-table td),
::v-deep(.vtl-table tr) {
  border: none;
  border-bottom: 1px solid #84778e6e;
}
::v-deep(.vtl-paging-info) {
  color: rgb(6 18 56);
}
::v-deep(.vtl-paging-count-label),
::v-deep(.vtl-paging-page-label) {
  color: rgb(6 18 56);
}
::v-deep(.vtl-paging-change-div) {
  position: absolute;
  top: 0;
}
::v-deep(.vtl-paging-pagination-div) {
  position: absolute;
  right: 30px;
}

@media (max-width: 767.98px) {
  .content-search {
    margin-bottom: 1.5rem;
  }
  ::v-deep(.vtl-paging-pagination-div) {
    right: 0;
  }
}
</style>
