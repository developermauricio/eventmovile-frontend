<template>
  <div class="btn-float-file">
    <a class="shadow" href="#">
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-paperclip" viewBox="0 0 16 16">
        <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z"/>
      </svg>
    </a>
  </div>
</template>

<script>
export default {
  name: "FloatButtonFile"
}
</script>

<style scoped>
.btn-float-file a {
  position: fixed;
  width: 3rem;
  height: 3rem;
  z-index: 1000;
  background-color: #7047bc;
  text-align: center;
  line-height: 45px;
  border-radius: 50%;
  bottom: 135px;
  right: 15px;
  color: #ffffff;
}
</style>