<template>    
    <div class="content-dropzone">
        <DropZone
            @removedFile="onRemovePicture"
            @sending="sending"
            @addedFile="addFile"
            :acceptedFiles="['png,jpg,jpeg,gif']"
            paramName="photo"
            :maxFiles="Number(1)"
            :url="urlBase+'/upload-photo-user'"
            :uploadOnDrop="true"
            :multipleUpload="false"
            ref="dropzone"
            :addRemoveLinks="true"
            :parallelUpload="1"/>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import DropZone from 'dropzone-vue';
import { useLoading } from 'vue-loading-overlay';

export default defineComponent({
    name: 'PhotoUser',
    components: {
        DropZone,
    },
    props: [ 'removedPhoto' ],
    setup(props, context) {
        let fileDropzone = ref(null)
        let urlArchiveServe = ref('hola')
        const dropzone = ref(null)
        const urlBase = process.env.VUE_APP_API_URL
        const $loading = useLoading()

        const clearDropzone = () => {
            dropzone.value.removeFile( fileDropzone.value.id )
        }

        const addFile = (file) => {
            context.emit('removeMessagePrincial', false);
            fileDropzone.value = file
        }

        const sending = (files, xhr) => {
            setTimeout(() => {
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        let data = JSON.parse(xhr.response)
                        let urlPhoto = ''
                        
                        if ( data.status != 404 ) {
                            urlArchiveServe.value = data.url
                            urlPhoto = data.url
                        } 
                        context.emit('urlArchiveServe', urlPhoto);
                    }
                }
            }, 200)
        }

        const onRemovePicture = () => {
            let loader = $loading.show({
                color: '#AA47BC'
            });
            setTimeout(() => {
                const data = { urlPicture: urlArchiveServe }
                
                window.axios.post(`${urlBase}/remove-photo-user`, data).then(resp => {
                    console.log(resp)
                    context.emit('removeMessagePrincial', true);
                    loader.hide()
                }).catch( err => {
                    console.log(err)
                })
            }, 200)
        }

        return {dropzone, fileDropzone, urlArchiveServe, urlBase, clearDropzone, addFile, sending, onRemovePicture}
    },
})
</script>

<style scoped>
.content-dropzone {
    width: 150px;
    z-index: 2;
}
.dropzone__box {
    height: 150px;
    border: 1px dashed #6d439a;
    border-radius: 50%;
    padding: 4px;
}
</style>
