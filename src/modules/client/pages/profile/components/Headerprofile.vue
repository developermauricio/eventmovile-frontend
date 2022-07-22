<template>
  <div class="container-profile">
    <div class="card user-info-card mb-3">
      <div class="card-body d-flex align-items-center">
        <div class="user-profile me-3">
          <img :src="dataUser.pic ? urlBaseFile + dataUser.pic : '/assets/img/avatars/photo-user.png'" width="60" alt="Photo user">
        </div>
        <div class="user-info">
          <div class="d-flex align-items-center">
            <h6 class="mb-1">{{ fullName }}</h6>
          </div>
          <p class="mb-0">{{ dataUser.name_company ? dataUser.name_company : 'Por definir' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Headerprofile",
  props: {
    dataUser: {
      type: Object,
      default: function() {
        return {};
      }
    },
  },
  data() {
    return {
      urlBaseFile: process.env.VUE_APP_API_URL_FILES,
      fullName: '',
    }
  },
  created() {
    this.fullName = this.dataUser.name + ' ' + this.dataUser.lastname
  }
}
</script>

<style scoped>
.container-profile {
  margin-top: 4rem !important;
}
.user-profile {
  width: 60px;
  height: 60px;
}
</style>