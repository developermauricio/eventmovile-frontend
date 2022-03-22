<template>
     <div :class="{'show': showModal}" class="modal fade">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ event.name }}</h5>
            <button @click="closeModal" class="btn btn-close p-1 ms-auto" type="button"></button>
          </div>
          <div class="modal-body pb-5">
            
            <div class="col-md-12 content-msg">
                <div class="row">
                    <div v-for="question in listUpHands" :key="question.id" class="border rounded mt-3">
                        <div class="info-user my-2">
                            <span class="chat-autor" >{{ question.user.name }} {{ question.user.lastname }}</span>
                            <span class="chat-time">{{ getDateHour(question.created_at) }}</span>
                        </div>                       
                        <pre style="color:gray:font-size:12px;" class="">{{ question.question }}</pre>
                        <div v-if="question.answer" class="content-answer">
                            <hr>
                            <span class="title-answer">Respuesta</span>
                            <pre v-if="question.answer" class="mt-2">{{ question.answer }}</pre>
                        </div>                        
                    </div>
                </div>
            </div>   

            <hr> 

            <div class="row mt-4">
                <div class="content-question">
                    <div class="content-input">
                        <span>Pregúntale al speaker</span>                    
                        <textarea maxlength="250" style="'border: 0.7px solid" :class="v$.questionUser.$error ? 'is-invalid' : ''" v-model="textUpHand.questionUser" class="form-control chat-textarea" name="chat"></textarea>
                        <div v-if="v$.questionUser.$error" class="input-error">La pregunta es requerido.</div>
                    </div>
                    <div class="content-btn">
                        <div class="secondary-content">
                            <div class="content-icon-msg" @click="voiceQuestion" style="display: none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-mic" viewBox="0 0 16 16">
                                    <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
                                    <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z"/>
                                </svg>
                            </div>
                            <div class="content-icon-msg" @click="sendQuestion">
                                <svg class="bi bi-cursor" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103zM2.25 8.184l3.897 1.67a.5.5 0 0 1 .262.263l1.67 3.897L12.743 3.52 2.25 8.184z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
          </div>
        </div>
      </div>
    </div>

    <div @click="showModal = false" :class="{'show': showModal}" class="offcanvas-backdrop fade" style="display: none"></div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { getSendRequest, postSendRequest } from '@/utils/using-axios';
import { publishMQTT, subscriberMQTT } from "@/plugins/mqtt";
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useLoading } from 'vue-loading-overlay'
import dayjs from 'dayjs';

export default defineComponent({
    name: 'ModalUpHandsForEvent',
    setup() {
        const $loading = useLoading()
        const event = ref({})
        const user = ref({})
        let showModal = ref(false)
        let listUpHands = ref(null)

        let textUpHand = reactive({
          questionUser: ''  
        })
        const rules = {
            questionUser: { required }
        }
        const v$ = useVuelidate(rules, textUpHand)     

        /***  Consultar las preguntas disponibles de la actividad  ***/
        const getQuestionsForEvent = async () => {
            const responseHand = await getSendRequest(`get-question-event/${event.value.id}/${user.value.id}`) 
            
            if ( responseHand && responseHand.length ) {
                listUpHands.value = responseHand
            }
        }

        /***  Abrir la modal y consultar las preguntas  ***/
        const openModal = async () => {
            let loader = $loading.show({
                canCancel: false,
                color: '#ac58bc'
            });
            showModal.value = true
            await getQuestionsForEvent()  
            loader.hide()            
            scrollEndHand()          
        }

        const closeModal = () => {
            textUpHand.questionUser = ''
            v$.value.$reset()
            showModal.value = false
        }

        const getDateHour = ( date ) => {      
            return dayjs(date).format('HH:mm a')
        }

        // TODO: pendiente por implementar, pregntar por voz
        const voiceQuestion = () => {
            console.log('hacer pregunta por voz.')
        }

        /***  Enviar una pregunta  ***/
        const sendQuestion = async () => {
            let loader = $loading.show({
                canCancel: false,
                color: '#ac58bc'
            });
            await v$.value.$validate()

            if ( v$.value.$error ) {
                loader.hide()
                return
            }

            let params = {
                event_id: event.value.id,
                question: textUpHand.questionUser,
                user_id: user.value.id,
                type: 'text'
            }

            const responseQuestion = await postSendRequest('create-question-event', params)
            console.log('response: ', responseQuestion)

            if ( responseQuestion ) {

                let params_mqtt = {
                    event_id: event.value.id,
                    question: textUpHand.questionUser,
                    user_id: user.value.id,
                    user: user,
                    answer: null,
                    id: responseQuestion.id,
                    type: 'text'
                }

                const topic = 'eventmovil/'+event.value.id+'/question/event';
                await publishMQTT(topic, JSON.stringify(params_mqtt))
            }

            textUpHand.questionUser = ''
            v$.value.$reset()
            await getQuestionsForEvent()              
            scrollEndHand()            
            loader.hide()
        }

        const scrollEndHand = () => {            
            setTimeout(() => {                
                const scrollElement = document.querySelector('.content-msg')
                if ( scrollElement ) scrollElement.scrollTop = scrollElement.scrollHeight
            }, 500);
        }

        const mqttGetAnswerHand = () => {
            let key = 'question_hand'
            const topic = 'eventmovil/'+event.value.id+'/question/event'
            subscriberMQTT(key, topic, getAnswerHand)
        }

        const getAnswerHand = async ( message ) => {
            const questionAnswer = JSON.parse(message.toString())
            
            if ( questionAnswer.user_id == user.value.id ) {
                if ( questionAnswer.answer && questionAnswer.answer != null ) {
                    await getQuestionsForEvent()
                    scrollEndHand()    
                }
            }
        }

        onMounted(() => {
            event.value = JSON.parse( localStorage.getItem('event') ) || {} 
            user.value = JSON.parse( localStorage.getItem('user') ) || {}  
            mqttGetAnswerHand()
        });
        
        return {
            showModal,
            event,
            listUpHands,
            textUpHand,
            v$,
            openModal,
            getDateHour,
            voiceQuestion,
            sendQuestion,
            closeModal,
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
.content-msg {
    max-height: 350px;
    overflow-y: auto;
    padding: 0 1.5rem;
}
span.title-answer {
    font-size: 13px;
    font-weight: 600;
    color: #6d439a;
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
.border {
    border-color: #7e4aa69c !important;
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
span.required-data {
  color: #9f1b1b;
}
.input-error {
  color: #e84438;
  font-size: 14px;
  margin-top: 5px;
}
</style>
