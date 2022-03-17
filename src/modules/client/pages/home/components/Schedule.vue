<template>
  <div class="pt-4 align-items-end container">
    <router-link to="/schedule">
      <p class="float-end mt-1 text-more" v-if="listActivitiesHalls.length !== 0"><i class="bi bi-plus-lg pe-3"></i>VER TODA</p>
      <h3 class="text-schedule">Agenda</h3>
    </router-link>
  </div>

  <!-- Lista de actividades -->
  <div v-if="listActivitiesHalls.length === 0" class="container">
    <div class="card w-100">
      <div class="card-body">
        <h6>No hay Actividades disponibles</h6>
      </div>
    </div>
  </div>

  <div v-else class="page-content-wrapper py-3 items-schedule">
    <div class="container pe-0 ps-0 slide-schedule">
      <div class="card">
        <div class="card-body p-3">
          <!--          <div class="slide-schedule-items">-->
          <!--            <template v-for="(activities, index) in listActivitiesHalls" :key="index">-->
          <!--              <div>-->
          <!--                <a v-for="activity in activities" :key="activity.id" @click="openActivity(activity)" class="affan-page-item time-schedule-content" href="#">-->
          <!--                  <div class="icon-wrapper ">-->
          <!--                    <p>-->
          <!--                      <span>{{ startDate(activity.start_date) }}</span>-->
          <!--                      <br>-->
          <!--                      <span>{{ startDateHour(activity.start_date) }}</span>-->
          <!--                    </p>-->
          <!--                  </div>-->

          <!--                  <div class="pt-3">-->
          <!--                    <h6 class="text-truncate mb-0">{{ activity.name }}</h6>-->
          <!--                    <p>En vivo ahora</p>&lt;!&ndash; TODO: falta revisar si la actividad esta en vivo. &ndash;&gt;-->
          <!--                  </div>-->

          <!--                  <i class="bi bi-chevron-right px-3"></i>-->
          <!--                </a>-->
          <!--              </div>-->
          <!--            </template>-->
          <!--          </div>-->
          <Carousel>
            <Slide v-for="(activities, index) in listActivitiesHalls" :key="index">
              <div class="carousel__item items-activities">
                <a v-for="activity in activities" :key="activity.id" @click="openActivity(activity)"
                   class="affan-page-item time-schedule-content" href="#">
                  <div class="icon-wrapper ">
                    <p>
                      <span>{{ startDate(activity.start_date) }}</span>
                      <br>
                      <span>{{ startDateHour(activity.start_date) }}</span>
                    </p>
                  </div>

                  <div class="pt-3">
                    <h6 class="text-truncate text-start">{{ activity.name.length > 15 ? activity.name.slice(0, 15) + "..." : activity.name }}</h6>
                    <p class="text-start">En vivo ahora</p><!-- TODO: falta revisar si la actividad esta en vivo. -->
                  </div>

                  <i class="bi bi-chevron-right px-3"></i>
                </a>
              </div>
            </Slide>

            <template #addons>
              <Navigation/>
            </template>
          </Carousel>

<!--          <div class="mt-3">-->
<!--            <nav aria-label="Page navigation example">-->
<!--              <ul class="pagination pagination-two controls-slide-schedule">-->
<!--                <li class="page-item">-->
<!--                  <a class="page-link ps-0" aria-label="Previous">-->
<!--                    <svg class="bi bi-chevron-left" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"-->
<!--                         xmlns="http://www.w3.org/2000/svg">-->
<!--                      <path fill-rule="evenodd"-->
<!--                            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"></path>-->
<!--                    </svg>-->
<!--                  </a>-->
<!--                </li>-->
<!--                <li class="page-item">-->
<!--                  <a class="page-link" aria-label="Next">-->
<!--                    <svg class="bi bi-chevron-right" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"-->
<!--                         xmlns="http://www.w3.org/2000/svg">-->
<!--                      <path fill-rule="evenodd"-->
<!--                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>-->
<!--                    </svg>-->
<!--                  </a>-->
<!--                </li>-->
<!--              </ul>-->
<!--            </nav>-->
<!--          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getSendRequest} from '@/utils/using-axios';
import 'vue3-carousel/dist/carousel.css';
import {Carousel, Slide, Navigation} from 'vue3-carousel';

export default {
  name: "Schedule",
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  data() {
    return {
      listActivitiesHalls: [],
      listActivitiesRes: [],
      hallsEvent: []
    }
  },
  methods: {
    startDate(start_date) {
      return this.$dayjs(start_date).format(`MMM DD`);
    },
    startDateHour(start_date) {
      return this.$dayjs(start_date).format('HH:mm a');
    },
    openActivity(activity) {
      localStorage.removeItem('current_Activity')
      localStorage.setItem('current_Activity', JSON.stringify(activity))
      // window.activityData = activity
      this.$router.push({path: '/event-live'})
    },

    /***  CONSULTAR DATOS DEL SERVIDOR  ***/
    async getHallsEvent() {
      // se traen todas las salas del evento
      const responseHalls = await getSendRequest(`hallsEvent/${this.event.id}`)
      if (responseHalls) this.hallsEvent = responseHalls.data
    },
    async getActivitiesHalls() {
      // lista de todas las actividades de cada sala
      // let activitiesHalls = this.hallsEvent.map( hall => {
      //   return JSON.parse(hall.activities)
      // })

      // consultar la informacion de cada actividad para el usuario
      // await activitiesHalls.map(async activity => {
      //   const responseActivities = await getSendRequest(`activityExternal/${activity}/${this.dataUser.id}`)
      //   if ( responseActivities ) {
      //     this.listActivitiesRes.push(responseActivities)
      //     localStorage.setItem('listActivities', JSON.stringify(this.listActivitiesRes))
      //     this.getListActivities()
      //   }
      // })


      /* // TODO: falta ordenar por fecha
        this.listActivities = this.listActivities.sort( (act1, act2) => {
        let date1 = new Date(act1.start_date)
        let date2 = new Date(act2.start_date)
        return date1 - date2;
      }) */
    },
    async getDataActivities() {
      const responseActivities = getSendRequest(`/get-schedule-event/${this.event.id}`)

      if (responseActivities) {
        responseActivities.then(res => {
          this.listActivitiesRes = res /*Almacenamos todas las actividades, vienen ordenadas por fecha*/
          this.getListActivities()
          if (document.querySelectorAll(".slide-schedule").length > 0) {
            window.tns({
              container: ".slide-schedule-items",
              items: 2,
              gutter: 1,
              center: false,
              slideBy: "page",
              autoplay: false,
              fixedWidth: 340,
              loop: false,
              autoplayButtonOutput: false,
              autoplayTimeout: 4000,
              speed: 1000,
              mouseDrag: false,
              controls: true,
              nav: false,
              navPosition: "bottom",
              controlsContainer: document.querySelector('.controls-slide-schedule'),
            });
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    getListActivities() {
      let list3 = []
      let listFull = []
      let index = 0;

      this.listActivitiesRes.forEach(item => {
        index++
        list3.push(item)

        if (index === 3) {
          index = 0
          listFull.push(list3)
          list3 = []
        }
      })

      if (list3.length > 0) {
        listFull.push(list3)
      }

      this.listActivitiesHalls = listFull;

    },
  },
  async created() {
    this.dataUser = JSON.parse(localStorage.getItem('user')) || {}
    this.eventStyles = JSON.parse(localStorage.getItem('style-event')) || {}
    this.event = JSON.parse(localStorage.getItem('event')) || {}

    await this.getDataActivities()
    // await this.getActivitiesHalls()
  },
  mounted() {

  }
}
</script>

<style scoped>
.items-activities{
  width: 100% !important;
  padding-left: 1rem !important;
  /*padding-right: 1rem !important;*/
}
.carousel__slide{
  align-items: flex-start !important;
  justify-content: start !important;
  /*width: 80% !important;*/
}


.text-schedule {
  font-weight: 600;
}

.text-more {
  font-size: 1rem;
  color: #AA47BC;
}

.items-schedule {
  margin-top: 0px !important;
}

.affan-page-item.time-schedule-content .icon-wrapper {
  width: 7.25rem !important;
  height: 3.25rem !important;
  border-radius: 8% !important;
}

.icon-wrapper p {
  margin-top: 1rem;
  padding: 1rem;
  text-align: center;
}

.controls-slide-schedule .page-link {
  color: rgba(0, 0, 0, 0.58);
  background-color: transparent !important;
}

.page-content-wrapper.items-schedule {
  margin-bottom: 0px !important;
}

#tns2 > .tns-item {
  padding-right: 10px;
  padding-left: 10px;
}
</style>
