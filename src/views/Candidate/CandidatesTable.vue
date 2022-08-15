<template>
  <div class="col list-title list-style">
    <h1 class="mb-0 candidate-table-title" :class="type === 'dark' ? 'text-white' : ''">
      {{ title }}
    </h1>
  </div>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div class="table-responsive list-card">
      <loading
        :is-full-page="false"
        :opacity="0.9"
        :active="isLoading"
      ></loading>
      <base-table
        id="myTable"
        class="table align-items-center table-hover list-table"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="tableData"
      >
        <template v-slot:columns>
          <th class="tableHeader">{{ $t("candidate.address") }}</th>
          <th class="tableHeader">
            {{ $t("candidate.committee") }}
            <el-tooltip :content="this.content" placement="top">
              <i class="el-icon-question" />
            </el-tooltip>
          </th>
          <th class="tableHeader">{{ $t("candidate.rank") }}</th>
          <th class="tableHeader">{{ $t("candidate.votes") }}</th>
          <th class="tableHeader">{{ $t("candidate.percentage") }}</th>
        </template>

        <template v-slot:default="row">
          <td class="budget tableContent">
            <div class="short tableContent" style="text-align: center">
              <router-link
                class="table-list-item-blue mb-0"
                style="cursor: pointer"
                :to="'/accountprofile/' + row.item.candidate"
              >
                {{ row.item.candidate }}
              </router-link>
            </div>
          </td>
          <td class="tableContent">
            <span
              v-if="
                row.item.isCommittee &&
                row.index + 1 + (this.pagination - 1) * this.resultsPerPage <= 7
              "
              ><span></span> {{ $t("candidate.consensus") }}</span
            >
            <span
              v-else-if="
                row.item.isCommittee &&
                row.index + 1 + (this.pagination - 1) * this.resultsPerPage > 7
              "
            >
              <span></span> {{ $t("candidate.committees") }}
            </span>
            <span v-else> {{ $t("candidate.candidate") }}</span>
          </td>
          <td class="table-list-item tableContent">
            {{ row.index + 1 + (this.pagination - 1) * this.resultsPerPage }}
          </td>
          <td class="table-list-item tableContent">
            {{ row.item.votesOfCandidate }}
          </td>
          <td class="table-list-item tableContent">
            {{ getVotePercentage(row.item.votesOfCandidate) }}
          </td>
        </template>
      </base-table>
    </div>

    <div
      v-if="totalCount >= 10"
      class="card-footer d-flex justify-content-end"
      :class="type === 'dark' ? 'bg-transparent' : ''"
      style="height: 70px"
    >
      <el-pagination
        v-if="windowWidth > 552"
        @current-change="handleCurrentChange"
        :hide-on-single-page="totalCount <= 10"
        :current-page="parseInt(pagination)"
        :pager-count="5"
        :page-size="10"
        layout="jumper, prev, pager, next"
        :total="totalCount"
      >
      </el-pagination>
      <el-pagination
        v-if="windowWidth < 552"
        small
        @current-change="handleCurrentChange"
        :hide-on-single-page="totalCount <= 10"
        :current-page="parseInt(pagination)"
        :pager-count="5"
        layout="prev,pager,next"
        :total="totalCount"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import net from "../../store/store";

export default {
  name: "candidates-table",
  props: {
    type: {
      type: String,
    },
    title: String,
  },
  computed: {
    content: function () {
      if (this.$i18n.locale === "en") {
        return "Account includes consensus, committee, candidate, normal, 4 types.";
      } else if (this.$i18n.locale === "cn") {
        return "账户包括 共识结点，委员会结点，候选人结点，普通结点四种类型";
      } else {
        return "Le compte contiens 4 types: consensus, comité, candidature, normal";
      }
    },
  },

  components: {
    Loading,
  },
  data() {
    return {
      network: net.url,
      tableData: [],
      totalCount: 0,
      votesCount: 0,
      resultsPerPage: 10,
      pagination: this.$route.params.page,
      skip: 0,
      count: 0,
      isLoading: true,
      countPage: 0,
      windowWidth: window.innerWidth,
    };
  },

  created() {
    window.scroll(0, 0);
    this.getCandidateList((this.pagination - 1) * this.resultsPerPage);
    this.getTotalVotes();
  },
  watch: {
    $route: "watchrouter",
  },
  methods: {
    getVotePercentage(votes) {
      // var per = votes / this.votesCount;
      var per = votes / 100000000;
      if (votes == 0) {
        return 0;
      }
      var str = Number(per * 100).toFixed(2);
      str += "%";
      return str;
    },
    getAddress(accountAddress) {
      this.$router.push({
        path: `/accountprofile/${accountAddress}`,
      });
    },
    handleCurrentChange(val) {
      this.isLoading = true;
      this.pagination = val;

      this.$router.push({
        path: `/candidates/${this.pagination}`,
      });
    },
    watchrouter() {
      //如果路由有变化，执行的对应的动作
      // console.log(this.$route.name)
      if (this.$route.name === "Candidates") {
        console.log(this.pagination);
        this.pagination = this.$route.params.page;
        this.getCandidateList((this.pagination - 1) * this.resultsPerPage);
      }
    },
    getCandidateList(skip) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: {
            Limit: this.resultsPerPage,
            Skip: skip,
            Sort: "votesOfCandidate = -1",
          },
          method: "GetCandidate",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.isLoading = false;
        this.tableData = res["data"]["result"]["result"];
        this.totalCount = res["data"]["result"]["totalCount"];
        this.countPage =
          this.totalCount === 0
            ? 1
            : Math.ceil(this.totalCount / this.resultsPerPage);
        this.count = this.skip;
      });
    },
    getTotalVotes() {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: {},
          method: "GetTotalVotes",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.votesCount = res["data"]["result"]["totalvotes"];
      });
    },
  },
};
</script>
<style>
.address {
  width: 200px !important;
  white-space: nowrap;
  /*overflow: hidden;*/
  text-overflow: ellipsis;
}
.list-style {
    width: 85%;
    margin: 0 auto;
    background: #f7f8fa;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: -3rem;
}
.candidate-table-title {
  font-family: Inter;
  font-style: normal;
  font-weight: bold !important;
  font-size: 45px !important;
  line-height: 58px;
  text-align: center;
  /* identical to box height */
  color: black;
}
.tableHeader {
  text-align: left;
}
.tableContent {
  text-align: left;
}
</style>
