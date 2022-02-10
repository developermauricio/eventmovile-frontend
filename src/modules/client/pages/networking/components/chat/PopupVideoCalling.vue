<template>
    <div :class="{'screen-active': showModal}" class="video-calling-popup-wrap">
        <div class="video-calling-popup-body bg-overlay" style="background-image: url('img/bg-img/2.jpg')">
        <!-- User Thumbnail -->
        <div class="user-thumbnail mb-3">
            <img src="/assets/img/avatars/photo-user.png" alt="Photo user" />
        </div>
        <!-- Video Icon -->
        <div class="video-icon d-block mb-1">
            <svg class="bi bi-camera-video text-white" xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175l3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z" ></path>
            </svg>
        </div>
        <h6 class="mb-5 text-white">Hacer una videollamada...</h6>
        <!-- Button Group -->
        <div class="button-group">
            <a @click="closePopup" class="btn btn-lg btn-danger btn-round me-3" href="#" >Cerrar</a>
            <router-link :to="{name: 'VideoCall', params: {user: userName}}" class="btn btn-lg btn-success btn-round ms-3" href="#" >Aceptar</router-link>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PopupVideoCalling",
    data() {
        return {
            showModal: false,
            userName: '',
        }
    },
    methods: {
        openPopupVideoCall( userName ) {            
            this.userName = userName
            this.showModal = !this.showModal
        },
        closePopup() {
            this.showModal = false
        },
    }
};
</script>

<style scoped>

</style>
