<template>
  <header>
    <div id="nav">
      <router-link to="/board/list">게시판</router-link>
      |
      <router-link to="/login" v-if="!isLoggedIn">로그인</router-link>
      <a v-if="isLoggedIn" @click="fnLogout">로그아웃</a>
    </div>
  </header>
  <hr/>
</template>

<script>

export default {
  methods: {
    fnLogout() {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      location.reload();
    }
  },
  computed: {
    // Vuex store에서 isLogin 상태 가져오기
    isLoggedIn() {
      console.log(this.$store.state);
      return this.$store.state.isLogin;
    }
  }
}
</script>


<style scoped>

</style>