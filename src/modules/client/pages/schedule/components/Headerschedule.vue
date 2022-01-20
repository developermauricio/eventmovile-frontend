<template>
  <!-- Header Area -->
  <div class="header-area header-home" id="headerArea">
    <div class="container">
      <!-- # Paste your Header Content from here -->
      <!-- # Header Five Layout -->
      <!-- # Copy the code from here ... -->
      <!-- Header Content -->
      <div class="header-content header-style-five position-relative d-flex align-items-center justify-content-between">
        <div @click="$router.go(-1)">
          <div class="back-button">
            <svg class="bi bi-arrow-left-short icon-back" width="32" height="32" viewBox="0 0 16 16"
                 fill="currentColor" xmlns="http://www.w3.org/2000/svg" data-v-76333a24="">
              <path fill-rule="evenodd"
                    d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                    data-v-76333a24=""></path>
            </svg>
          </div>
        </div>
        <div class="page-heading text-center">
          <h6 class="mb-0 position-relative text-center fw-bold">Agenda</h6>
        </div>
        <!-- Logo Wrapper -->
<!--        <div class="logo-wrapper"><a href="page-home.html"><img src="" alt=""></a></div>-->
        <!-- Navbar Toggler -->
        <div class="chat-user--info d-flex align-items-center">
            <div class="setting-wrapper me-4" data-bs-toggle="offcanvas" data-bs-target="#modalSearchScheedule"
                 aria-controls="modalSearchScheedule">
              <div class="setting-trigger-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search"
                     viewBox="0 0 16 16">
                  <path
                      d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
              </div>
            </div>
        </div>

      </div>
      <!-- # Header Five Layout End -->
    </div>
  </div>
  <div class="container-fluid content-header-history">
    <div class="container">
      <div class="chat-user-status-slides-wrapper">
        <div class="tns-outer" id="tns1-ow">
          <div id="tns1-mw" class="tns-ovh">
            <div class="tns-inner" id="tns1-iw">
              <div class="chat-user-status-slides mb-2  tns-slider tns-carousel tns-subpixel tns-calc tns-horizontal"
                   id="tns1" style="transform: translate3d(-68%, 0px, 0px);">
                <div class="tns-item tns-slide-cloned" aria-hidden="true" tabindex="-1">
                  <div class="user-status-slide offline">
                    <a href="#">
                      <img src="assets/img/bg-img/user2.png" alt="">
<!--                      <div class="active-status"></div>-->
                      <p class="mb-0 mt-2 text-truncate">Wade warren</p>
                    </a>
                  </div>
                </div>

                <div class="tns-item tns-slide-cloned" aria-hidden="true" tabindex="-1">
                  <div class="user-status-slide offline">
                    <a href="#">
                      <img src="assets/img/bg-img/user2.png" alt="">
<!--                      <div class="active-status"></div>-->
                      <p class="mb-0 mt-2 text-truncate">Wade warren</p>
                    </a>
                  </div>
                </div>

                <div class="tns-item tns-slide-cloned" aria-hidden="true" tabindex="-1">
                  <div class="user-status-slide offline">
                    <a href="#">
                      <img src="assets/img/bg-img/user2.png" alt="">
<!--                      <div class="active-status"></div>-->
                      <p class="mb-0 mt-2 text-truncate">Wade warren</p>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Headerschedule",

  mounted() {

    if (document.querySelectorAll(".chat-user-status-slides-wrapper").length > 0) {
      window.tns({
        container: ".chat-user-status-slides",
        items: 5,
        gutter: 8,
        slideBy: "page",
        autoplay: true,
        autoplayButtonOutput: false,
        autoplayTimeout: 5000,
        speed: 750,
        mouseDrag: true,
        controls: false,
        nav: false,
        responsive: {
          480: {
            items: 7
          },
          576: {
            items: 7
          },
          768: {
            items: 8
          },
          992: {
            items: 10
          },
          1200: {
            items: 10
          }
        }
      });
    }
  }
}
</script>

<style scoped>
.content-header-history {
  background-color: #ffffff !important;
  position: relative;
  padding-top: 3.5rem;
}

.header-area {
  border-bottom: none !important;
}

.chat-user-status-slides .user-status-slide a {
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
}

.chat-user-status-slides .user-status-slide a img {
  width: 5rem !important;
}

.chat-user-status-slides .user-status-slide a {
  padding: 0.5rem -0.75rem 0.375rem !important
}
</style>