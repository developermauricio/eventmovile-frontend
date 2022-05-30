<template>
  <div>
    <div class="container pe-0 ps-0">
      <div class="minimal-tab mt-4">
        <div v-if="noData" class="container">
          <div class="card w-100">
            <div class="card-body">
              <h6>No hay Actividades disponibles</h6>
            </div>
          </div>
        </div>
        <!--=====================================
          TABAS CON LOS DIAS
        ======================================-->
        <ul class="nav nav-tabs" id="affanTab2" role="tablist">
          <li class="nav-item" role="presentation" v-for="(days, index) in countDays" :key="days">
            <button @click.prevent="inactiveTab(index, days.day)"
                    :class="`btn btn-tab ${days.day === countDays[0].day ? 'active' : ''}`" :id="`sass-tab${index}`"
                    data-bs-toggle="tab" :data-bs-target="`#sass${index}`" role="tab"
                    aria-controls="sass" :aria-selected="`${days.day === countDays[0].day ? 'true': 'false'}`">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor"
                   class="bi bi-calendar-event" viewBox="0 0 16 16">
                <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
                <path
                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
              </svg>
<!--              <span style="font-size: 1rem"> DÍA {{ days.day }}</span>-->
              <span style="font-size: 1rem"> DÍA {{ $dayjs(days.day).format(`DD MMMM`) }}</span>
            </button>
          </li>
        </ul>

        <div class="tab-content rounded-lg" id="affanTab2Content">
          <!--=====================================
            CONTENIDO
          ======================================-->
          <div v-for="(days, index) in countDays" :key="days">
            <div :class="`tab-pane fade ${days.day === dayActual ? 'active show': ''}`" :id="`sass${index}`"
                 role="tabpanel"
                 aria-labelledby="sass-tab">
              <div class="container ps-0 pe-0">
                <div class="card" v-if="days.day === dayActual">
                  <div class="card-body">
                    <!--=====================================
                    ITEM ACTIVIDADES
                  ======================================-->
                    <div v-for="(dataActivity, index) in dataActivities" :key="index">
                      <div v-if="days.day === dayActual">
                        <div class="display-flex justify-content-between">
                          <p class="date">{{ $dayjs(dataActivity.start_date).format(`ddd DD MMMM, YYYY`) }}</p>
                          <div @click.prevent="onFavoriteActivity(dataActivity)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                 class="bi bi-heart-fill" viewBox="0 0 16 16" v-if="dataActivity.is_favorite">
                              <path fill-rule="evenodd"
                                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                 class="bi bi-heart" viewBox="0 0 16 16" v-else>
                              <path
                                  d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                            </svg>
                          </div>
                        </div>


                        <a class="affan-page-item p-2" @click="openActivity(dataActivity)">
                          <div class="me-3">

                            <!-- Icono de video streaming -->
                            <div v-if="dataActivity.onDemand === 0">
                              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor"
                                   class="bi bi-broadcast mb-3" viewBox="0 0 16 16">
                                <path
                                    d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707zm2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 1 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708zm5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708zm2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707zM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
                              </svg>
                            </div>

                            <br>
                            <!-- Icono de onDemand -->
                            <div v-if="dataActivity.onDemand === 1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor"
                                   class="bi bi-play-btn-fill mb-3" viewBox="0 0 16 16">
                                <path
                                    d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
                              </svg>
                            </div>
                          </div>

                          <div class="p-2 text-title-evaluate-event">
                            <h5 class="mb-0">{{ dataActivity.name }}</h5>

                            <p>
                              <span
                                  class="text-primary">Speaker{{ dataActivity.speakers.length > 1 ? 's' : '' }}: </span>{{
                                dataActivity.speakers.map((speaker) => {
                                  return speaker.name
                                }).join(", ")
                              }} | <span class="text-primary">Sala{{ dataActivity.hall.length > 1 ? 's' : '' }}: </span>{{
                                dataActivity.hall.map((hall) => {
                                  return hall.name
                                }).join(", ")
                              }}
                            </p>
                            <div class="mt-4 display-flex">
                              <div class="style-span-green">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     class="bi bi-clock color-icon-green" viewBox="0 0 16 16">
                                  <path
                                      d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                                </svg>
                                <span>{{ $dayjs(dataActivity.start_date).format("hh:mm:a") }}</span>
                              </div>
                              <!--                              <div class="style-span">-->
                              <!--                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"-->
                              <!--                                     class="bi bi-people color-ico me-1" viewBox="0 0 16 16">-->
                              <!--                                  <path-->
                              <!--                                      d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>-->
                              <!--                                </svg>-->
                              <!--                                <span>180</span>-->
                              <!--                              </div>-->
                            </div>
                          </div>
                        </a>
                      </div>
                      <hr>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--=====================================
        BUSCADOR
    ======================================-->
    <Search :items="dataFullActivities"/>
    <!--=====================================
        COMPONENTE TOAST
    ======================================-->
    <ToastAlert ref="toast"/>
  </div>
</template>

<script>
import ToastAlert from "../../../shared/components/ToastAlert";
import {defineAsyncComponent, onMounted, ref} from "vue";
import {getSendRequest} from "@/utils/using-axios"
import {useLoading} from 'vue-loading-overlay'
import router from "../../../../../router";


export default {
  name: "Tabsinfo",
  components: {
    ToastAlert,
    Search: defineAsyncComponent(() => import(/* webpackChunkName: "Search"*/ '@/modules/client/pages/schedule/components/Search'))
  },
  setup() {

    const dataActivities = ref([])
    const dataFullActivities = ref([]) /*Permite almacenar todas las actividades*/
    const idEvent = ref(null)
    const idUser = ref(null)
    const countDays = ref([]) /*La cantidad de dias que hay segun la fecha de inicio de las actividades*/
    const tabActual = ref(0)  /* Nos permita saber en que tab nos encontramos*/
    const dayActual = ref(null) /* Nos permite ver el dia, segun el tab, en el cual nos encontramos*/
    const toast = ref(null)
    const $loading = useLoading()
    const fullPage = ref(false)
    const noData = ref(false)
    const urlBase = ref(process.env.VUE_APP_API_UR)
    const isFavoriteActivityId = ref(null)

    /*=============================================
      TRAEMOS TODAS LAS ACTIVIDADES POR POST
      =============================================*/
    const getDataActivities = async () => {
      const loader = $loading.show({
        color: '#ac58bc',
        // container: fullPage.value ? null : this.$refs.containerLoarder,
        canCancel: false,
      });
      const responseActivities = getSendRequest(`/get-schedule-event/${idEvent.value}/${idUser.value}`)
      if (responseActivities) {
        responseActivities.then(res => {
          dataFullActivities.value = res /*Almacenamos todas las actividades, vienen ordenadas por fecha*/
          dataFullActivities.value.map(activities => { /* Aqui recorremos todas las actividades y la almacenamos en el dia actual*/
            if (activities.start_date === dayActual.value) { /* Si el dia actual es 1, entonces traemos las actividades con del dia 1*/
              dataActivities.value.push(activities)
              localStorage.setItem('dataActivitiesSchedule', JSON.stringify(dataActivities.value))
              // console.log(dataActivities.value)
              loader.hide()
            }
          })
        }).catch(err => {
          console.log(err)
          loader.hide()
          toast.value.toastAlertError('Error, consulte con el administrador')
        })
      } else {
        noData.value = true
      }
    }
    /*=============================================
    TRAEMOS LA CANTIDAD DE DIAS SEGUN LAS ACTIVIDADES
    =============================================*/
    const getCountDays = async () => {
      const responseCountDays = getSendRequest(`/get-count-days-schedule/${idEvent.value}`)
      if (responseCountDays) {
        responseCountDays.then(res => {
          countDays.value = res
          dayActual.value = res[0].day
        }).catch(err => {
          console.log(err)
          toast.value.toastAlertError('Error, consulte con el administrador')
        })
      } else {
        noData.value = true
      }
    }

    const onFavoriteActivity = async (activity) => {
      const data = new FormData();
      data.append("activity_id", activity.id);
      data.append("user_id", idUser.value);
      console.log(activity);
      if (!activity.is_favorite) {
        window.axios.post(`/save-favorite-activity`, data).then(res => {
          console.log(res)
          activity.is_favorite = true
          isFavoriteActivityId.value = res.data.is_favorite
          dataActivities.value.map(item => {
            item.id === activity.id ? item.is_favorite = true : ''
          })
        }).catch(err => {
          console.log(err)
        })
      } else {
        setTimeout(() => {
          window.axios.post(`/remove-favorite-activity/${activity.id_favorite.id}`, data).then(response => {
            console.log(response)
            activity.is_favorite = false
            dataActivities.value.map(item => {
              item.id === activity.id ? item.is_favorite = false : ''
            })
          }).catch(err => {
            console.log(err)
          })
        }, 200)
      }
    }

    /*=============================================
        FUNCIÓN PARA INACTIVAR EL TAB
        =============================================*/
    const inactiveTab = (index, day) => {
      if (day !== dayActual.value) {
        document.getElementById("sass" + tabActual.value).classList.remove("active");
        document.getElementById("sass" + tabActual.value).classList.remove("show");
      }

      tabActual.value = index
      dayActual.value = day
      console.log('DIA ACTUAL ', dayActual.value)

      dataActivities.value = []
      dataFullActivities.value.map(activities => {
        // console.log('ACTIVIDADES ',activities)
        if (activities.start_date === dayActual.value) {
          console.log('ACTIVIDADES DIA ', activities.day)
          dataActivities.value.push(activities)
        }
      })
    }

    const openActivity = (activity) => {
      localStorage.removeItem('current_Activity')
      localStorage.setItem('current_Activity', JSON.stringify(activity))
      // window.activityData = activity
      router.push('/event-live')
      // this.$router.push({path: '/event-live'})
    }

    onMounted(() => {
      idEvent.value = localStorage.getItem('eventId')
      idUser.value = JSON.parse(localStorage.getItem('user')).id
      if (document.querySelectorAll(".minimal-tab").length > 0) {
        window.tns({
          container: ".nav-tabs",
          items: 3,
          gutter: 10,
          slideBy: "page",
          loop: false,
          autoplay: false,
          center: false,
          autoplayButtonOutput: false,
          autoplayTimeout: 5000,
          speed: 750,
          mouseDrag: false,
          controls: false,
          nav: false,
        });
      }
      getCountDays()
      getDataActivities()
    })
    return {
      toast,
      noData,
      idUser,
      idEvent,
      urlBase,
      fullPage,
      countDays,
      tabActual,
      dayActual,
      dataActivities,
      dataFullActivities,
      isFavoriteActivityId,
      getDataActivities,
      getCountDays,
      openActivity,
      inactiveTab,
      onFavoriteActivity
    }
  },
}
</script>

<style scoped>

::-webkit-scrollbar {
  display: none;
}

.nav {
  flex-wrap: initial !important;
}

.minimal-tab .btn {
  width: 102px !important;
}

ul.nav-tabs {
  justify-content: space-between !important;
  width: 100% !important;
  overflow: auto !important;
}

.nav-item {
  display: inline-block !important;
  clear: both !important;
  padding-bottom: 1px !important;
  padding-right: 10px !important;
  padding-left: 10px !important;
}

.text-title-evaluate-event h6 {
  font-weight: 600;
}

.text-title-evaluate-event p {
  color: #00000094 !important;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-top: 0.5rem;
}

.btn-tab {
  font-size: 1.3rem !important;
}

.date {
  color: #00000094 !important;
}

.controls .page-link {
  color: rgba(0, 0, 0, 0.58);
  background-color: transparent !important;
}

.minimal-tab .btn.active svg {
  border-bottom-color: #AA47BC;
  color: #AA47BC !important;
}

.minimal-tab .btn.active span {
  color: #3D2895 !important;
}

.minimal-tab .btn.active {
  border-bottom-color: #AA47BC;
  color: #AA47BC !important;
}

.minimal-tab .btn {
  color: #00000061 !important;
}
.bi-heart-fill{
  color: #a033b4 !important;
}
.bi-heart{
  color: #a033b4 !important;
}
.color-icon {
  color: #a033b4;
  margin-right: 8px;
}

.color-icon-green {
  color: #4caf50;
  margin-right: 8px;
}

.style-span {
  padding: 3px 8px;
  border: 1px solid #c788d4;
  border-radius: 18px;
  margin-right: 15px;
  background-color: #f3e5f5;
  color: #542193;
  font-size: 14px;
}

.style-span-green {
  padding: 3px 8px;
  border: 1px solid #8ecb92;
  border-radius: 18px;
  margin-right: 15px;
  background-color: #e8f5e9;
  color: #1b5e20;
  font-size: 14px;
}

.text-justify {
  text-align: justify;
}

.display-flex {
  display: flex;
}


</style>