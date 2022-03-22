<!--<template>-->
<!--  <div class="add-new-contact-wrap">-->
<!--    <router-link class="shadow" to="/qr">-->
<!--      <i class="bi bi-qr-code"></i>-->
<!--      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-qr-code icon-qr mt-3" viewBox="0 0 16 16">-->
<!--        <path d="M2 2h2v2H2V2Z"/>-->
<!--        <path d="M6 0v6H0V0h6ZM5 1H1v4h4V1ZM4 12H2v2h2v-2Z"/>-->
<!--        <path d="M6 10v6H0v-6h6Zm-5 1v4h4v-4H1Zm11-9h2v2h-2V2Z"/>-->
<!--        <path d="M10 0v6h6V0h-6Zm5 1v4h-4V1h4ZM8 1V0h1v2H8v2H7V1h1Zm0 5V4h1v2H8ZM6 8V7h1V6h1v2h1V7h5v1h-4v1H7V8H6Zm0 0v1H2V8H1v1H0V7h3v1h3Zm10 1h-1V7h1v2Zm-1 0h-1v2h2v-1h-1V9Zm-4 0h2v1h-1v1h-1V9Zm2 3v-1h-1v1h-1v1H9v1h3v-2h1Zm0 0h3v1h-2v1h-1v-2Zm-4-1v1h1v-2H7v1h2Z"/>-->
<!--        <path d="M7 12h1v3h4v1H7v-4Zm9 2v2h-3v-1h2v-1h1Z"/>-->
<!--      </svg>-->
<!--    </router-link>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: "ButtonFloat"-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.icon-qr{-->
<!--  color: #ffffff !important;-->
<!--}-->
<!--.add-new-contact-wrap a{-->
<!--  background-color: #7047bc !important;-->
<!--}-->
<!--</style>-->

<template>
  <float-menu
      :fixed="false"
      :position="'bottom right'"
      :dimension="60"
      :menu-data="itemsMenu"
      :on-selected="handleSelection"
      :theme="{
      primary: '#7047bc',
      textColor: '#000',
      menuBgColor: 'rgba(112,71,188,0.65)',
      textSelectedColor: 'rgba(112,71,188,0.65)',
    }"
  >
    <span class="text-white" style="font-size: 2rem">+</span>
  </float-menu>

  <div class="chat-user--info d-flex align-items-center " id="openModalChatGlobal" style="visibility: hidden">
    <div class="setting-wrapper me-4 openModalChatGlobal" data-bs-toggle="offcanvas" data-bs-target="#modalChatGlobal"
         aria-controls="modalChatGlobal">
      <div class="setting-trigger-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search"
             viewBox="0 0 16 16">
          <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
      </div>
    </div>
  </div>
  <Chat />

  <ModalUpHandsForEvent ref="modalQuestionEvent" />
</template>

<script>
import {FloatMenu} from "vue-float-menu";
import "vue-float-menu/dist/vue-float-menu.css";
import router from "../../../../../router";
import {defineAsyncComponent, ref} from "vue";
export default {
  name: "ButtonFloat",
  components: {
    FloatMenu,
    Chat: defineAsyncComponent(() => import(/* webpackChunkName: "Navbar"*/ '@/modules/client/shared/components/chat/Chat')),
    ModalUpHandsForEvent: defineAsyncComponent(() => import('@/modules/client/pages/home/components/modals/ModalUpHandsForEvent')),
  },
  setup() {
    const modalQuestionEvent = ref(null)

    const itemsMenu = ref([
      {name: "Mi Qr"},
      {name: "Chat"},
      {name: "Preguntar"},
    ])
    const handleSelection = (selectedItem) => {      
      switch (selectedItem){
        case "Mi Qr":
          router.push('/qr')
          break
        case "Chat":
          document.querySelectorAll('.openModalChatGlobal').forEach(element => element.click());
          break
        case "Preguntar":
          console.log('preguntar...')
          modalQuestionEvent.value.openModal()
          break
      }
    };

    return {
      itemsMenu,
      handleSelection,
      modalQuestionEvent
    };
  },
  // data() {
  //   return {
  //     items: [
  //       {name: "Mi Qr"},
  //       {name: "Chat"},
  //       {name: "Preguntar"},
  //       // {
  //       //   name: "Edit",
  //       //   subMenu: {
  //       //     name: "edit-items",
  //       //     items: [{name: "Copy"}, {name: "Paste"}],
  //       //   },
  //       // },
  //       // {
  //       //   name: "Open Recent"
  //       // },
  //       // {
  //       //   name: "Save",
  //       // }
  //     ],
  //   };
  // },
}
</script>

<style scoped>
.icon-qr {
  color: #ffffff !important;
}
.add-new-contact-wrap a {
  background-color: #7047bc !important;
}

</style>

