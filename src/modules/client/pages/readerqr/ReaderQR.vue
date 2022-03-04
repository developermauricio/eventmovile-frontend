<template>
    <div class="container">
        <!-- Header Content -->
        <div class="header-content position-relative d-flex align-items-center justify-content-between">
            <!-- Back Button -->
            <div class="back-button">
                <router-link to="/">
                    <svg class="bi bi-arrow-left-short icon-back" width="32" height="32" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"></path>
                    </svg>
                </router-link>
            </div>
            <!-- Page Title -->
            <div class="page-heading">
                <h6 class="mb-0 position-relative text-center fw-bold style-color-title">Código QR</h6>
            </div>
            <div class="setting-wrapper"></div>
        </div>

        <div class="mt-4">
            Leer QR: 
            <select v-model="showMovil">
                <option v-for="option in optionsReader" :key="option.id" :value="option.value">
                    {{ option.text }}
                </option>
            </select>
        </div>
        
        <div v-if="showContent">
            <div v-if="showMovil" class="mt-4">
                <qrcode-capture @decode="clickDecode" :capture="selectedOption" />
            </div> 

            <div v-else class="content-reader-qr mt-5">
                <div class="reader-qr">
                    <qrcode-stream :camera="camera" @decode="onDecode" :track="drawOutline" @init="onInit">
                        <div class="loading-indicator" v-if="loading">
                            Loading...
                        </div>

                        <button v-if="isMovil" @click="switchCamera" class="button-camera">
                            <img src="/assets/img/icons/camera-switch.svg" alt="switch camera">
                        </button>

                        <div v-show="showScanConfirmation" class="scan-confirmation">
                            <img src="/assets/img/icons/checkmark.svg" alt="confim" width="128" />
                        </div>
                    </qrcode-stream> 
                </div>       
            </div>       
        </div>       
    </div>       
</template>

<script>
import { QrcodeStream, QrcodeCapture } from 'vue3-qrcode-reader'
import { postSendRequest } from '@/utils/using-axios';

export default {
    name: 'ReaderQR',
    components: {
        QrcodeStream,
        QrcodeCapture
    },
    data() {
        return {
            result: '',
            error: '',
            camera: '',
            showScanConfirmation: false,
            loading: false,
            isMovil: false,
            selectedOption: false,
            showMovil: null,
            optionsReader: [
                {id: 1, text: 'Subir una Imagen', value: true},
                {id: 2, text: 'Capturar desde la camara', value: false},
            ],
        }
    },
    computed: {
        showContent() {
            return this.showMovil != null ? true : false
        }
    },
    methods: {
        async goToHome( user ) {
            this.loader = this.$loading.show({
                container: this.fullPage ? null : this.$refs.containerLoarder,
                canCancel: false,
            });

            const dataLogin = {
                email: user.email,
                password: user.password,
                eventId: user.eventId,
            };
            //TODO: validar que los datos de user sean correctos 

            const loginUser =  await postSendRequest('auth/basic', dataLogin)
           
            if ( loginUser ) {
                localStorage.setItem("user", JSON.stringify(loginUser));
                localStorage.setItem("_current_token", loginUser.token);
                window.axios.defaults.headers.common["Authorization"] = `Bearer ${loginUser.token}`;
                this.$router.push({path: "/"});
            }

            this.loader.hide()
        },
        clickDecode( result ) { 
            console.log('result.. ', result)
            this.result = result

            if ( this.result.includes('{') && this.result.includes('}') ) {
                let dataUser = JSON.parse(this.result)
                this.goToHome(dataUser)
            } else {
                alert('El código QR no es valido.')
            }            
        },
        onDecode( decodeString ) {
            console.log('decode: ', decodeString)
            this.result = decodeString

            this.camera = 'off'

            if ( this.result.includes('{') && this.result.includes('}') ) {
                let dataUser = JSON.parse(this.result)
                this.goToHome(dataUser)
            } else {
                alert('El código QR no es valido.')
            }  

            setTimeout(() => {
                this.camera = 'auto'
            }, 2000);
        },
        switchCamera() {
            switch ( this.camera ) {
                case 'front':
                    this.camera = 'rear'
                    break;
                case 'rear':
                    this.camera = 'front'
                    break;            
                default:
                    this.camera = 'auto'
                    break;
            }
        },
        drawOutline( detectedCodes, ctx ) {
            let points = []

            for (let key in detectedCodes) {
                switch (key) {
                    case 'topLeftCorner':
                        points[0] = detectedCodes[key]
                        break;
                    case 'topRightCorner':
                        points[1] = detectedCodes[key]
                        break;
                    case 'bottomRightCorner':
                        points[2] = detectedCodes[key]
                        break;
                    case 'bottomLeftCorner':
                        points[3] = detectedCodes[key]
                        break;
                
                    default:
                        break;
                }
            }

            ctx.lineWidth = 3;
            ctx.strokeStyle = "red";

            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);

            for (const { x, y } of points) {
                ctx.lineTo(x, y);
            }

            ctx.lineTo(points[0].x, points[0].y);
            ctx.closePath();
            ctx.stroke();
        },        
        async onInit( promise ) {
            this.loading = true

            try {
                await promise
            } catch( error ) {
                if (error.name === 'NotAllowedError') {
                    this.error = "ERROR: you need to grant camera access permission"
                } else if (error.name === 'NotFoundError') {
                    this.error = "ERROR: no camera on this device"
                } else if (error.name === 'NotSupportedError') {
                    this.error = "ERROR: secure context required (HTTPS, localhost)"
                } else if (error.name === 'NotReadableError') {
                    this.error = "ERROR: is the camera already in use?"
                } else if (error.name === 'OverconstrainedError') {
                    this.error = "ERROR: installed cameras are not suitable"
                } else if (error.name === 'StreamApiNotSupportedError') {
                    this.error = "ERROR: Stream API is not supported in this browser"
                } else if (error.name === 'InsecureContextError') {
                    this.error = 'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.';
                } else {
                    this.error = `ERROR: Camera error (${error.name})`;
                }
                console.log('error generado: ', this.error)
            } finally {
                this.showScanConfirmation = this.camera === 'off'
                this.loading = false
            }            
        }
    },
    created() {
        const typeNavegator = navigator.userAgent
        console.log('user agente: ', typeNavegator)
        const moviles = ["Mobile","iPhone","iPod","BlackBerry","Opera Mini","Sony","MOT","Nokia","samsung"];

        moviles.forEach( element => {
            if ( typeNavegator === element ) {
                this.isMovil = true
            }
        });
        
        this.isMovil ? 'rear' : 'auto'
    }
}
</script>

<style scoped>
.content-reader-qr {
    width: 100%;
    display: flex;
    justify-content: center;
}
.reader-qr {
    width: 300px;
}
.error {
  font-weight: bold;
  color: red;
}
.scan-confirmation {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, .8);
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}
.button-camera {
  position: absolute;
  left: 10px;
  top: 10px;
}
</style>