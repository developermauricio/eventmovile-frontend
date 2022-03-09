<template>
    <div class="">
        <div class="card">
          <div class="card-body">
            <div class="minimal-tab">
              <ul class="nav nav-tabs" id="affanTab2" role="tablist">
                <li class="nav-item" role="presentation">
                  <button @click="changeTabs('info')" class="btn active" id="sass-tab" data-bs-toggle="tab" data-bs-target="#sass" type="button" role="tab" aria-controls="sass" aria-selected="true">
                  <!-- <button @click="changeTabs('info')" class="btn active" id="sass-tab" data-bs-toggle="tab" data-bs-target="#sass" type="button" role="tab" aria-controls="sass" aria-selected="true"> -->
                    INFORMACIÓN
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button @click="changeTabs('chat')" class="btn" id="npm-tab" data-bs-toggle="tab" data-bs-target="#npm" type="button" role="tab" aria-controls="npm" aria-selected="false">
                  <!-- <button @click="changeTabs('chat')" class="btn" id="npm-tab" data-bs-toggle="tab" data-bs-target="#npm" type="button" role="tab" aria-controls="npm" aria-selected="false"> -->
                    CHAT
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button @click="changeTabs('participant')" class="btn" id="gulp-tab" data-bs-toggle="tab" data-bs-target="#gulp" type="button" role="tab" aria-controls="gulp" aria-selected="false">
                  <!-- <button @click="changeTabs('participant')" class="btn" id="gulp-tab" data-bs-toggle="tab" data-bs-target="#gulp" type="button" role="tab" aria-controls="gulp" aria-selected="false"> -->
                    PARTICIPANTES
                  </button>
                </li>
              </ul>

              <div class="rounded-lg p-3" id="affanTab2Content">
              <!-- <div class="tab-content rounded-lg p-3" id="affanTab2Content"> -->
                <div class="tab-pane fade show active" id="sass" role="tabpanel" aria-labelledby="sass-tab">
                  <Info v-if="infoTab" :activity="activity"/>
                </div>
                <div class="tab-pane fade" id="npm" role="tabpanel" aria-labelledby="npm-tab">
                  <Chat v-if="chatTab"/>
                </div>
                <div class="tab-pane fade" id="gulp" role="tabpanel" aria-labelledby="gulp-tab">
                  <Participants v-if="participantsTab"/>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import {defineAsyncComponent} from "vue";

export default {
  name: "Tabs",
  props: {
    activity: {
      type: Object,
      default: function () {
        return {};
      },
    }
  },
  data() {
    return {
      infoTab: true,
      chatTab: false,
      participantsTab: false,
    }
  },
  components: {
    Info: defineAsyncComponent(() => import('@/modules/client/pages/eventLive/components/Info')),
    Chat: defineAsyncComponent(() => import('@/modules/client/pages/eventLive/components/Chat')),    
    Participants: defineAsyncComponent(() => import('@/modules/client/pages/eventLive/components/Participants')),    
  },
  methods: {
    changeTabs( tab ) {
      switch( tab ) {
        case 'info' :
          this.infoTab = true;
          this.chatTab = false;
          this.participantsTab = false;
          break;
        case 'chat' :
          this.infoTab = false;
          this.chatTab = true;
          this.participantsTab = false;
          break;
        case 'participant' :
          this.infoTab = false;
          this.chatTab = false;
          this.participantsTab = true;
          break;
      }
    }
  },
  mounted(){ }
}
</script>

<style scoped>
.card {
  border-radius: 0;
  border-top: 1px solid #8080804d;
}
.card-body {
  padding: 1.2rem 0 !important;
}
.minimal-tab .btn.active {
  border-bottom-color: #a033b4 !important;
  color: #6921b7 !important;
}
button.btn {
  padding: 0 20px 10px !important;
}
</style>