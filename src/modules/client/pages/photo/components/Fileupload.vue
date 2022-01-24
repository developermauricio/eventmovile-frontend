<template>

  <div v-bind="getRootProps()">
    <input v-bind="getInputProps()" />
    <img style="width: 100%" src="assets/img/img-upload-file.png" alt="">
    <div v-if="isDragReject" id="isDragReject">
      isDragReject: {{ isDragReject }}
    </div>
<!--    <p v-if="isDragActive">Drop the files here ...</p>-->
<!--    <p v-else>Drag 'n' drop some files here, or click to select files</p>-->
  </div>
</template>

<script>
import {reactive} from "vue";
import { useDropzone } from "vue3-dropzone";
export default {
  name: "Fileupload",
  setup() {
    function onDrop(acceptFiles, rejectReasons) {
      console.log(acceptFiles);
      console.log(rejectReasons);
    }

    const options = reactive({
      multiple: false,
      onDrop,
      maxFiles: 1,
      noDrag:true,
      accept: '.jpg',
    })

    const { getRootProps, getInputProps, ...rest } = useDropzone(options);
    console.log({...rest })
    return {
      options,
      getRootProps,
      getInputProps,
      ...rest,
    };
  },
}
</script>

<style scoped>

</style>