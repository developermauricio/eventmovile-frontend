<template>
    <div class="marg-top">
      <div class="chat-footer">
      <div class="container h-100">
        <div class="chat-footer-content h-100 d-flex align-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-text style-icon" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
            <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
          </svg>
          <form action="#">
            <!-- Message -->
            <input class="form-control style-input" type="text" placeholder="Únete a la conversación">                                
          </form>
        </div>
      </div>
    </div>   
    </div>
</template>

<script>
export default {
  name: "InitChat"
}
</script>

<style scoped>
.marg-top {
  margin-top: -18px;
}
.style-input {
  border-radius: 0 !important;
  padding-left: 3rem;
}
.style-icon {
  left: 25px;
  position: absolute;
  z-index: 9;
  color: #9187b0;
}
</style>