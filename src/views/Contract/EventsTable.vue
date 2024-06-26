<template>
  <div
    v-if="totalCount != 0"
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
        :data="contractList"
      >
        <template v-slot:columns>
          <th class="tableHeader">{{ $t("contract.txID") }}</th>
          <th class="tableHeader">{{ $t("contract.eventName") }}</th>
          <th class="tableHeader">{{ $t("contract.vmState") }}</th>
          <th class="tableHeader">{{ $t("contract.index") }}</th>
          <th class="tableHeader">
            {{ $t("contract.time") }}
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
              <div class="media-body short">
                <span
                  class="text-muted"
                  v-if="
                    row.item.txid ===
                    '0x0000000000000000000000000000000000000000000000000000000000000000'
                  "
                  >{{ $t("na") }}
                </span>
                <router-link
                  class="mb-0 table-list-item-blue"
                  v-else
                  style="cursor: pointer"
                  :to="'/transactionInfo/' + row.item.txid"
                  >{{ row.item.txid }}</router-link
                >
              </div>
            </div>
          </th>
          <td class="table-list-item">
            {{ row.item.eventname }}
          </td>
          <td class="table-list-item">
            {{ row.item.Vmstate }}
          </td>
          <td class="table-list-item">
            {{ row.item.index }}
          </td>
          <td class="table-list-item">
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
        :pager-count="5"
        layout="prev,pager,next"
        :total="totalCount"
      >
      </el-pagination>
    </div>
  </div>
  <card shadow v-else class="text-center">{{ $t("contract.noEvent") }}</card>
</template>
<script>
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { convertTime, convertISOTime, switchTime } from "../../store/util";
import net from "../../store/store";

export default {
  name: "events-table",
  props: {
    type: {
      type: String,
    },
    contractHash: String,
  },
  components: {
    Loading,
  },
  data() {
    return {
      time: { state: true },
      network: net.url,
      contractList: [],
      totalCount: 0,
      resultsPerPage: 10,
      pagination: 1,
      isLoading: true,
      countPage: 0,
      windowWidth: window.innerWidth,
    };
  },
  created() {
    this.getContractList(0);
  },
  methods: {
    convertISOTime,
    switchTime,
    convertTime,
    handleCurrentChange(val) {
      this.isLoading = true;
      this.pagination = val;
      const skip = (val - 1) * this.resultsPerPage;
      this.getContractList(skip);
    },
    getContract(hash) {
      this.$router.push(`/contractinfo/${hash}`);
    },
    getTransaction(txhash) {
      this.$router.push({
        path: `/transactionInfo/${txhash}`,
      });
    },
    getContractList(skip) {
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
          method: "GetNotificationByContractHash",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.contractList = res["data"]["result"]["result"];
        this.totalCount = res["data"]["result"]["totalCount"];
        this.countPage = Math.ceil(this.totalCount / this.resultsPerPage);
        this.isLoading = false;
      });
    },
  },
};
</script>
<style></style>
