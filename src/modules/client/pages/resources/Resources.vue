<template>
  <Header :user="user"/>
  <div class="container mt-5">
    <div v-if="event.req_files">
      <Listresources :resoursesActivity="resoursesActivity"/>
    </div>
    
    <div v-else>No hay recursos descargables para este evento.</div>
  </div>
</template>

<script>
import {defineAsyncComponent} from "vue";
import { getSendRequest } from '@/utils/using-axios';

export default {
  name: "Resources",
  components:{
    Header: defineAsyncComponent(() => import(/* webpackChunkName: "Header"*/ '@/modules/client/pages/resources/components/Header')),
    Listresources: defineAsyncComponent(() => import(/* webpackChunkName: "Header"*/ '@/modules/client/pages/resources/components/Listresources')),
  },
  data() {
    return {
      user: {},
      event: {},
      hallsEvent: null,
      resoursesActivity: null,
    }
  },
  methods: {
    async getHalls() {
      const responseHalls = await getSendRequest(`showHallsInLineTime/${this.event.id}/${this.user.id}`) 
      let listActivities = []
      console.log('showHallsInLineTime: ', responseHalls)    
      if( responseHalls ) {
        console.log('showHallsInLineTime: ', responseHalls.data)
        responseHalls.data.map( hall => {
          console.log('hall: ', hall);
          if ( hall.activities1 ) {
            console.log('activities: ', hall.activities1);
            hall.activities1.map( activity => {
              activity.name_hall = hall.name
              listActivities.push(activity)
            })
          }
        })

        console.log('listActivities: ', listActivities)
      }
    },
    async getDocuments(){
      const activityID = 336
      const response = await getSendRequest(`modelDocuements/activity/${activityID}`) 
      console.log('modelDocuements: ', response)
      if ( response ) {
        this.resoursesActivity = response.data
        console.log('resoursesActivity: ', this.resoursesActivity)
      }
    }
  },
  created() {    
    this.user = JSON.parse( localStorage.getItem('user') ) || {}
    this.event = JSON.parse( localStorage.getItem('event') ) || {}
    //console.log('event data: ', this.event)
    //console.log('user data: ', this.user)

    this.getHalls()
    this.getDocuments()
  }
}
</script>

<style scoped>

</style>