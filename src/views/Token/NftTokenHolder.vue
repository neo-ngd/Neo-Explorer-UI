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
        :data="NEP17TxList"
      >
        <template v-slot:columns>
          <th class="tableHeader">{{ $t("tokenHolder.ranking") }}</th>
          <th class="tableHeader">
            {{ $t("tokenHolder.address") }}
            <el-button
              type="info"
              :plain="true"
              size="small"
              style="height: 21px; margin-left: 4px"
              @click="changeFormat(button)"
            >
              {{ this.button.buttonName }}</el-button
            >
          </th>
          <th class="tableHeader">{{ $t("tokenHolder.balance") }}</th>
          <!--          <th>Last Transferred</th>-->
          <th class="tableHeader">{{ $t("tokenHolder.percentage") }}</th>
        </template>

        <template v-slot:default="row">
          <th scope="row">
            <div class="media align-items-center">
              <div class="media-body">
                <div
                  v-if="
                    row.index + (pagination - 1) * this.resultsPerPage === 0
                  "
                >
                  {{
                    row.index + (this.pagination - 1) * this.resultsPerPage + 1
                  }}
                  &#129351;
                </div>
                <div
                  v-else-if="
                    row.index + (pagination - 1) * this.resultsPerPage === 1
                  "
                >
                  {{
                    row.index + (this.pagination - 1) * this.resultsPerPage + 1
                  }}
                  &#129352;
                </div>
                <div
                  v-else-if="
                    row.index + (pagination - 1) * this.resultsPerPage === 2
                  "
                >
                  {{
                    row.index + (this.pagination - 1) * this.resultsPerPage + 1
                  }}
                  &#129353;
                </div>
                <div v-else>
                  {{ row.index + (pagination - 1) * this.resultsPerPage + 1 }}
                </div>
              </div>
            </div>
          </th>
          <td class="Address">
            <div class="short">
              <router-link
                v-if="button.state"
                class="mb-0 table-list-item-blue"
                style="cursor: pointer"
                :to="'/accountprofile/' + row.item.address"
                >{{ scriptHashToAddress(row.item.address) }}</router-link
              >
              <router-link
                v-else
                class="mb-0 table-list-item-blue"
                style="cursor: pointer"
                :to="'/accountprofile/' + row.item.address"
                >{{ row.item.address }}
              </router-link>
              <span
                v-if="
                  row.item.address ===
                  '0x0000000000000000000000000000000000000000'
                "
                >（Null Address)
              </span>
            </div>
          </td>
          <td class="table-list-item">
            {{ row.item.balance }}
          </td>
          <!--          <td class="firstused">-->
          <!--            {{ convertTime(row.item.lasttx.timestamp) }}-->
          <!--          </td>-->
          <td class="table-list-item">
            {{ toPercentage(row.item.percentage) }}
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
  convertToken,
  scriptHashToAddress,
  changeFormat,
} from "../../store/util";
import net from "../../store/store";

export default {
  name: "nft-token-holder",
  props: {
    type: {
      type: String,
    },
    contractHash: String,
    decimal: Number,
  },
  components: {
    Loading,
  },
  data() {
    return {
      network: net.url,
      NEP17TxList: [],
      totalCount: 0,
      resultsPerPage: 10,
      pagination: 1,
      isLoading: true,
      countPage: 0,
      button: { state: true, buttonName: "Hash" },
      windowWidth: window.innerWidth,
    };
  },
  created() {
    this.getTokenList(0);
  },
  watch: {
    contractHash: "watchcontract",
  },
  methods: {
    changeFormat,
    convertToken,
    scriptHashToAddress,
    watchcontract() {
      this.getTokenList(0);
    },
    handleCurrentChange(val) {
      this.isLoading = true;
      this.pagination = val;
      this.getTokenList((this.pagination - 1) * this.resultsPerPage);
    },
    toPercentage(num) {
      let s = Number(num * 100).toFixed(2);
      s += "%";
      return s;
    },
    getAddress(accountAddress) {
      this.$router.push({
        path: `/accountprofile/${accountAddress}`,
      });
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
            Limit: this.resultsPerPage,
            Skip: skip,
          },
          method: "GetAssetHoldersByContractHash",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.NEP17TxList = res["data"]["result"]["result"];
        console.log(this.NEP17TxList);
        this.totalCount = res["data"]["result"]["totalCount"];
        console.log(this.totalCount);
        this.countPage = Math.ceil(this.totalCount / this.resultsPerPage);
        this.isLoading = false;
      });
    },
  },
};
</script>
<style></style>
