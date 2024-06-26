<template>
  <div
    v-if="this.totalCount != 0"
    class="card shadow"
    :class="type === 'dark' ? 'bg-default' : ''"
  >
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
        :data="NEP11TxList"
      >
        <template v-slot:columns>
          <th class="tableHeader tableHeader-transfers">
            {{ $t("tokenTx.txid") }}
          </th>
          <th class="tableHeader tableHeader-transfers">
            {{ $t("tokenTx.tokenID") }}
          </th>
          <th class="tableHeader tableHeader-transfers">
            {{ $t("tokenTx.from") }}
            <el-button
              type="info"
              :plain="true"
              size="small"
              style="height: 19px; margin-left: 4px"
              @click="changeFormat(fromButton)"
            >
              {{ fromButton.buttonName }}</el-button
            >
          </th>
          <th class="tableHeader tableHeader-transfers">
            {{ $t("tokenTx.amount") }}
          </th>
          <th class="tableHeader tableHeader-transfers">
            {{ $t("tokenTx.to") }}
            <el-button
              type="info"
              :plain="true"
              size="small"
              style="height: 19px; margin-left: 4px"
              @click="changeFormat(toButton)"
            >
              {{ toButton.buttonName }}</el-button
            >
          </th>

          <th
            class="tableHeader tableHeader-transfers"
            style="text-align: right"
          >
            {{ $t("tokenTx.time") }}
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
        </template>

        <template v-slot:default="row">
          <th scope="row">
            <div class="media align-items-center">
              <div class="media-body">
                <div
                  class="text-muted"
                  v-if="
                    row.item.txid ===
                    '0x0000000000000000000000000000000000000000000000000000000000000000'
                  "
                >
                  {{ $t("na") }}
                </div>
                <div class="txid" v-else>
                  <router-link
                    class="mb-0 table-list-item-blue"
                    style="cursor: pointer"
                    :to="'/transactionInfo/' + row.item.txid"
                    >{{ row.item.txid }}</router-link
                  >
                </div>
              </div>
            </div>
          </th>
          <td class="TokenID tableContent-transfers">
            <div class="table-list-item">
              {{ row.item.tokenId }}
            </div>
          </td>
          <td class="From tableContent-transfers">
            <div>
              <div class="text-muted" v-if="row.item.from === null">
                {{ $t("nullAddress") }}
              </div>
              <div v-else-if="fromButton.state" class="addr">
                <router-link
                  class="mb-0 table-list-item-blue"
                  style="cursor: pointer"
                  :to="'/accountprofile/' + row.item.from"
                  >{{ scriptHashToAddress(row.item.from) }}</router-link
                >
              </div>

              <div v-else class="addr">
                <router-link
                  class="mb-0 table-list-item-blue"
                  style="cursor: pointer"
                  :to="'/accountprofile/' + row.item.from"
                  >{{ row.item.from }}</router-link
                >
              </div>
            </div>
          </td>
          <td class="pt-4 tableContent-transfers">
            <div class="table-list-item mt-2" style="text-align: center">
              {{ convertToken(row.item.value, this.decimal) }}
            </div>
            <span style="color: #42b983; font-size: 30px">&#10230;</span>
            <div>
              <span
                class="text-success"
                v-if="row.item.from === null"
                type="primary"
                >{{ $t("mint") }}</span
              >
              <span class="text-danger" v-else-if="row.item.to === null">
                {{ $t("burn") }}
              </span>
              <span v-else style="color: seagreen"> {{ $t("transfer") }}</span>
            </div>
          </td>
          <td class="To tableContent-transfers">
            <div>
              <div class="text-muted" v-if="row.item.to === null">
                {{ $t("nullAddress") }}
              </div>
              <div class="addr" v-else-if="toButton.state">
                <router-link
                  class="mb-0 table-list-item-blue"
                  style="cursor: pointer"
                  :to="'/accountprofile/' + row.item.to"
                  >{{ scriptHashToAddress(row.item.to) }}</router-link
                >
              </div>
              <div class="addr" v-else>
                <router-link
                  class="mb-0 table-list-item-blue"
                  style="cursor: pointer"
                  :to="'/accountprofile/' + row.item.to"
                  >{{ row.item.to }}</router-link
                >
              </div>
            </div>
          </td>
          <td
            class="table-list-item tableContent-transfers"
            style="text-align: right"
          >
            {{
              time.state
                ? this.convertTime(row.item.timestamp, this.$i18n.locale)
                : this.convertISOTime(row.item.timestamp)
            }}
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
        :pager-count="4"
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
  convertToken,
  scriptHashToAddress,
  convertISOTime,
  switchTime,
  changeFormat,
  convertTime,
} from "../../store/util";
import net from "../../store/store";
import Neon from "@cityofzion/neon-js";

export default {
  name: "tokens-tx-nep11",
  props: {
    type: {
      type: String,
    },
    contractHash: String,
    decimal: Number,
    tokenId: String,
  },
  components: {
    Loading,
  },
  data() {
    return {
      time: { state: true },
      network: net.url,
      NEP11TxList: [],
      totalCount: 0,
      resultsPerPage: 10,
      pagination: 1,
      isLoading: true,
      firstTime: true,
      countPage: 0,
      fromButton: { state: true, buttonName: "Hash" },
      toButton: { state: true, buttonName: "Hash" },
      windowWidth: window.innerWidth,
    };
  },
  created() {
    // console.log(this.contractHash)
    // console.log(this.hashToBase64(this.tokenId))
    this.getTokenList(0);
  },

  watch: {
    contractHash: "watchcontract",
  },
  methods: {
    convertToken,
    convertISOTime,
    switchTime,
    scriptHashToAddress,
    changeFormat,
    convertTime,
    watchcontract() {
      //如果路由有变化，执行的对应的动作
      this.getTokenList(0);
    },
    handleCurrentChange(val) {
      this.isLoading = true;
      this.pagination = val;
      const skip = (val - 1) * this.resultsPerPage;
      this.getTokenList(skip);
    },
    hashToBase64(hash) {
      var res = Neon.u.hex2base64(hash);
      return res;
    },
    getTokenList(skip) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: {
            ContractHash: this.contractHash,
            tokenId: this.hashToBase64(this.tokenId),
            Limit: this.resultsPerPage,
            Skip: skip,
          },
          method: "GetNep11TransferByContractHashTokenId",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.NEP11TxList = res["data"]["result"]["result"];
        // console.log(this.NEP11TxList)
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
<style>
.txid {
  width: 200px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.addr {
  width: 150px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tableHeader-transfers,
.tableContent-transfers {
  text-align: left;
}
</style>
