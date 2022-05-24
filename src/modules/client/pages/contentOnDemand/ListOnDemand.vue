<template>
    <div class="container">
        <!-- Header Area -->
        <div class="header-area header-home">
            <div class="container">
                <div class="header-content header-style-five position-relative d-flex align-items-center justify-content-between">
                    <div @click="$router.go(-1)">
                        <div class="back-button">
                            <svg class="bi bi-arrow-left-short icon-back" width="32" height="32" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" data-v-76333a24="">
                                <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" data-v-76333a24=""></path>
                            </svg>
                        </div>
                    </div>

                    <div class="page-heading text-center">
                        <h6 class="mb-0 position-relative text-center fw-bold">Contenido On Demand</h6>
                    </div>   
                </div>
            </div>
        </div>

        <div class="spacing-header"></div>

        <div v-if="currentItem" class="container mt-4">
            <div class="content-iframe" v-html="currentItem.iframe_video"></div>
            <h4 class="mt-3">{{ currentItem.title_video }}</h4>
            <p>{{ currentItem.description_video }}</p>
        </div>

        <div class="container mt-5">
            <div v-if="listOnDemand.length">
                <template v-for="(item, index) in listOnDemand" :key="item.id">
                    <a @click="viewItemOnDemand(item)" :class="{'active': itemActive(item)}" class="affan-element-item">
                        {{ index + 1 }} - {{ item.title_video }}
                        <i class="bi bi-play-circle color-icon" style="font-size: 20px;"></i>
                    </a>
                </template>
            </div>
            
            <div v-else>No hay recursos descargables para este evento.</div>
        </div>


    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useLoading } from 'vue-loading-overlay'
import { getSendRequest } from '@/utils/using-axios';

export default defineComponent({
    name: "ListOnDemand",
    setup() {
        const $loading = useLoading()
        let event = ref({})
        let currentItem = ref({})
        const listOnDemand = ref([]);


        const getListOnDemand = async () => {
            let loader = $loading.show({
                canCancel: false,
                color: '#ac58bc'
            });

            if ( !event.value.id ) event.value = JSON.parse( localStorage.getItem('event') ) || {}

            const responseOnDemand = await getSendRequest(`on-demand/${ event.value.id }`)

            if ( responseOnDemand ) {
                listOnDemand.value = responseOnDemand
                currentItem.value = listOnDemand.value[0];  
            }

            loader.hide()
        }

        const viewItemOnDemand = (item) => {
            currentItem.value = item;
        }

        const itemActive = (item) => {
            if ( listOnDemand.value.length > 1 && currentItem.value ) {
                if (currentItem.value.id === item.id) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        } 
        

        getListOnDemand()     

        return {
            listOnDemand,
            currentItem,
            viewItemOnDemand,
            itemActive,
        }
    },
})
</script>

<style scoped>
.spacing-header {
    height: 50px;
}
.content-iframe {
    width: 100%;
    height: 50vh;
}
.color-icon {
    color: #691b9d;
}
.active {
    background-color: #a133b442;
}

@media (max-width: 767.98px) { 
    .content-iframe {
        height: 25vh;
    }
}
</style>