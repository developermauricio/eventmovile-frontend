<template>
  <Header/>
  <Participants/>
  <div id="nav">
    <Navbutton/>
  </div>
</template>

<script>
import {defineAsyncComponent} from "vue";

export default {
  name: "Networking",
  data() {
    return {
      eventID: 0,
      listUserChat: [],
      fullPage: false,
      loader: null,
    }
  },
  components:{
    Navbutton: defineAsyncComponent(() => import(/* webpackChunkName: "Navbutton"*/ '@/modules/client/shared/components/Navbutton')),
    Header: defineAsyncComponent(() => import(/* webpackChunkName: "Header"*/ '@/modules/client/pages/networking/components/Header')),
    Participants: defineAsyncComponent(() => import(/* webpackChunkName: "Participants"*/ '@/modules/client/pages/networking/components/Participants')),
  },
  methods: {
    getListsUserEvent() {
      this.loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.containerLoarder,
        canCancel: false,
      });

      window.axios.get(`usersForEvent/${this.eventID}`)
        .then( response => {
          this.listUserChat = response.data.data
          localStorage.setItem("listUserChat", JSON.stringify(this.listUserChat));
          this.loader.hide()
        }).catch( error => {
          this.loader.hide()
          console.log('error... ', error)
        })
    }
  },
  created() {
    this.eventID = localStorage.getItem("eventId")
    this.listUserChat = JSON.parse( localStorage.getItem('listUserChat') ) || []

    if ( this.listUserChat.length === 0 ) {
      this.getListsUserEvent()
    }
  }
}
</script>

<style scoped>

</style>