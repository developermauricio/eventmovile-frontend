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
  },
  setup() {
    const itemsMenu = ref([
      {name: "Mi Qr"},
      {name: "Chat"},
      {name: "Preguntar"},
    ])
    const handleSelection = (selectedItem) => {
      console.log(selectedItem)
      switch (selectedItem){
        case "Mi Qr":
          router.push('/qr')
              break
        case "Chat":
          document.querySelectorAll('.openModalChatGlobal').forEach(element => element.click());
      }
    };
    return {
      itemsMenu,
      handleSelection,
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

