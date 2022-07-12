<template>
  <DropZone
      @removedFile="onRemovePicture"
      @sending="sending"
      @addedFile="addFile"
      :acceptedFiles="['png','jpg','jpeg','gif']"
      paramName="picture"
      :maxFiles="Number(1)"
      :url="urlBase+'/upload-image-gallery'"
      :uploadOnDrop="true"
      :multipleUpload="false"
      :maxFileSize="600000000"
      ref="dropzone"
      :addRemoveLinks="true"
      @errorUpload="onErrorUpload"
      @errorAdd="onError"
      :parallelUpload="1"/>
</template>

<script>
import {DropZone} from 'dropzone-vue';
import {defineComponent, ref, onMounted} from "vue";
import {useLoading} from 'vue-loading-overlay'

export default defineComponent({
  name: "DrozponeUpload",
  components: {
    DropZone,
  },

  props: ['removedPicture'],
  setup(props, context) {
    let fileDropzone = ref(null)
    let urlArchiveServe = ref('')
    const dropzone = ref(null)
    const urlBase = process.env.VUE_APP_API_URL
    const $loading = useLoading()

    const clearDropzone = () => {
      console.log('dropzone', dropzone.value.removeFile(fileDropzone.value.id))
    }

    const onErrorUpload = () => {
      console.log('Error al subir el archivo...')
    }

    const onError = ( files ) => {
      console.log('Error al agregar un archivo...', files)
    }

    const addFile = (file) => {
      context.emit('removeMessagePrincial', false);
      fileDropzone.value = file
    }

    const sending = (files, xhr) => {
      setTimeout(() => {
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            console.log(typeof (xhr.response))
            urlArchiveServe.value = xhr.response
            context.emit('urlArchiveServe', urlArchiveServe);
          }
        }
      }, 200)
    }


    const onRemovePicture = () => {

      let loader = $loading.show({
        color: '#AA47BC'
      });
      setTimeout(() => {
        const data = new FormData();
        data.append("urlPicture", urlArchiveServe);
        window.axios.post(`${urlBase}/removed-gallery-picture`, data).then(resp => {
          console.log(resp)
          context.emit('removeMessagePrincial', true);
          loader.hide()
        }).catch(err => {
          console.log(err)
        })
      }, 200)
    }

    onMounted(() => {

    })


    return {dropzone, fileDropzone, urlArchiveServe, urlBase, clearDropzone, addFile, onErrorUpload, onError, sending, onRemovePicture}
  },
  methods: {


    // sending(files, xhr) {
    //   let resp = this
    //   setTimeout(() => {
    //     xhr.onreadystatechange = function () {
    //       if (xhr.readyState === 4) {
    //         console.log(typeof (xhr.response))
    //         resp.urlArchiveServe = xhr.response
    //         resp.$emit('urlArchiveServe', resp.urlArchiveServe);
    //       }
    //     }
    //   }, 200)
    // },


  },
})
</script>

<style scoped>

.dropzone__box {
  text-align: center !important;
  width: 100% !important;
  min-height: 100% !important;
  position: relative !important;
  /*border: 1px solid #ff0000 !important;*/
  border: none !important;
  /*position: absolute !important;*/
}
</style>