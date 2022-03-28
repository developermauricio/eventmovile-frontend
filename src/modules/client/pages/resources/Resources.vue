<template>
  <Header :user="user" @actionFilter="actionFilter"/>

  <div v-if="listFilterActivities.length" class="container mt-4">
    <h6>Actividades</h6>    
    <div class="direction-rtl">
      <template v-for="activity in listFilterActivities" :key="activity.id">
        <span @click="removeFilterResource(activity)" 
          class="m-1 badge rounded-pill bg-light text-black">
          {{ activity.name }} 
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-x-circle-fill close-activity" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
          </svg>
        </span>
      </template>
    </div>    
  </div>

  <div class="container mt-5">
    <div v-if="event.req_files && resoursesActivity.length > 0">
      <Listresources :resoursesActivity="resoursesActivity"/>
    </div>
    
    <div v-else>No hay recursos descargables para este evento.</div>
  </div>

  <FilterResources ref="modalFilter" @actionFilterResources="actionFilterResources"  @actionCloseFilter="actionCloseFilter"/>
</template>

<script>
import {defineAsyncComponent} from "vue";
import { getSendRequest } from '@/utils/using-axios';

export default {
  name: "Resources",
  components:{
    Header: defineAsyncComponent(() => import('@/modules/client/pages/resources/components/Header')),
    Listresources: defineAsyncComponent(() => import('@/modules/client/pages/resources/components/Listresources')),
    FilterResources: defineAsyncComponent(() => import('@/modules/client/pages/resources/components/FilterResourses')),
  },  
  data() {
    return {
      user: {},
      event: {},
      resoursesActivityOriginal: [],
      resoursesActivity: [],
      listActivities: [],
      listFilterActivities: []
    }
  },
  methods: {
    actionFilter() {
      let listTemp = []

      this.listActivities.map( activity => {
        let exits = this.resoursesActivityOriginal.some( item => activity.id === item.model_id )
        if ( exits ) listTemp.push( activity )
      })

      this.$refs.modalFilter.showFilterResources( listTemp )
    },    
    removeFilterResource( activity ) {
      let pos = this.listFilterActivities.indexOf(activity);

      if ( pos != -1 ) {
        this.listFilterActivities.splice(pos, 1)        
      }

      if ( this.listFilterActivities.length ) {
        this.actionFilterResources( this.listFilterActivities )
      } else {
        this.resoursesActivity = this.resoursesActivityOriginal.slice()
      }
    },
    actionFilterResources( listFilter ) {
      this.listFilterActivities = listFilter
      let listFilterTemp = []
      
      this.resoursesActivityOriginal.map( resource => {
        let exits = listFilter.some( item => item.id === resource.model_id )
        if ( exits ) listFilterTemp.push( resource )
      })

      if ( listFilterTemp.length ) {
        this.resoursesActivity = listFilterTemp.slice()
      }
    },
    actionCloseFilter() {
      this.resoursesActivity = this.resoursesActivityOriginal.slice()
      this.listFilterActivities = []
    },
    async getDocsForActivity() {
      if ( this.event.activities.length == 0 ) return

      this.resoursesActivity = []

      /***  Consultar los recursos por cada actividad  ***/
      this.event.activities.map(async activity_id => {
        await this.getDocuments( activity_id )
      })      
    },
    async getDocuments( activityID ){
      const responseDocs = await getSendRequest(`modelDocuements/activity/${activityID}`) 
      
      if ( responseDocs ) {
        if ( responseDocs.data.length == 0 ) return
        
        responseDocs.data.map( doc => {
          this.resoursesActivityOriginal.push( doc )
        })
      }     

      this.resoursesActivity = this.resoursesActivityOriginal.slice()
    }
  },
  async created() {   
    this.loader = this.$loading.show({
      container: this.fullPage ? null : this.$refs.containerLoarder,
      canCancel: false,
    });

    this.user = JSON.parse( localStorage.getItem('user') ) || {}
    this.event = JSON.parse( localStorage.getItem('event') ) || {}
    this.listActivities = JSON.parse( localStorage.getItem('list_activities') ) || []

    await this.getDocsForActivity()      

    this.loader.hide()
  }
}
</script>

<style scoped>
span.badge {
  font-weight: 300;
  padding: 8px 13px;
}
.bg-light {
  background-color: #84848340 !important;
}
svg.close-activity {
  margin-left: 6px;
  color: #72299a;
}
</style>