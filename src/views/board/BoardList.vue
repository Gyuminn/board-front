<template>
  <div class="board-list">
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnWrite">등록</button>
    </div>
    <div>
      <select v-model="search_key">
        <option value="">- 선택 -</option>
        <option value="t">제목</option>
        <option value="c">내용</option>
        <option value="w">작성자</option>
        <option value="tc">제목 + 내용</option>
        <option value="tw">제목 + 작성자</option>
      </select>
      &nbsp;
      <input type="text" v-model="search_value" @keyup.enter="fnSearch()">
      &nbsp;
      <button @click="fnSearch()">검색</button>
    </div>
    <table class="w3-table-all">
      <thead>
      <tr>
        <th>No</th>
        <th>제목</th>
        <th>작성자</th>
        <th>등록일시</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, idx) in list" :key="idx">
        <td>{{ row.postId }}</td>
        <td><a v-on:click="fnView(`${row.postId}`)">{{ row.title }}</a></td>
        <td>{{ row.emailId }}</td>
        <td>{{ row.regDate.substring(0,4) + "년 " + row.regDate.substring(5,7) +"월 " + row.regDate.substring(8,10) + "일 "
        + row.regDate.substring(11,13) + "시 " + row.regDate.substring(14,16) + "분" }}</td>
      </tr>
      </tbody>
    </table>
    <div class="pagination w3-bar w3-padding-16 w3-small" v-if="paging.totalPage > 0">
      <span class="pg">
        <a href="javascript:;" @click="fnPage(1)" class="first w3-button w3-bar-item w3-border">&lt;&lt;</a>
        <a href="javascript:;" v-if="paging.prev" @click="fnPage(paging.page - 1)"
           class="prev w3-button w3-bar-item w3-border">&lt;</a>
        <template v-for="pageNumber in paging.pageList" :key="pageNumber">
          <a :class="{ 'w3-button': true, 'w3-bar-item': true, 'w3-border': true, 'active': pageNumber === paging.page }"
             href="javascript:;" @click="fnPage(pageNumber)">{{ pageNumber }}</a>
        </template>
        <a href="javascript:;" v-if="paging.next" @click="fnPage(paging.page + 1)"
           class="next w3-button w3-bar-item w3-border">&gt;</a>
        <a href="javascript:;" @click="fnPage(paging.totalPage)"
           class="last w3-button w3-bar-item w3-border">&gt;&gt;</a>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() { //변수생성
    return {
      requestBody: {},
      page: this.$route.query.page ? this.$route.query.page : 1,
      size: this.$route.query.size ? this.$route.query.size : 10,
      search_key: this.$route.query.type ? this.$route.query.type : '',
      search_value: this.$route.query.keywords ? this.$route.query.keywords : '',
      list: [], // 리스트 데이터
      paging: {
        totalPage: 0,
        page: 1,
        size: 10,
        prev: false,
        next: false,
        pageList: []
      }
    };
  },
  mounted() {
    this.fnGetList()
  },
  methods: {
    fnGetList() {
      this.requestBody = { // 데이터 전송
        type: this.search_key,
        keywords: this.search_value,
        page: this.page,
        size: this.size
      }

      this.$axios.get(this.$serverUrl + "/posts/list", {
        params: this.requestBody,
        headers: {}
      }).then((res) => {

        if (res.data.statusCode === "OK") {
          this.list = res.data.data.dtoList; //서버에서 데이터를 목록으로 보내므로 바로 할당하여 사용할 수 있다.
          this.paging.totalPage = res.data.data.totalPage;
          this.paging.page = res.data.data.page;
          this.paging.size = res.data.data.size;
          this.paging.prev = res.data.data.prev;
          this.paging.next = res.data.data.next;
          this.paging.pageList = res.data.data.pageList;
        }
      }).catch((err) => {
        if (err.message.indexOf('Network Error') > -1) {
          alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
        }
      })
    },
    fnView(postId) {
      this.requestBody.postId = postId;
      this.$router.push({
        path: './detail',
        query: this.requestBody
      })
    },
    fnWrite() {
      this.$router.push({
        path: './write'
      })
    },
    fnPage(n) {
      if (this.page !== n) {
        this.page = n
        this.fnGetList()
      }
    },
    fnSearch() {
      this.fnGetList()
    },
  }
}
</script>

<style scoped>
.pagination {
  margin-top: 20px;
}

.pagination .pg {
  display: flex;
  justify-content: center;
}

.pagination .pg a {
  margin: 0 5px;
}

.pagination .pg a.active {
  background-color: #ccc;
  color: #fff;
}
</style>