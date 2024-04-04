<template>
  <div class="board-detail">
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnSave">저장</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-gray" v-on:click="fnList">목록</button>
    </div>
    <div class="board-contents">
      <input type="text" v-model="title" class="w3-input w3-border" placeholder="제목을 입력해주세요.">
      <input type="text" v-model="userId" class="w3-input w3-border" placeholder="userId를 입력해주세요." v-if="idx === undefined">
    </div>
    <div class="board-contents">
      <textarea id="" cols="30" rows="10" v-model="content" class="w3-input w3-border" style="resize: none;">
      </textarea>
    </div>
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnSave">저장</button>&nbsp;
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
      isUpdate: this.$route.query.isUpdate,

      title: '',
      userId: '',
      content: '',
      regDate: ''
    }
  },
  mounted() {
    this.fnGetView()
  },
  methods: {
    fnGetView() {
      if (this.postId !== undefined) {
        this.$axios.get(this.$serverUrl + '/posts/' + this.postId
        ).then((res) => {
          this.title = res.data.data.title
          this.userId = res.data.data.userId
          this.content = res.data.data.content
          this.regDate = res.data.data.regDate
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    fnList() {
      delete this.requestBody.postId
      this.$router.push({
        path: './list',
        query: this.requestBody
      })
    },
    fnView(postId) {
      this.requestBody.postId = postId
      this.$router.push({
        path: './detail',
        query: this.requestBody
      })
    },
    fnSave() {
      let registerUrl = this.$serverUrl + '/posts/register'
      let updateUrl = this.$serverUrl + '/posts/update'
      this.form = {
        "postId": this.postId,
        "title": this.title,
        "content": this.content,
        "userId": this.userId
      }

      if (!this.isUpdate && this.postId === undefined) {
        //INSERT
        this.$axios.post(registerUrl, this.form)
            .then((res) => {
              alert('글이 저장되었습니다.')
              this.fnView(res.data.data)
            }).catch((err) => {
          if (err.message.indexOf('Network Error') > -1) {
            alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
          }
        })
      } else {
        //UPDATE
        this.$axios.post(updateUrl, this.form)
            .then((res) => {
              alert('글이 저장되었습니다.')
              this.fnView(res.data.data)
            }).catch((err) => {
          if (err.message.indexOf('Network Error') > -1) {
            alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
          }
        })
      }
    },
  }
}
</script>
<style scoped>

</style>