<template>
  <div>
    <div class="container">
      <div class="offcanvas offcanvas-bottom p-2" id="modalSearchScheedule" tabindex="-1"
           aria-labelledby="offcanvasBottomLabel">

        <div class="header-content position-relative d-flex align-items-center justify-content-between">
          <!-- Back Button -->
          <div class="back-button" data-bs-dismiss="offcanvas">
            <svg class="bi bi-arrow-left-short icon-back" width="32" height="32" viewBox="0 0 16 16" fill="currentColor"
                 xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                    d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"></path>
            </svg>
          </div>
          <!-- Page Title -->
          <div class="page-heading">
            <h6 class="mb-0 position-relative text-center fw-bold">Busqueda</h6>
          </div>
          <div class="setting-wrapper">
            <div class="setting-trigger-btn" id="settingTriggerBtn">
            </div>
          </div>
        </div>

        <!-- Offcanvas Body -->
        <div class="offcanvas-body p-1">
          <div class="chat-search-box pt-1 pb-4">
            <form action="#">
              <div class="input-group"><span class="input-group-text" id="searchbox"><i class="bi bi-search"></i></span>
                <input class="form-control" v-model="searchQuery" type="search" placeholder="Buscar..."
                       aria-describedby="searchbox">
              </div>
            </form>
          </div>
                    <div class="icon-search-center" v-if="!searchQuery">
                      <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="currentColor" class="bi bi-journal" viewBox="0 0 16 16">
                        <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                        <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                      </svg>
                    </div>
          <!--=====================================
          ITEM AGENDA
      ======================================-->
          <div v-for="item in filteredSchedule" :key="item.id">
            <a class="affan-page-item p-2" href="#">
              <div class="me-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor"
                     class="bi bi-broadcast mb-3" viewBox="0 0 16 16">
                  <path
                      d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707zm2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 1 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708zm5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708zm2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707zM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
                </svg>
                <br>
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor"
                     class="bi bi-play-btn-fill mb-3" viewBox="0 0 16 16">
                  <path
                      d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
                </svg>
              </div>

              <div class="p-2 text-title-evaluate-event">
                <h5 class="mb-0">{{ item.title }}</h5>
                <p>{{ item.subTitle }}</p>
                <div class="mt-4 display-flex">
                  <div class="style-span-green">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         class="bi bi-clock color-icon-green" viewBox="0 0 16 16">
                      <path
                          d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                    </svg>
                    <span>{{ item.time }}</span>
                  </div>
                  <div class="style-span">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         class="bi bi-people color-ico me-1" viewBox="0 0 16 16">
                      <path
                          d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                    </svg>
                    <span>180</span>
                  </div>
                </div>
              </div>

              <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor"
                   class="bi bi-heart" viewBox="0 0 16 16">
                <path
                    d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
              </svg>

            </a>
            <hr>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Seearch",
  data() {
    return {
      searchQuery: '',
      items: [
        {
          id: 1,
          title: 'Masterclass de Diseño: Tipografía y Lettering',
          subTitle: 'Wade Warren | sala 2 ',
          time: '2:00pm'
        },
        {
          id: 2,
          title: 'Hagamos animación de personajes',
          subTitle: 'robert fox | sala 1 ',
          time: '4:00pm'
        },
        {
          id: 3,
          title: 'Creating Viral Video Effects with Josh Olufemii',
          subTitle: 'Wade Warren | sala 2 ',
          time: '8:00pm'
        },
      ]

    }
  },
  computed: {
    filteredSchedule() {
      if (this.searchQuery) {
        return this.items.filter((item) => {
          this.iconSearch = false
          return item.title.toLowerCase().includes(this.searchQuery) || item.subTitle.toLowerCase().includes(this.searchQuery);
        })
      } else {
        return [];
      }
    }
  }
}
</script>

<style scoped>
.offcanvas-bottom {
  height: 100% !important;
}
.text-title-evaluate-event p {
  color: #00000094 !important;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-top: 0.5rem;
}
.icon-search-center .bi-journal {
  margin: 0;
  color: #acacac66 !important;
  top: 50%;
  -ms-transform: translateY(150%);
  transform: translateY(150%);
}

.icon-search-center {
  margin: auto;
  display: table;
  position: relative;
}

.color-icon-green {
  color: #4caf50;
  margin-right: 8px;
}

.style-span {
  padding: 3px 8px;
  border: 1px solid #c788d4;
  border-radius: 18px;
  margin-right: 15px;
  background-color: #f3e5f5;
  color: #542193;
  font-size: 14px;
}

.style-span-green {
  padding: 3px 8px;
  border: 1px solid #8ecb92;
  border-radius: 18px;
  margin-right: 15px;
  background-color: #e8f5e9;
  color: #1b5e20;
  font-size: 14px;
}

.text-justify {
  text-align: justify;
}

.display-flex {
  display: flex;
}

</style>