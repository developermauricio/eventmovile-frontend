<template>
    <div :class="{'show': showModal}" class="modal fade">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ event.name }}</h5>
            <button @click="closeModalQR" class="btn btn-close p-1 ms-auto" type="button"></button>
          </div>
          <div class="modal-body mb-4">
            <div class="mt-2 content-text-qr">
                <div class="text-qr">Leer QR: </div> 
                <select v-model="showMovil" class="form-select form-control-clicked">
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
        </div>
      </div>
    </div>

    <div @click="closeModalQR" :class="{'show': showModal}" class="offcanvas-backdrop fade" style="display: none"></div>
</template>

<script>
import { QrcodeStream, QrcodeCapture } from 'vue3-qrcode-reader';

export default {
    name: 'ReaderQR',
    components: {
        QrcodeStream,
        QrcodeCapture
    },
    emits: ['readerCode'],
    data() {
        return {
            result: '',
            error: '',
            camera: '',
            showScanConfirmation: false,
            loading: false,
            isMovil: false,
            selectedOption: false,
            showModal: false,
            showMovil: null,
            event: {},
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
        openModalQR() {
            this.getTypeOfDevice()
            this.showModal = true
        },
        closeModalQR() {
            this.showModal = false
            this.showMovil = null
        },
        clickDecode( result ) { 
            //console.log('result.. ', result)
            this.result = result

            if ( this.result.includes('{') && this.result.includes('}') ) {
                let dataUser = JSON.parse(this.result)                
                
                if ( dataUser.id ) {
                    this.$emit('readerCode', dataUser.id)
                    this.showModal = false
                    this.showMovil = null
                }                
            } else {
                alert('El código QR no es valido.')
            }            
        },
        onDecode( decodeString ) {
            //console.log('decode: ', decodeString)
            this.result = decodeString

            this.camera = 'off'

            if ( this.result.includes('{') && this.result.includes('}') ) {
                let dataUser = JSON.parse(this.result)

                if ( dataUser.id ) {
                    this.$emit('readerCode', dataUser.id)
                    this.showModal = false
                    this.showMovil = null
                } 
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
        },
        getTypeOfDevice() {
            const typeNavegator = navigator.userAgent
            //console.log('user agente: ', typeNavegator)
            const moviles = ["Mobile","iPhone","iPod","BlackBerry","Opera Mini","Sony","MOT","Nokia","samsung"];

            moviles.forEach( element => {
                if ( typeNavegator === element ) {
                    this.isMovil = true
                }
            });
            
            this.isMovil ? 'rear' : 'auto'
        }
    },
    mounted() {
        this.event = JSON.parse( localStorage.getItem('event') ) || {}        
        this.getTypeOfDevice()
    }
}
</script>

<style scoped>
.show {
  display: block !important;
}
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
.content-text-qr {
    display: flex;
}
.text-qr {
    width: 7rem;
    padding-top: 10px;
}
.form-select.form-control-clicked {
    background-color: #aa47bc14;
    border-color: #aa47bc5c;
    color: #691b9a !important;
}
</style>