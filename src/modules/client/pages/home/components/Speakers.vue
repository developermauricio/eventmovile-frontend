<template>
  <!--=====================================
      HEADER TITLE
  ======================================-->
  <div class="pt-4 align-items-end container">
    <a href="">
      <p class="float-end mt-1 text-more">VER TODOS</p>
      <h3 class="text-speaker">Speakers</h3>
    </a>
  </div>
  <!--=====================================
       SECTION SPEAKER
  ======================================-->
  <div class="page-content-wrapper py-3 m-0">
    <div class="container pe-0 ps-0">
      <div class="card">
        <div class="card-body p-3">
          <div class="container">
            <div class="row">
              <!--=====================================
                 SPEAKER 1
              ======================================-->
              <div class="col-6 mb-3">
                <div class="card card-speaker-img" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom"
                     aria-controls="offcanvasBottom">
                  <div class="card-body text-center text-info-speaker">
                    <img class="mb-3 img-thumbnail" src="assets/img/person-1.png" alt="">
                    <p class="mb-1">TAILANDIA</p>
                    <h6>Jenny Wilson</h6>
                  </div>
                </div>
              </div>
              <!--=====================================
                 SPEAKER 2
              ======================================-->
              <div class="col-6 mb-3">
                <div class="card card-speaker-img" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom"
                     aria-controls="offcanvasBottom">
                  <div class="card-body text-center text-info-speaker">
                    <img class="mb-3 img-thumbnail" src="assets/img/person-2.png" alt="">
                    <p class="mb-1 text-truncate">Louis Vuitton</p>
                    <h6 class="text-truncate">Wade Warren</h6>
                  </div>
                </div>
              </div>
              <!--=====================================
                 SPEAKER 3
              ======================================-->
              <div class="col-6 mb-3">
                <div class="card card-speaker-img" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom"
                     aria-controls="offcanvasBottom">
                  <div class="card-body text-center text-info-speaker">
                    <img class="mb-3 img-thumbnail" src="assets/img/person-2.png" alt="">
                    <p class="mb-1 text-truncate">Louis Vuitton</p>
                    <h6 class="text-truncate">Wade Warren</h6>
                  </div>
                </div>
              </div>
              <!--=====================================
                 SPEAKER 4
              ======================================-->
              <div class="col-6 mb-3">
                <div class="card card-speaker-img" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom"
                     aria-controls="offcanvasBottom">
                  <div class="card-body text-center text-info-speaker">
                    <img class="mb-3 img-thumbnail" src="assets/img/person-2.png" alt="">
                    <p class="mb-1 text-truncate">Louis Vuitton</p>
                    <h6 class="text-truncate">Wade Warren</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--=====================================
   MODAL INFO SPEAKER
  ======================================-->
  <div class="offcanvas offcanvas-bottom modal-canvas-info-speaker" id="offcanvasBottom" tabindex="-1"
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
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At beatae corporis dolorem fuga fugiat hic ipsa magni, officia omnis optio porro provident quae quas quisquam sed, tempora ullam vel voluptas?</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Speakers",
}
</script>

<style scoped>
.text-more {
  font-size: 1rem;
  color: #AA47BC;
}

.text-speaker {
  font-weight: 600;
}

.text-info-speaker p {
  color: #000000 !important;
  letter-spacing: 0.2vh;
  text-transform: uppercase;
  font-size: 0.75rem;
}

.text-info-speaker h6 {
  color: #000000 !important;
}

.card-speaker-img {
  background-color: #D4C8EB !important;
}

.modal-canvas-info-speaker {
  height: 50vh;
}
.text-description-speaker{
  text-align: justify;
}
.text-description-speaker p{
  color: #00000099;
}
</style>