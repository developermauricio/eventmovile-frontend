<template>
  <div class="scroll-content-info p-2">
    <div class="content-first-info">
      <div class="row">
        <div class="col-10">
          <h3>{{ activity.name }}</h3>
        </div>
        <!--                  <div class="col-2">-->
        <!--                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-heart color-icon" viewBox="0 0 16 16">-->
        <!--                          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>-->
        <!--                      </svg>-->
        <!--                  </div>-->
      </div>
      <div class="row">
        <div class="col-12">
          <p>{{ activity.sort_description }}</p>
        </div>
      </div>
      <div class="mt-2 display-flex">
        <div class="style-span-green">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-clock color-icon-green" viewBox="0 0 16 16">
            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
          </svg>
          <span>{{ startDateHour(activity.start_date) }}</span>
        </div>
        <div class="style-span">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-record-circle color-icon" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
          </svg>
          <!--          {{ activity.name.length > 22 ? activity.name.slice(0, 22) + "..." : activity.name }}-->
          <Popper style="cursor: pointer" arrow :content='activity.hall.map((hall) => {
                  return hall.name
          }).join(", ")
          '>
            <span>Sala{{ activity.hall.length > 1 ? 's' : '' }}: {{
                activity.hall.map((hall) => {
                  return hall.name.length > 10 ? hall.name.slice(0, 10) + "..." : hall.name
                }).join(', ')
              }}</span>
          </Popper>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12 col-md-5 col-lg-6">
          <div class="setting-wrapper me-4" data-bs-toggle="offcanvas" data-bs-target="#modalRatingActivity"
               aria-controls="modalRatingActivity">
            <div class="style-span-danger" style="cursor: pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                   class="bi bi-hand-thumbs-up color-icon" viewBox="0 0 16 16">
                <path
                    d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
              </svg>
              <span>Calificiar Actividad</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="activity.speakers.length == 0">
      No hay speaker disponibles para esta actividad.
    </div>

    <div v-else>
      <template v-for="(speaker, index) in activity.speakers" :key="index">
        <div class="row mt-5 p-2">
          <div class="col-2">
            <div class="">
              <img :src="speaker.pic ? urlBaseFile + speaker.pic : '/assets/img/avatars/photo-user.png'"
                   class="img-circle img-user" alt="Photo speaker">
            </div>
          </div>
          <div class="col-9 pt-2">
            <h6 class="text-truncate mb-0">{{ speaker.name }}</h6>
            <div class="last-chat mt-2">
              <p class="text-truncate mb-0">{{ speaker.profesion ? speaker.profesion : 'Por definir' }}</p>
            </div>
          </div>
        </div>
        <div class="row mt-3 p-2">
          <p class="text-justify">{{ speaker.sort_description }}</p>
        </div>
        <hr>
      </template>
    </div>
  </div>
  <ModalRating/>
</template>

<script>
import ModalRating from "./modals/ModalRating";
export default {
  name: "Info",
  components:{
    ModalRating
  },
  // props: {
  //   activity: {
  //     type: Object,
  //     // default: function () {
  //     //   return {};
  //     // },
  //   }
  // },
  data() {
    return {
      activity: {
        speakers: [],
        hall: [],
      },
      urlBaseFile: process.env.VUE_APP_API_URL_FILES,
    }
  },
  methods: {
    startDateHour(start_date) {
      return this.$dayjs(start_date).format('HH:mm a');
    },
  },
  mounted() {
    // this.activity = window.activityData
    this.activity = JSON.parse(localStorage.getItem('current_Activity'))
    console.log('ESTAMOS EN LA INFO', this.activity)
  }
}
</script>

<style scoped>

.img-user {
  object-fit: contain;
  width: 60px;
  height: 60px;
}

.content-first-info {
  background-color: #eee9f7;
  margin: -16px -24px;
  padding: 2rem;
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

.style-span-danger {
  padding: 3px 8px;
  border: 1px solid rgba(255, 242, 0, 0.63);
  border-radius: 18px;
  margin-right: 15px;
  background-color: rgba(255, 242, 0, 0.67);
  color: #746426;
  font-size: 14px;
}

.style-span-danger .color-icon {
  color: #746426;
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