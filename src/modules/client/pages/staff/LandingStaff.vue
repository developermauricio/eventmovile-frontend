<template>  
    <div class="container mt-5">
        <div class="card">
            <div class="card-body">
                <h2 class="text-center">Usuarios asistentes al evento</h2>

                <div class="row">
                    <div class="text-end my-3">
                        <!-- Boton para crear un nuevo usuario -->
                        <button type="button" class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#bootstrapBasicModal" >
                            <i class="bi bi-person-plus me-1"></i>
                            Nuevo registro
                        </button>
                        <!-- Boton para leer codigo QR -->
                        <router-link to="/reader-qr" class="btn btn-dark">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-qr-code-scan me-1" viewBox="0 0 16 16">
                                <path d="M0 .5A.5.5 0 0 1 .5 0h3a.5.5 0 0 1 0 1H1v2.5a.5.5 0 0 1-1 0v-3Zm12 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1h-2.5a.5.5 0 0 1-.5-.5ZM.5 12a.5.5 0 0 1 .5.5V15h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5Zm15 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H15v-2.5a.5.5 0 0 1 .5-.5ZM4 4h1v1H4V4Z"/>
                                <path d="M7 2H2v5h5V2ZM3 3h3v3H3V3Zm2 8H4v1h1v-1Z"/>
                                <path d="M7 9H2v5h5V9Zm-4 1h3v3H3v-3Zm8-6h1v1h-1V4Z"/>
                                <path d="M9 2h5v5H9V2Zm1 1v3h3V3h-3ZM8 8v2h1v1H8v1h2v-2h1v2h1v-1h2v-1h-3V8H8Zm2 2H9V9h1v1Zm4 2h-1v1h-2v1h3v-2Zm-4 2v-1H8v1h2Z"/>
                                <path d="M12 9h2V8h-2v1Z"/>
                            </svg>                            
                            Scanear QR
                        </router-link>
                    </div>
                </div>

                <hr class="mb-3" />
                
                <div>
                    <label class="me-2">Buscar: </label>
                    <input v-model="searchTerm" />
                </div>
                <table-lite
                    :is-static-mode="true"
                    :is-loading="table.isLoading"
                    :columns="table.columns"
                    :rows="table.rows"
                    :total="table.totalRecordCount"
                    :sortable="table.sortable"/>
            </div>
        </div>
    </div>

    <!-- Modal Register -->
    <ModalRegister />
</template>

<script>
import { defineAsyncComponent, defineComponent, reactive, ref, computed, watch, onMounted } from "vue";
import TableLite from 'vue3-table-lite'
import { getSendRequest } from '@/utils/using-axios';

export default defineComponent({
  name: "LandingStaff",
  components: { 
    TableLite,
    ModalRegister: defineAsyncComponent(() => import('@/modules/client/pages/staff/components/ModalRegister')),
  },
  setup() {
    let user = ref({})
    let event = ref({})
    const listUsers = ref([]);
    const searchTerm = ref(""); 
    
    // Fake data
    const data = reactive({
      rows: [],
    });

    /*** Get server data request  ***/
    const myRequest = async (keyword) => {
      if ( !event.value.id ) {
        event.value = JSON.parse( localStorage.getItem('event') ) || {}
      }           

      const responseAssistants = await getSendRequest(`/networking-wa/get-participants/${event.value.id}`) 
      
      if ( responseAssistants ) {
        listUsers.value = responseAssistants.data
      }

      return await new Promise((resolve, reject) => {
        try {
          table.isLoading = true;
          // Remove setTimeout() and change to your Axios request or AJAX request on here.
          setTimeout(() => {
            table.isLoading = false;
            let newData = listUsers.value.filter(
              (x) =>
                x.email.toLowerCase().includes(keyword.toLowerCase()) ||
                x.name.toLowerCase().includes(keyword.toLowerCase())
            );
            resolve(newData);
          }, 2000);
        } catch (error) {
          console.log("Fetch error", error);
          reject();
        }
      });
    };

    // Table config
    const table = reactive({
      isLoading: false,
      columns: [
        {
          label: "ID",
          field: "id",
          width: "3%",
          sortable: true,
          isKey: true,
        },
        {
          label: "Name",
          field: "name",
          width: "10%",
          sortable: true,
        },
        {
          label: "Email",
          field: "email",
          width: "15%",
          sortable: true,
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
        sort: "asc",
      },
    });

    /***  Use vue.js watch to watch your state's change  ***/
    watch(
      () => searchTerm.value,
      (val) => {
        myRequest(val).then((newData) => {
          data.rows = newData;
        });
      }
    );

    /* TODO: usuarios que se agregan a la lsita de asistencia al evento, guardar: id_user, id_event, fecha con la hora, lectura qr,   */
    
    onMounted(() => {
      user.value = JSON.parse( localStorage.getItem('user') ) || {}
    });

    // Get data on first rendering
    myRequest("").then((newData) => {
      data.rows = newData;
    });

    return {
      searchTerm,
      table,
      user,
      event,      
    };
  },
});
</script>

<style scoped>

</style>
