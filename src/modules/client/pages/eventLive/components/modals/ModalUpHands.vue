<template>
     <div :class="{'show': showModal}" class="modal fade">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ event.name }}</h5>
            <button @click="showModal = false" class="btn btn-close p-1 ms-auto" type="button"></button>
          </div>
          <div class="modal-body pb-5">
            
            <div class="col-md-12">
                <div class="row px-3">
                    <div v-for="question in listUpHands" :key="question.id" class="border rounded mt-3">
                        <div class="info-user my-2">
                            <span class="chat-autor" >{{ question.name }} {{ question.lastname }}</span>
                            <span class="chat-time">{{ getDateHour(question.created_at) }}</span>
                        </div>                       
                        <pre style="color:gray:font-size:12px;" class="">{{question.question}}</pre>
                        <b><span v-if="question.answer">{{ Respuesta }}</span></b>
                        <pre v-if="question.answer" style="color:gray;font-size:12px;" class="mt-2">{{question.answer}}</pre>
                    </div>
                </div>
            </div>   

            <hr> 

            <div class="row mt-4">
                <div class="content-question">
                    <div class="content-input">
                        <span>Pregúntale al speaker</span>                    
                        <textarea maxlength="250" style="'border: 0.7px solid" v-model="textUpHand" class="form-control chat-textarea" name="chat"></textarea>
                    </div>
                    <div class="content-btn">
                        <div class="secondary-content">
                            <div class="content-icon-msg ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-mic" viewBox="0 0 16 16">
                                    <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
                                    <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z"/>
                                </svg>
                            </div>
                            <div class="content-icon-msg">
                                <svg class="bi bi-cursor" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103zM2.25 8.184l3.897 1.67a.5.5 0 0 1 .262.263l1.67 3.897L12.743 3.52 2.25 8.184z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <!-- <div :style="'border:none;background-color:'+styles.section_btn_color+'; --color-hover:'+styles.section_btn_color_hover+'; --text-hover:'+styles.section_btn_text_color_hover" class="btn-voice" @click.prevent="voiceQuestion()" title="Preguntar por voz" v-if="voiceCall.stateVoice=='init' && activity.voice_participation_check === 1">
                      <span class="ti-microphone" ></span>
                    </div>
                    <div :style="'border:none;background-color:#057920; --color-hover:'+styles.section_btn_color_hover+'; --text-hover:'+styles.section_btn_text_color_hover" class="btn-voice" @click.prevent="voiceStateActive()" title="Preguntar por voz" v-if="voiceCall.stateVoice=='active'">
                      <span class="ti-microphone" ></span>
                    </div>
                    <div :style="enableButtonSendChatQuestion" class=" btn-send" @click.prevent="sendQuestion()">
                      <span class="ti-location-arrow" ></span>
                    </div> -->
                    
                    
                </div>
            </div>  
          </div>
        </div>
      </div>
    </div>

    <div @click="showModal = false" :class="{'show': showModal}" class="offcanvas-backdrop fade" style="display: none"></div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import { getSendRequest } from '@/utils/using-axios';
//import { getSendRequest, postSendRequest, putSendRequest } from '@/utils/using-axios';
import dayjs from 'dayjs';

export default defineComponent({
    name: 'ModalUpHands',
    setup() {
        const event = ref({})
        const user = ref({})
        let showModal = ref(false)
        let listUpHands = ref(null)
        let textUpHand = ref('')

        const getQuestionsForActivity = async () => {
            let activity = 336
            const responseHand = await getSendRequest(`questionsForActivity/${activity}/${user.value.id}`) 
            console.log('response: ', responseHand)
            if ( responseHand ) {
                let listQuestion = responseHand.data
                console.log('lista... ', listQuestion.reverse())
                listUpHands.value = listQuestion.reverse()
            }
        }

        const openModal = () => {
            showModal.value = true
            getQuestionsForActivity()
        }

        const getDateHour = ( date ) => {      
            return dayjs(date).format('HH:mm a')
        }

        onMounted(() => {
            event.value = JSON.parse( localStorage.getItem('event') ) || {} 
            user.value = JSON.parse( localStorage.getItem('user') ) || {}             
        });
        
        return {
            showModal,
            event,
            listUpHands,
            textUpHand,
            openModal,
            getDateHour,
        }
    },
})
</script>

<style scoped>
.show {
  display: block !important;
}
.info-user {
    display: flex;
    justify-content: space-between;
    font-size: 0.7rem;
}
span.chat-autor {
    color: #191619;
}
span.chat-time {
    color: gray;
}
.content-question {
    display: flex;
}
.content-input {
    width: 85%;
}
.content-btn {
    display: flex;
    align-items: center;
    margin-left: 10px;
}
textarea.form-control {
    min-height: 80px;
}
.content-icon-msg {
    width: 40px;
    height: 40px;
    background: #7b36a6;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: white;
    margin: 6px 0;
}
</style>
