<template>
  <div>
    <div class="col list-title list-style">
      <h1
        class="mb-0 block-table-title"
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
          :data="blockList"
        >
          <template v-slot:columns>
            <th class="tableHeader">{{ $t("blockinfo.height") }}</th>
            <th class="tableHeader shortHidden">{{ $t("blockinfo.hash") }}</th>
            <th class="tableHeader">
              {{ $t("blockinfo.time") }}
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
            <th class="tableHeader">
              {{ $t("blockinfo.txns") }}
            </th>
            <th class="tableHeader tableHeader-Right">
              {{ $t("blockinfo.size") }}
            </th>
          </template>

          <template v-slot:default="row">
            <td>
              <div class="table-list-item tableContent">
                <router-link
                  class="table-list-item-blue name mb-0"
                  style="cursor: pointer"
                  :to="'/blockinfo/' + row.item.hash"
                  >{{ row.item.index }}</router-link
                >
              </div>
            </td>
            <td class="shortHidden" style="text-align: center">
              <div class="tableContent tableContent-Hash">
                {{ row.item.hash }}
              </div>
            </td>
            <td class="table-list-item tableContent">
              {{
                time.state
                  ? this.convertTime(row.item.timestamp, this.$i18n.locale)
                  : this.convertISOTime(row.item.timestamp)
              }}
            </td>
            <td class="table-list-item tableContent">
              {{ row.item.transactioncount }}
            </td>
            <td class="table-list-item tableContent-Right">
              {{ row.item.size }} {{ $t("bytes") }}
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
    <div style="margin-top: 30px; margin-bottom: 20px"></div>
  </div>
</template>
<script>
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { convertTime, convertISOTime, switchTime } from "../../store/util";
import net from "../../store/store";
export default {
  name: "blocks-table",
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
      blockList: [],
      totalCount: 0,
      resultsPerPage: 10,
      pagination: this.$route.params.page,
      isLoading: true,
      placeHolder: 0,
      countPage: 0,
      windowWidth: window.innerWidth,
    };
  },
  created() {
    // console.log(this.pagination)
    this.getBlockList((this.pagination - 1) * this.resultsPerPage);
  },
  watch: {
    $route: "watchrouter",
  },
  methods: {
    convertTime,
    convertISOTime,
    switchTime,

    getBlock(hash) {
      this.$router.push(`/blockinfo/${hash}`);
    },
    handleCurrentChange(val) {
      this.isLoading = true;
      this.pagination = val;

      this.$router.push({
        path: `/blocks/${this.pagination}`,
      });
    },
    watchrouter() {
      //如果路由有变化，执行的对应的动作
      if (this.$route.name === "blocks") {
        this.pagination = this.$route.params.page;

        this.getBlockList((this.pagination - 1) * this.resultsPerPage);
      }
    },
    getBlockList(skip) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { Limit: this.resultsPerPage, Skip: skip },
          method: "GetBlockInfoList",
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        this.blockList = res["data"]["result"]["result"];
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
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
  -moz-appearance: textfield;
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
.block-table-title {
  font-family: Inter;
  font-style: normal;
  font-weight: bold !important;
  font-size: 45px !important;
  line-height: 58px;
  text-align: center;
  /* identical to box height */
  color: black;
}

.text {
  display: inline-block;
  height: 100%;
  line-height: 2.5;
  vertical-align: middle;
  font-size: 5px;
}

.tableHeader,
.tableContent {
  text-align: left;
}

.tableContent-Center,
.tableHeader-Center {
  text-align: center;
}

.tableHeader-Right,
.tableContent-Right {
  text-align: right;
}

@media screen and (max-width: 2000px) {
  .tableContent-Hash {
    width: 250px !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px !important;
  }
}
@media screen and (max-width: 1200px) {
  .tableContent-Hash {
    width: 150px !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px !important;
  }
}
</style>
