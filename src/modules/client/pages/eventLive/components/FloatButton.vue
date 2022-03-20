<template>  
  <div class="content-btn-actions">
    <div v-if="showActions" class="actions-container">
      <ul class="fab-list">          
        <li @click="openModal('hand')" class="pointer">
          <div class="shadow">
            <img src="/assets/img/icons/open-hands-white.png" width="22" height="22" alt="hand"> 
          </div>
        </li>
        <li @click="openModal('resources')" class="pointer">
          <div class="shadow">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-paperclip" viewBox="0 0 16 16">
              <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z"/>
            </svg>
          </div>
        </li>
        <li @click="openModal('question')" class="pointer">
          <div class="shadow">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
            </svg>
          </div>
        </li>
      </ul>
    </div> 

    <div class="btn-float-file">
      <div @click="openOptions" class="shadow btn-action">
        <svg v-if="btnClose" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </div>
    </div>
  </div>

  <ModalUpHands ref="modalhands" />
  <ModalFile ref="modalResources"/>
  <ModalSondeo ref="modalQuestion"/>
</template>

<script>
import { defineComponent, defineAsyncComponent, ref } from 'vue'

export default defineComponent({
  name: "FloatButton",
  components: {
    ModalUpHands: defineAsyncComponent(() => import('@/modules/client/pages/eventLive/components/modals/ModalUpHands')),  
    ModalFile: defineAsyncComponent(() => import('@/modules/client/pages/eventLive/components/modals/ModalFile')),  
    ModalSondeo: defineAsyncComponent(() => import('@/modules/client/pages/eventLive/components/modals/ModalSondeo')),  
  },
  setup() {
    let btnClose = ref(true)
    let showActions = ref(false)
    const modalhands = ref(null)
    const modalResources = ref(null)
    const modalQuestion = ref(null)
    
    const openOptions = () => {
      btnClose.value = !btnClose.value
      showActions.value = !showActions.value
    }

    const openModal = ( option ) => {
      switch ( option ) {
        case 'hand':
          modalhands.value.openModal()
          break;
        case 'resources':
          modalResources.value.openModal()
          break;
        case 'question':
          modalQuestion.value.openModal()
          break;        
      }
      openOptions()
    }

    return {
      btnClose,
      showActions,
      modalhands,
      modalResources,
      modalQuestion,
      openOptions,
      openModal,
    }
  },
})
</script>

<style scoped>
.content-btn-actions {
  position: fixed;
  bottom: 2rem;
  right: 15px;
  z-index: 1000;
}
.actions-container {
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
}
ul.fab-list {
  padding-left: 0;
}
.btn-float-file {
  display: flex;
  justify-content: end;
}
.btn-action {
  position: relative;
  width: 3rem;
  height: 3rem;
  background: #7047bc;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
li.pointer div {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: #7047bc;
  color: white;
  margin: 5px 0;
}
</style>