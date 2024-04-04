<template>
  <div class="board-detail">
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnUpdate">수정</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-red" v-on:click="fnDelete">삭제</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-gray" v-on:click="fnList">목록</button>
    </div>
    <div class="board-contents">
      <h3>{{ title }}</h3>
      <div>
        <strong class="w3-large">{{ emailId }}</strong>
        <br>
        <span>{{ "등록일: " + regDate.substring(0,4) + "년 " + regDate.substring(5,7) +"월 " + regDate.substring(8,10) + "일 "
 + regDate.substring(11,13) + "시 " +regDate.substring(14,16) + "분"       }}</span><br/>
        <span>{{ "수정일: " + modDate.substring(0,4) + "년 " + modDate.substring(5,7) +"월 " + modDate.substring(8,10) + "일 "
        + modDate.substring(11,13) + "시 " +modDate.substring(14,16) + "분 "       }}</span>
      </div>
    </div>
    <div class="board-contents">
      <span>{{ content }}</span>
    </div>
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnUpdate(true)">수정</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-red" v-on:click="fnDelete">삭제</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-gray" v-on:click="fnList">목록</button>
    </div>
  </div>
</template>

<script>
export default {
  data() { //변수생성
    return {
      requestBody: this.$route.query,
      postId: this.$route.query.postId,

      title: '',
      userId: '',
      emailId: '',
      content: '',
      regDate: '',
      modDate: ''
    }
  },
  mounted() {
    this.fnGetView()
  },
  methods: {
    fnGetView() {

      this.$axios.get(this.$serverUrl + '/posts/' + this.postId).then((res) => {
        this.title = res.data.data.title
        this.userId = res.data.data.userId
        this.emailId = res.data.data.emailId
        this.content = res.data.data.content
        this.regDate = res.data.data.regDate
        this.modDate = res.data.data.modDate
      }).catch((err) => {
        if (err.message.indexOf('Network Error') > -1) {
          alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
        }
      })
    },
    fnList() {
      delete this.requestBody.idx
      this.$router.push({
        path: './list',
        query: this.requestBody
      })
    },
    fnUpdate(isUpdate) {
      this.requestBody.isUpdate = isUpdate;
      this.$router.push({
        path: './write',
        query: this.requestBody
      })
    },
    fnDelete() {
      if (!confirm("삭제하시겠습니까?")) return

      this.$axios.delete(this.$serverUrl + '/posts/' + this.postId, {})
          .then(() => {
            alert('삭제되었습니다.')
            this.fnList();
          }).catch((err) => {
        console.log(err);
      })
    }
  }
}
</script>
<style scoped>


</style>