<template>
  <div @click="closeRate" v-if="openRate" id="mainContentRate">
    <div class="first-container">
      <!-- Rating Card -->
      <div class="card">
        <div class="card-body py-5">
          <div class="rating-card-three text-center">
            <h5 class="mb-3">Califica la actividad</h5>
            <p class="style-text-color">Body 2: Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.</p>
            <div class="stars">
              <input class="stars-checkbox" id="first-star" type="radio" name="star">
              <label class="stars-star" for="first-star">
                <svg class="star-icon" id="star1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 53.867 53.867" style="enable-background:new 0 0 53.867 53.867;" xml:space="preserve">
                  <polygon points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 10.288,52.549 13.467,34.013 0,20.887 18.611,18.182"></polygon>
                </svg>
              </label>
              <input class="stars-checkbox" id="second-star" type="radio" name="star">
              <label class="stars-star" for="second-star">
                <svg class="star-icon" id="star2" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 53.867 53.867" style="enable-background:new 0 0 53.867 53.867;" xml:space="preserve">
                  <polygon points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 10.288,52.549 13.467,34.013 0,20.887 18.611,18.182"></polygon>
                </svg>
              </label>
              <input class="stars-checkbox" id="third-star" type="radio" name="star">
              <label class="stars-star" for="third-star">
                <svg class="star-icon" id="star3" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 53.867 53.867" style="enable-background:new 0 0 53.867 53.867;" xml:space="preserve">
                  <polygon points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 10.288,52.549 13.467,34.013 0,20.887 18.611,18.182"></polygon>
                </svg>
              </label>
              <input class="stars-checkbox" id="fourth-star" type="radio" name="star">
              <label class="stars-star" for="fourth-star">
                <svg class="star-icon" id="star4" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 53.867 53.867" style="enable-background:new 0 0 53.867 53.867;" xml:space="preserve">
                  <polygon points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 10.288,52.549 13.467,34.013 0,20.887 18.611,18.182"></polygon>
                </svg>
              </label>
              <input class="stars-checkbox" id="fifth-star" type="radio" name="star">
              <label class="stars-star" for="fifth-star">
                <svg class="star-icon" id="star5" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 53.867 53.867" style="enable-background:new 0 0 53.867 53.867;" xml:space="preserve">
                  <polygon points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 10.288,52.549 13.467,34.013 0,20.887 18.611,18.182"></polygon>
                </svg>
              </label>
            </div>
            <div class="content-botton-rate">              
              <button class="btn btn-primary w-100 d-flex align-items-center justify-content-center mt-4 style-color-button" type="button">Envíar calificación</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RateActivity",
  data() {
    return {
      openRate: true,
    }
  },
  methods: {
    closeRate() {
      this.openRate = !this.openRate;
    }
  }
}
</script>

<style scoped>
div#mainContentRate {
  position: absolute;
  z-index: 9999;
  top: 0;
  width: 100%;
  height: 100vh;
  background: #808080a3;
  display: flex;
  align-items: end;
}
.first-container {
  width: 100% !important;
}
.card {
  border-radius: 6px 6px 0 0 !important;
}
.rating-card-three .stars .star-icon {
  stroke: #9b27b0 !important;
}
.content-botton-rate {
  padding: 0 20%;
}
</style>