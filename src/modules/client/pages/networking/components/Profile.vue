<template>
  <!--=====================================
  MODAL INFO PERFIL NETWOKING
 ======================================-->
  <div>
    <div class="offcanvas offcanvas-bottom modal-canvas-info-speaker" id="offcanvasBottomProfileNetworking" tabindex="-1"
         aria-labelledby="offcanvasBottomLabel">
      <!-- Close Button -->
      <button class="btn-close text-reset" type="button" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      <!-- Offcanvas Body -->
      <div class="offcanvas-body p-4">
        <div class="row">
          <div class="col-12 align-items-center text-center">
            <img class="img-circle" src="assets/img/person-1.png" width="90" alt="">
            <h6 class="mt-2 m-0">Robert Fox</h6>
            <p class="m-0">Irlanda</p>
          </div>
        </div>
        <div class="container">
          <div class="row mt-2">
            <div class="col-12 text-description-speaker">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At beatae corporis dolorem fuga fugiat hic ipsa magni, officia omnis optio porro provident quae quas quisquam sed, tempora ullam vel voluptas? </p>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-6">
              <a class="btn m-1 btn-lg btn-light" href="#" data-bs-dismiss="offcanvas" aria-label="Close">CERRAR</a>
            </div>
            <div class="col-6">
              <a class="btn m-1 btn-lg btn-primary float-end" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-person-plus" viewBox="0 0 16 16">
                  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                  <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                </svg> Conectar</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Profile"
}
</script>

<style scoped>
.btn-light{
  width: 100% !important;
}
.btn-primary{
  width: 100% !important;
}
.modal-canvas-info-speaker {
  height: 40vh;
}
.text-description-speaker{
  text-align: justify;
}
.text-description-speaker p{
  color: #00000099;
}
</style>