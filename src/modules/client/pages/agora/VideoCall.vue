<template>
    <!-- Video Call Screen-->
    <div class="video-call-screen">        
        <!-- Back Button-->
        <div class="call-back-button btn-go-back">
            <a @click.prevent="back">
                <svg class="bi bi-arrow-left-short" width="32" height="32" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"></path>
                </svg>
            </a>
        </div>

        <!-- Content video call -->
        <div class="mainContent"> 
            <div class="container">
                <div class="agora-view">
                    <div :class="{'agora-video-local': videoLocal}" class="agora-video">
                        <StreamPlayer :stream="localStream" :domId="localStream.getId()" v-if="localStream" />                        
                    </div>
                    <div class="agora-video" v-for="(remoteStream, index) in remoteStreams" :key="index">
                        <StreamPlayer :stream="remoteStream" :domId="remoteStream.getId()"/>
                    </div>
                </div>
            </div>
        </div>

        <!-- Button Group-->
        <div class="call-btn-group">
            <!-- Camara -->
            <a @click="handleCamera" class="btn btn-dark btn-circle color-icon">
              <i v-if="cameraOn" class="bi bi-camera-video"></i>
              <i v-else class="bi bi-camera-video-off"></i>
            </a>

            <!-- Hacer videollamada -->
            <a v-if="disableJoin" @click='leaveEvent' class="btn btn-lg btn-danger p-4 btn-call-leave" href="#">
                <!-- <i class="bi bi-telephone"></i> -->                
                <i class="bi bi-telephone-x"></i>
            </a>
            <a v-else @click="joinEvent" class="btn btn-lg btn-success p-4 btn-call-success" href="#">
                <i class="bi bi-telephone-forward"></i>
            </a>   

            <!-- Microfono -->
            <a @click="handleMic" class="btn btn-dark btn-circle color-icon">
                <i v-if="audioOn" class="bi bi-mic"></i>
                <i v-else class="bi bi-mic-mute"></i>
            </a>        
        </div>
    </div>
</template>

<script>
import RTCClient from "@/plugins/agora-rtc-client.js";
import { defineAsyncComponent } from "vue";

export default {
    name: 'VideoCall',
    components: {  
        StreamPlayer: defineAsyncComponent(() => import('@/modules/client/pages/agora/components/StreamPlayer'))
    },
    props: {
        user: {
            type: String,
            required: false,
            default: ''
        }
    },
    data() {
        return {
            option: {
                appid: 'c95b93d3616a4beaa910a3bcc70c8796',
                token: '006c95b93d3616a4beaa910a3bcc70c8796IACqFoDC8IRkDenB5vmRloi4kagnoqGjtG8p8sGHY3cdZkMecUYAAAAAEADL5xHfOTQFYgEAAQA5NAVi',
                uid: null,
                channel: 'prueba',
            },
            disableJoin: false,
            audioOn: true,
            cameraOn: true,
            localStream: null,
            remoteStreams: [],
        }
    },
    methods: {
        joinEvent() {
            this.rtc.joinChannel(this.option)
                .then(() => {
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
        },
        leaveEvent() {
            this.disableJoin = false

            this.rtc.leaveChannel()
                .then(() => {
                    console.log('Leave Success')
                }).catch((err) => {
                    console.log('leave error', err)
                })
            this.localStream = null
            this.remoteStreams = []
        },
        handleCamera() {
            if ( !this.localStream ) return

            this.cameraOn = !this.cameraOn
            this.localStream.isVideoOn() ? this.localStream.disableVideo() : this.localStream.enableVideo();
        },
        handleMic() {
            if ( !this.localStream ) return

            this.audioOn = !this.audioOn
            this.localStream.isAudioOn() ? this.localStream.disableAudio() : this.localStream.enableAudio();
        },
        back() {
            if ( this.disableJoin ) this.leaveEvent()
            
            this.disableJoin = false
            this.$router.go(-1);
        },
    },
    computed: {
        videoLocal() {
            return this.remoteStreams.length === 0 ? false : true; 
        },
        firstLetterNameUser() {
            return (this.userName || "").slice(0, 1);
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
        //this.userName = this.$route.params.user || ''
        console.log('user name: ', this.user)
    }
}
</script>

<style scoped>
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
    height: 70vh;
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
</style>