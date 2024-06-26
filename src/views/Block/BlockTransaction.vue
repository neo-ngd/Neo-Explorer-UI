<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div class="table-responsive">
      <loading
        :is-full-page="false"
        :opacity="0.9"
        :active="isLoading"
      ></loading>
      <base-table
        class="table align-items-center table-hover"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="tableData"
      >
        <template v-slot:columns>
          <th class="tableHeader">{{ $t("blockinfo.txTable.txID") }}</th>
          <th class="tableHeader">{{ $t("blockinfo.txTable.height") }}</th>
          <th class="tableHeader">{{ $t("blockinfo.txTable.size") }}</th>
          <th class="tableHeader">
            {{ $t("blockinfo.txTable.time") }}
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
          <th class="tableHeader" style="text-align: right">
            {{ $t("blockinfo.txTable.gas") }}
          </th>
        </template>

        <template v-slot:default="row">
          <td>
            <div class="txid short">
              <router-link
                class="table-list-item-blue mb-0"
                style="cursor: pointer"
                :to="'/transactionInfo/' + row.item.hash"
                >{{ row.item.hash }}</router-link
              >
            </div>
          </td>
          <td class="table-list-item-blue">
            {{ row.item.blockIndex }}
          </td>
          <td class="table-list-item">{{ row.item.size }} bytes</td>
          <td class="table-list-item">
            {{
              time.state
                ? this.convertTime(row.item.blocktime, this.$i18n.locale)
                : this.convertISOTime(row.item.blocktime)
            }}
          </td>

          <td class="table-list-item" style="text-align: right">
            {{ convertGas(row.item.netfee + row.item.sysfee) }}
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
        small="true"
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
  convertTime,
  convertGas,
  convertISOTime,
  switchTime,
} from "../../store/util";
import net from "../../store/store";

export default {
  name: "block-transaction",
  props: {
    type: {
      type: String,
    },
    title: String,
    blockHash: String,
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
      pagination: 1,
      placeHolder: 0,
      isLoading: true,
      countPage: 0,
      windowWidth: window.innerWidth,
    };
  },
  created() {
    this.getTransactionList(0);
  },
  watch: {
    blockHash: "watchBlockHash",
  },
  methods: {
    convertGas,
    convertTime,
    convertISOTime,
    switchTime,
    watchBlockHash() {
      this.getTransactionList(0);
    },
    getTransaction(txhash) {
      this.$router.push({
        path: `/transactionInfo/${txhash}`,
      });
    },
    handleCurrentChange(val) {
      this.isLoading = true;
      this.pagination = val;
      const skip = (val - 1) * this.resultsPerPage;
      this.getTransactionList(skip);
    },
    getTransactionList(skip) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: {
            BlockHash: this.blockHash,
            Limit: this.resultsPerPage,
            Skip: skip,
          },
          method: "GetRawTransactionByBlockHash",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.tableData = res["data"]["result"]["result"];
        this.totalCount = res["data"]["result"]["totalCount"];
        this.countPage =
          this.totalCount === 0
            ? 1
            : Math.ceil(this.totalCount / this.resultsPerPage);
        this.isLoading = false;
      });
    },
  },
};
</script>

<style scoped></style>
