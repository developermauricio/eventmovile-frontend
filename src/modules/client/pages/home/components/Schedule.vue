<template>
  <div class="pt-4 align-items-end container">
    <router-link to="/schedule">
      <p class="float-end mt-1 text-more"><i class="bi bi-plus-lg pe-3"></i>VER TODA</p>
      <h3 class="text-schedule">Agenda</h3>
    </router-link>
  </div>

  <!-- Chat User List -->
  <div class="page-content-wrapper py-3 items-schedule">
    <div class="container pe-0 ps-0 slide-schedule">
      <div class="card">
        <div class="card-body p-3">
          <div class="slide-schedule-items">
            <div>
              <a class="affan-page-item time-schedule-content" href="page-login.html">
                <div class="icon-wrapper ">
                  <p>oct 10 00:00 am</p>
                </div>

                <div class="pt-3">
                  <h6 class="text-truncate mb-0">Nombre Actividad</h6>
                  <p>En vivo ahora</p>
                </div>

                <i class="bi bi-chevron-right pe-3"></i>
              </a>
              <a class="affan-page-item time-schedule-content" href="page-login.html">
                <div class="icon-wrapper ">
                  <p>oct 10 00:00 am</p>
                </div>
                <div class="pt-3">
                  <h6 class="text-truncate mb-0">Nombre Actividad</h6>
                  <p>En vivo ahora</p>
                </div>
                <i class="bi bi-chevron-right pe-3"></i>
              </a>
            </div>
            <div>
              <a class="affan-page-item time-schedule-content" href="page-login.html">
                <div class="icon-wrapper ">
                  <p>oct 10 00:00 am</p>
                </div>
                <div class="pt-3">
                  <h6 class="text-truncate mb-0">Nombre Actividad</h6>
                  <p>En vivo ahora</p>
                </div>
                <i class="bi bi-chevron-right pe-3"></i>
              </a>
              <a class="affan-page-item time-schedule-content" href="page-login.html">
                <div class="icon-wrapper ">
                  <p>oct 10 00:00 am</p>
                </div>
                <div class="pt-3">
                  <h6 class="text-truncate mb-0">Nombre Actividad</h6>
                  <p>En vivo ahora</p>
                </div>
                <i class="bi bi-chevron-right pe-3"></i>
              </a>
            </div>
          </div>
          <div class="mt-3">
            <nav aria-label="Page navigation example">
              <ul class="pagination pagination-two controls-slide-schedule">
                <li class="page-item"><a class="page-link ps-0" aria-label="Previous">
                  <svg class="bi bi-chevron-left" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"></path>
                  </svg></a></li>
                <li class="page-item"><a class="page-link" aria-label="Next">
                  <svg class="bi bi-chevron-right" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>
                  </svg></a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Schedule",
  mounted() {
    if (document.querySelectorAll(".slide-schedule").length > 0) {
      window.tns({
        container: ".slide-schedule-items",
        items: 2,
        gutter: 1,
        center: false,
        slideBy: "page",
        autoplay: false,
        fixedWidth: 340,
        loop: false,
        autoplayButtonOutput: false,
        autoplayTimeout: 4000,
        speed: 1000,
        mouseDrag: false,
        controls: true,
        nav: false,
        navPosition: "bottom",
        controlsContainer: document.querySelector('.controls-slide-schedule'),
      });
    }
  }
}
</script>

<style scoped>
.text-schedule {
  font-weight: 600;
}

.text-more {
  font-size: 1rem;
  color: #AA47BC;
}

.items-schedule {
  margin-top: 0px !important;
}

.affan-page-item.time-schedule-content .icon-wrapper {
  width: 7.25rem !important;
  height: 3.25rem !important;
  border-radius: 8% !important;
}

.icon-wrapper p {
  margin-top: 1rem;
  padding: 1rem;
  text-align: center;
}
.controls-slide-schedule .page-link{
  color: rgba(0, 0, 0, 0.58);
  background-color: transparent !important;
}
.page-content-wrapper.items-schedule{
  margin-bottom: 0px !important;
}
</style>