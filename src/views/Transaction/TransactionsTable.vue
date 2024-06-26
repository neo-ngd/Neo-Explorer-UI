<template>
  <div class="col list-title list-style">
    <h1
      class="mb-0 transaction-table-title"
      :class="type === 'dark' ? 'text-white' : ''"
    >
      {{ title }}
    </h1>
  </div>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div class="table-responsive">
      <loading
        :is-full-page="false"
        :opacity="0.9"
        :active="isLoading"
      ></loading>
      <base-table
        class="table align-items-center table-hover list-table"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="tableData"
      >
        <template v-slot:columns>
          <th class="tableHeader txHeader" style="text-align: left">
            {{ $t("transactionList.transactionId") }}
          </th>
          <th class="tableHeader shortHidden txHeader" style="text-align: left">
            {{ $t("transactionList.blockHeight") }}
          </th>
          <th class="tableHeader txHeader" style="text-align: left">
            {{ $t("transactionList.size") }}
          </th>
          <th class="tableHeader txHeader" style="text-align: left">
            {{ $t("transactionList.time") }}
            <el-button
              type="info"
              :plain="true"
              size="small"
              style="height: 19px; margin-left: 4px"
              @click="switchTime(time)"
            >
              Format</el-button
            >
          </th>
          <th class="tableHeader txHeader" style="text-align: right">
            {{ $t("transactionList.gasConsumed") }}
          </th>
        </template>

        <template v-slot:default="row">
          <td class="id txHeader" style="text-align: left">
            <div class="short" style="text-align: left">
              <router-link
                class="table-list-item-blue mb-0"
                style="cursor: pointer"
                :to="'/transactionInfo/' + row.item.hash"
                >{{ row.item.hash }}</router-link
              >
            </div>
          </td>
          <td class="id shortHidden txHeader" style="text-align: left">
            <router-link
              class="table-list-item-blue mb-0"
              style="cursor: pointer"
              :to="'/blockinfo/' + row.item.blockhash"
              >{{ row.item.blockIndex }}</router-link
            >
          </td>
          <td class="table-list-item txHeader" style="text-align: left">
            {{ row.item.size }} {{ $t("bytes") }}
          </td>
          <td class="table-list-item txHeader" style="text-align: left">
            {{
              time.state
                ? this.convertTime(row.item.blocktime, this.$i18n.locale)
                : this.convertISOTime(row.item.blocktime)
            }}
          </td>

          <td class="table-list-item txHeader" style="text-align: right">
            {{ this.convertGas(row.item.netfee + row.item.sysfee) }}
          </td>
        </template>
      </base-table>
    </div>

    <div
      v-if="this.totalCount > 10"
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
import {
  convertGas,
  convertTime,
  convertISOTime,
  switchTime,
} from "../../store/util";
import net from "../../store/store";
export default {
  name: "transactions-table",
  props: {
    type: {
      type: String,
    },
    title: String,
  },
  components: {
    Loading,
  },
  data() {
    return {
      time: { state: true },
      network: net.url,
      tableData: [],
      totalCount: 0,
      resultsPerPage: 10,
      pagination: this.$route.params.page,
      placeHolder: 0,
      isLoading: true,
      countPage: 0,
      currentPage4: 4,
      windowWidth: window.innerWidth,
    };
  },

  created() {
    window.scroll(0, 0);
    this.getTransactionList((this.pagination - 1) * this.resultsPerPage);
    // console.log(this.net)
  },
  watch: {
    $route: "watchrouter",
  },
  methods: {
    convertISOTime,
    convertGas,
    convertTime,
    switchTime,
    handleCurrentChange(val) {
      this.isLoading = true;
      this.pagination = val;
      this.$router.push({
        path: `/Transactions/${this.pagination}`,
      });
    },
    watchrouter() {
      //如果路由有变化，执行的对应的动作
      // console.log(this.$route.name)
      if (this.$route.name === "transactions") {
        this.pagination = this.$route.params.page;
        this.getTransactionList((this.pagination - 1) * this.resultsPerPage);
      }
    },
    getTransaction(txhash) {
      this.$router.push({
        path: `/transactionInfo/${txhash}`,
      });
    },
    changeNet() {
      this.getTransactionList(0);
    },

    getBlock(blochash) {
      this.$router.push({
        path: `/blockinfo/${blochash}`,
      });
    },

    getTransactionList(skip) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { Limit: this.resultsPerPage, Skip: skip },
          method: "GetTransactionList",
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
      });
    },
  },
};
</script>
<style>
.id {
  width: 200px !important;
  white-space: nowrap;
  overflow: hidden;
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
.transaction-table-title {
  font-family: Inter;
  font-style: normal;
  font-weight: bold !important;
  font-size: 45px !important;
  line-height: 58px;
  text-align: center;
  /* identical to box height */
  color: black;
}
.txHeader {
  padding-left: 0.5rem !important;
  padding-right: 0.5rem !important;
}
</style>
