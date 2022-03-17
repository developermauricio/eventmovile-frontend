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
        <!--        <div class="style-span">-->
        <!--          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"-->
        <!--               class="bi bi-people color-icon" viewBox="0 0 16 16">-->
        <!--            <path-->
        <!--                d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>-->
        <!--          </svg>-->
        <!--          <span>113</span>-->
        <!--        </div>-->
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
</template>

<script>
export default {
  name: "Info",
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