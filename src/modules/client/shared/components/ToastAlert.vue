<template>
<h1 style="display: none">toast</h1>
</template>

<script>
// import {ref} from "vue";
import { useToast } from "vue-toastification";
export default {
  name: "ToastAlert",
  setup(){
    // Get toast interface
    const toast = useToast();

    const toastAlertSuccess = (message) =>{
      // or with options
      toast.success(message, {
        timeout: 5500,
        icon: 'bi bi-check-lg'
      });
    }

    const toastAlertError = (message) =>{
      // or with options
      toast.error(message, {
        timeout: 2000,
        icon: 'bi bi-exclamation-triangle'
      });
    }

    return { toast, toastAlertSuccess, toastAlertError }
  }
}
</script>

<style scoped>

</style>