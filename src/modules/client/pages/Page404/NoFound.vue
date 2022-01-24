<template>
    <div class="content-error404">
        <div>
            <h1>Recurso no disponible</h1>
            <!-- <span>{{ title }}</span> -->

            <div class="style-btn">
                <router-link to="/" class="btn btn-primary">
                    <svg class="bi bi-arrow-left-short" width="32" height="32" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"></path>
                    </svg>
                    <span>Ir al inicio</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: "Map",
  /* data() {
    return {
        urlBaseFile: process.env.VUE_APP_API_URL_FILES,
    }
  }, */
  /* methods: {
  }, */
  setup() {
      const store = useStore();
      console.log('content store: ', store.state.title) // en la vista $store.state.title

      return {
          ...store.state, //para usar el store
      }
  },
  created() {
      //TODO: manejo de rutas desde el script
    const route = useRoute();
    console.log('datos de route: ', route);
    const router = useRouter(); // router.back() ir a la pagina de anterior
    console.log('datos de router: ', router); // router.push('/')  --para ir al home
  }
}
</script>

<style scoped>
.content-error404 {
    display: flex;
    width: 100%;
    height: 100vh;
    align-items: center;
    justify-content: center;
}
.style-btn {
    text-align: center;
    margin-top: 5rem;
}
</style>