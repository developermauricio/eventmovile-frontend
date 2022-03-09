<template>
  <Header :user="user"/>
  <div class="container mt-5">
    <div v-if="event.req_files && resoursesActivity.length > 0">
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
    Header: defineAsyncComponent(() => import('@/modules/client/pages/resources/components/Header')),
    Listresources: defineAsyncComponent(() => import('@/modules/client/pages/resources/components/Listresources')),
  },
  data() {
    return {
      user: {},
      event: {},
      resoursesActivity: [],
      listActivities: [],
    }
  },
  methods: {
    async getHalls() {
      /***  Consultar las salas y sacar todas las actividades  ***/
      const responseHalls = await getSendRequest(`showHallsInLineTime/${this.event.id}/${this.user.id}`) 
            
      if( responseHalls ) {
        responseHalls.data.map( hall => {
          if ( hall.activities1 ) {
            hall.activities1.map( activity => {
              activity.name_hall = hall.name
              this.listActivities.push(activity)
            })
          }
        })
      }

      if ( this.listActivities.length == 0 ) return

      /***  Consultar los recursos por cada actividad  ***/
      this.listActivities.map(async activity => {
        await this.getDocuments( activity.id )
      })
    },
    async getDocuments( activityID ){
      const responseDocs = await getSendRequest(`modelDocuements/activity/${activityID}`) 
      
      if ( responseDocs ) {
        if ( responseDocs.data.length == 0 ) return
        
        responseDocs.data.map( doc => {
          this.resoursesActivity.push(doc)
        })
      }
    }
  },
  async created() {   
    this.loader = this.$loading.show({
      container: this.fullPage ? null : this.$refs.containerLoarder,
      canCancel: false,
    });

    this.user = JSON.parse( localStorage.getItem('user') ) || {}
    this.event = JSON.parse( localStorage.getItem('event') ) || {}

    await this.getHalls()    

    this.loader.hide()
  }
}
</script>

<style scoped>

</style>