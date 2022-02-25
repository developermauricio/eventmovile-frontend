<template>
  <!-- Video Call Screen-->
  <div class="video-call-screen">
    <!--        &lt;!&ndash; Back Button&ndash;&gt;-->
    <!--        <div class="call-back-button btn-go-back">-->
    <!--            <a @click.prevent="back">-->
    <!--                <svg class="bi bi-arrow-left-short" width="32" height="32" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">-->
    <!--                    <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"></path>-->
    <!--                </svg>-->
    <!--            </a>-->
    <!--        </div>-->

    <!-- Content video call -->
    <div class="mainContent">
      <div class="container">
        <div v-if="localStream" class="agora-view">
          <div :class="{'agora-video-local': videoLocal}" class="agora-video">
            <StreamPlayer :stream="localStream" :domId="localStream.getId()"/>
          </div>
          <div class="agora-video" v-for="(remoteStream, index) in remoteStreams" :key="index">
            <StreamPlayer :stream="remoteStream" :domId="remoteStream.getId()"/>
          </div>
        </div>
        <div v-else class="content-user">
          <AvatarUser :firstLetter="firstLetterCurrentUser"/>
        </div>
      </div>
    </div>

    <!-- Button Group-->
    <div class="call-btn-group">
      <!-- Camara -->
      <a @click="handleCamera" :class="{'color-icon' :  cameraOn}" class="btn btn-dark btn-circle">
        <i v-if="cameraOn" class="bi bi-camera-video"></i>
        <i v-else class="bi bi-camera-video-off"></i>
      </a>

      <!-- Hacer videollamada -->
      <a v-if="disableJoin" @click='leaveEvent' id="btn-close-video-call"
         class="btn btn-lg btn-danger p-4 btn-call-leave" href="#">
        <i class="bi bi-telephone-x"></i>
      </a>
      <a v-else @click="joinEvent" class="btn btn-lg btn-success p-4 btn-call-success" href="#">
        <i class="bi bi-telephone-forward"></i>
      </a>

      <!-- Microfono -->
      <a @click="handleMic" :class="{'color-icon' :  audioOn}" class="btn btn-dark btn-circle">
        <i v-if="audioOn" class="bi bi-mic"></i>
        <i v-else class="bi bi-mic-mute"></i>
      </a>
    </div>
  </div>
</template>

<script>
import RTCClient from "@/plugins/agora-rtc-client.js";
import {defineAsyncComponent} from "vue";
import {subscriberMQTT} from "@/plugins/mqtt";

export default {
  name: 'VideoCall',
  components: {
    StreamPlayer: defineAsyncComponent(() => import('@/modules/client/pages/agora/components/StreamPlayer')),
    AvatarUser: defineAsyncComponent(() => import('@/modules/client/pages/agora/components/AvatarUser'))
  },
  props: {
    tokenAgora: null,
    channelAgora: null,
    guest: null,
    user: {
      type: String,
      required: false,
      default: 'lalala'
    }
  },
  data() {
    return {
      option: {
        audio: false,
        appid: process.env.VUE_APP_AGORA_APPID,
        token: null,
        uid: null,
        channel: null
      },

      // audio: false,
      // appid: process.env.VUE_APP_AGORA_APPID,
      // token: null,
      // uid: null,
      // channel: process.env.VUE_APP_AGORA_CHANNEL,

      disableJoin: false,
      joinUser: false,
      audioOn: true,
      cameraOn: true,
      localStream: null,
      remoteStreams: [],
      currentUser: {},
    }
  },
  methods: {

    joinEvent() {
      setTimeout(() =>{
        this.option.token = this.tokenAgora
        this.option.channel = this.channelAgora
        console.log('TOKEN DESDE EL VIDEO', this.option.token)
        console.log('CANAL DESDE EL VIDEO', this.option.channel)
      }, 1000)

      setTimeout(() => {
        this.rtc.joinChannel(this.option)
            .then(() => {
              window.axios.post('/on-call/'+this.currentUser.id).then(response =>{
                console.log(response)
              }).catch(err =>{
                console.log(err)
              })
              this.rtc.publishStream()
                  .then((stream) => {
                    //console.log('Publish Success', stream)
                    this.localStream = stream
                  }).catch((err) => {
                console.log('publish local error', err)
              })
            }).catch((err) => {
          console.log('join channel error', err)
        });
        this.disableJoin = true
      }, 1000)

    },
    requestCancelVideoCall() {
      let key = 'eiownd2032234'
      let topic = 'nw_acept_request_cancel_video_call'
      let user_connect = JSON.parse(localStorage.getItem('user'))
      subscriberMQTT(key, topic, (user_id) => {
        if (user_connect.id == user_id) {
          document.getElementById('btn-close-video-call').click()
          this.$emit('cancelVideoCall', user_id)
        }
      })

    },
    leaveEvent() {
      document.getElementById('float-button-call').style.display = 'none'
      this.disableJoin = false
      this.$emit('endVideoCall')
      this.rtc.leaveChannel()
          .then(() => {
            console.log('Leave Success')
          }).catch((err) => {
        console.log('leave error', err)
      })
      this.localStream = null
      this.remoteStreams = []
      if (!this.cameraOn) this.cameraOn = true
      if (!this.audioOn) this.audioOn = true
    },
    handleCamera() {
      if (!this.localStream) return

      this.cameraOn = !this.cameraOn
      this.localStream.isVideoOn() ? this.localStream.disableVideo() : this.localStream.enableVideo();
    },
    handleMic() {
      if (!this.localStream) return

      this.audioOn = !this.audioOn
      this.localStream.isAudioOn() ? this.localStream.disableAudio() : this.localStream.enableAudio();
    },
    back() {
      if (this.disableJoin) this.leaveEvent()

      this.disableJoin = false
      this.$router.go(-1);
    },
    userJoinVideoCall(data) {
      this.joinUser = data
      if (this.joinUser === true) {
        this.joinEvent()
      }
    }
  },
  computed: {
    videoLocal() {
      return this.remoteStreams.length === 0 ? false : true;
    },
    firstLetterUser() {
      return (this.user || "").slice(0, 1);
    },
    firstLetterCurrentUser() {
      return (this.guest || '').slice(0, 1);
    },
  },
  created() {

    this.rtc = new RTCClient();
    let rtc = this.rtc

    rtc.on('stream-added', (evt) => {
      let {stream} = evt
      console.log.bind('stream.getId: ', stream.getId())
      rtc.client.subscribe(stream)
    })

    rtc.on('stream-subscribed', (evt) => {
      this.$emit('aceptRequestVideoCall')
      document.getElementById('float-button-call').style.display = 'block'
      let {stream} = evt
      console.log.bind('stream.getId:. ', stream.getId())
      if (!this.remoteStreams.find((it) => it.getId() === stream.getId())) {
        this.remoteStreams.push(stream)
      }
    })

    rtc.on('stream-removed', (evt) => {
      let {stream} = evt
      console.log.bind('stream.getId:.. ', stream.getId())
      this.remoteStreams = this.remoteStreams.filter((it) => it.getId() !== stream.getId())
      document.getElementById('btn-close-video-call').click()
      document.getElementById('float-button-call').style.display = 'none'
      setTimeout(() => {
        this.$emit('userDesconnected')
      }, 200)
    })

    rtc.on('peer-online', (evt) => {
      console.log.bind(`Peer ${evt.uid} is online`)
    })

    rtc.on('peer-leave', (evt) => {
      console.log.bind(`Peer ${evt.uid} is online`)
      this.remoteStreams = this.remoteStreams.filter((it) => it.getId() !== evt.uid)
    })
  },
  mounted() {

    // this.joinEvent()
    this.userJoinVideoCall()
    this.requestCancelVideoCall()
    this.currentUser = JSON.parse(localStorage.getItem('user')) || {}
  }
}
</script>

<style scoped>
.container {
  padding: 0 !important;
}

.mainContent {
  top: 0 !important;
  height: 100% !important;
}

.btn-go-back {
  top: 0;
  width: 100%;
  height: 3rem;
  padding: 9px 2rem;
  left: 0;
  border-radius: 0;
}

.mainContent {
  position: absolute;
  display: flex;
  align-items: center;
  width: 100%;
  top: 5rem;
}

.content-user {
  width: 100%;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

p.user-name {
  display: flex;
  position: absolute;
  bottom: 8px;
  margin-left: 10px;
  margin-bottom: 0;
  background-color: #ffffffed;
  border-radius: 3px;
  padding: 0 5px;
}

.btn-call-success {
  padding: 14px 10px 0 10px !important;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  box-shadow: 0 0 0 0.5rem rgb(116 205 78 / 50%);
}

.btn-call-leave {
  padding: 14px 10px 0 10px !important;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  box-shadow: 0 0 0 0.5rem rgb(225 83 97 / 50%);
}

.agora-view {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.agora-video {
  width: 100%;
  height: 100vh;
  background-image: url('/assets/img/icons/icon-videocall.png');
  background-size: 30%;
  background-repeat: no-repeat;
  background-position: center;
}

.agora-video-local {
  width: 20vh;
  height: 20vh;
  z-index: 5;
  border: 1px solid white;
  margin-bottom: -20vh;
  padding: 3px;
  border-radius: 5px;
}

.color-icon {
  background-color: #ac58bc;
}

.video-call-screen {
  height: 100% !important;
  width: 100% !important;
}

</style>