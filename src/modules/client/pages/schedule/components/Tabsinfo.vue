<template>
  <div>
    <div class="container pe-0 ps-0">
      <div class="minimal-tab mt-4">
        <ul class="nav nav-tabs mb-0 ps-3 pe-3" id="affanTab2" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="btn btn-tab active" id="sass-tab1" data-bs-toggle="tab" data-bs-target="#sass1" type="button"
                    role="tab" aria-controls="sass" aria-selected="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                   class="bi bi-calendar-event" viewBox="0 0 16 16">
                <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
                <path
                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
              </svg>
              <span> DÍA 1</span>
            </button>
          </li>
          <li class="nav-item " role="presentation">
            <button class="btn btn-tab" id="sass-tab2" data-bs-toggle="tab" data-bs-target="#sass2" type="button"
                    role="tab" aria-controls="sass" aria-selected="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                   class="bi bi-calendar-event" viewBox="0 0 16 16">
                <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
                <path
                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
              </svg>
              <span> DÍA 2</span>
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="btn btn-tab" id="sass-tab3" data-bs-toggle="tab" data-bs-target="#sass3" type="button"
                    role="tab" aria-controls="sass" aria-selected="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                   class="bi bi-calendar-event" viewBox="0 0 16 16">
                <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
                <path
                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
              </svg>
              <span> DÍA 3</span>
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="btn btn-tab" id="sass-tab4" data-bs-toggle="tab" data-bs-target="#sass3" type="button"
                    role="tab" aria-controls="sass" aria-selected="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                   class="bi bi-calendar-event" viewBox="0 0 16 16">
                <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
                <path
                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
              </svg>
              <span> DÍA 4</span>
            </button>
          </li>
        </ul>
        <div class="tab-content rounded-lg" id="affanTab2Content">
          <!--=====================================
        CONTENIDO 1
    ======================================-->
          <div class="tab-pane fade show active" id="sass1" role="tabpanel" aria-labelledby="sass-tab">
            <div class="container ps-0 pe-0">
              <div class="card">
                <div class="card-body">
                  <p class="date">Enero 15, 2021</p>
                  <a class="affan-page-item" href="">
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
                      <h5 class="mb-0">Masterclass de Diseño: Tipografía y Lettering</h5>
                      <p>Wade Warren | sala 2 </p>
                      <div class="mt-4 display-flex">
                        <div class="style-span-green">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                               class="bi bi-clock color-icon-green" viewBox="0 0 16 16">
                            <path
                                d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                          </svg>
                          <span>9:00 am</span>
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
                  <!--=====================================
                    ITEM 2
                  ======================================-->
                  <p class="date">Enero 25, 2021</p>
                  <a class="affan-page-item" href="">
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
                      <h5 class="mb-0">Creating Viral Video Effects with Josh Olufemii </h5>
                      <p>Wade Warren | sala 2 </p>
                      <div class="mt-4 display-flex">
                        <div class="style-span-green">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                               class="bi bi-clock color-icon-green" viewBox="0 0 16 16">
                            <path
                                d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                          </svg>
                          <span>9:00 am</span>
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
                  <!--=====================================
                    ITEM 3
                  ======================================-->
                  <p class="date">Enero 25, 2021</p>
                  <a class="affan-page-item" href="">
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
                      <h5 class="mb-0">Creating Viral Video Effects with Josh Olufemii </h5>
                      <p>Wade Warren | sala 2 </p>
                      <div class="mt-4 display-flex">
                        <div class="style-span-green">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                               class="bi bi-clock color-icon-green" viewBox="0 0 16 16">
                            <path
                                d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                          </svg>
                          <span>9:00 am</span>
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
                </div>
              </div>
            </div>
          </div>

          <!--=====================================
        CONTENIDO 2
    ======================================-->
          <div class="tab-pane fade show" id="sass2" role="tabpanel" aria-labelledby="sass-tab">
            <div class="container ps-0 pe-0">
              <div class="card">
                <div class="card-body">
                  <p class="date">Enero 20, 2021</p>
                  <a class="affan-page-item" href="page-login.html">
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
                      <h5 class="mb-0">Hagamos animación de personajes</h5>
                      <p>Wade Warren | sala 2 </p>
                      <div class="mt-4 display-flex">
                        <div class="style-span-green">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                               class="bi bi-clock color-icon-green" viewBox="0 0 16 16">
                            <path
                                d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                          </svg>
                          <span>9:00 am</span>
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
                </div>
              </div>
            </div>
          </div>
          <!--=====================================
        CONTENIDO 3
    ======================================-->
          <div class="tab-pane fade show" id="sass3" role="tabpanel" aria-labelledby="sass-tab">
            <div class="container ps-0 pe-0">
              <div class="card">
                <div class="card-body">
                  <p class="date">Enero 25, 2021</p>
                  <a class="affan-page-item" href="page-login.html">
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
                      <h5 class="mb-0">Creating Viral Video Effects with Josh Olufemii </h5>
                      <p>Wade Warren | sala 2 </p>
                      <div class="mt-4 display-flex">
                        <div class="style-span-green">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                               class="bi bi-clock color-icon-green" viewBox="0 0 16 16">
                            <path
                                d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                          </svg>
                          <span>9:00 am</span>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--=====================================
        BUSCADOR
    ======================================-->
    <Search/>
  </div>
</template>

<script>
import {defineAsyncComponent} from "vue";

export default {
  name: "Tabsinfo",
  components: {
    Search: defineAsyncComponent(() => import(/* webpackChunkName: "Search"*/ '@/modules/client/pages/schedule/components/Search'))

  },
  mounted() {

    if (document.querySelectorAll(".minimal-tab").length > 0) {
      window.tns({
        container: ".nav-tabs",
        items: 3,
        gutter: 10,
        slideBy: "page",
        loop: false,
        autoplay: false,
        center: false,
        autoplayButtonOutput: false,
        autoplayTimeout: 5000,
        speed: 750,
        mouseDrag: false,
        controls: false,
        nav: false,
      });
    }
  }
}
</script>

<style scoped>

.text-title-evaluate-event h6 {
  font-weight: 600;
}

.text-title-evaluate-event p {
  color: #00000094 !important;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-top: 0.5rem;
}

.btn-tab {
  font-size: 1.3rem !important;
}

.date {
  color: #00000094 !important;
}

.controls .page-link {
  color: rgba(0, 0, 0, 0.58);
  background-color: transparent !important;
}

.minimal-tab .btn.active svg {
  border-bottom-color: #AA47BC;
  color: #AA47BC !important;
}

.minimal-tab .btn.active span {
  color: #3D2895 !important;
}

.minimal-tab .btn.active {
  border-bottom-color: #AA47BC;
  color: #AA47BC !important;
}

.minimal-tab .btn {
  color: #00000061 !important;
}


.color-icon {
  color: #a033b4;
  margin-right: 8px;
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