<template>
  <div v-if="this.length != 0">
    <div
      v-if="this.length != 0"
      class="card"
      :class="type === 'dark' ? 'bg-default' : ''"
    >
      <!-- long screen -->
      <div class="devicelg" style="width: 100%">
        <div
          class="left-trans"
          style="
            width: 50%;
            background-color: white;
            border-radius: 10px;
            float: left;
          "
        >
          <div
            style="
              height: 60px;
              width: 100%;
              display: block;
              line-height: 60px;
              text-align: left;
              padding-left: 5%;
            "
          >
            {{ $t("transactionTransfer.from") }}
          </div>
          <div
            class="colorTable"
            v-for="(item, index) in this.tableData"
            :key="index"
            style="width: 100%"
          >
            <div
              class="table-list-item padding"
              v-if="item.from !== null"
              style="
                height: 80px;
                text-align: left;
                padding-top: 20px;
                padding-left: 5%;
              "
            >
              <span class="text-muted" v-if="item.from === null">
                {{ $t("nullAddress") }}</span
              >
              <router-link
                class="mb-0 table-list-item-blue padding-size"
                v-else
                style="cursor: pointer; color: #1fa2ff"
                :to="'/accountprofile/' + item.from"
                >{{ scriptHashToAddress(item.from) }}</router-link
              >
              <router-link
                class="table-list-item mt-2"
                style="text-align: center; cursor: pointer; color: #f53f3f"
                :to="'/contractinfo/' + item['contract']"
              >
                [{{ convertToken(item.value, item.decimals) }}
                <span v-if="item.symbol === 'NEO'" style="color: #f53f3f"
                  >NEO</span
                >
                <span v-else-if="item.symbol === 'GAS'" style="color: #f53f3f"
                  >GAS</span
                >
                <span v-else style="color: #f53f3f">{{ item.symbol }}</span
                >]
              </router-link>
            </div>
          </div>
        </div>
        <div
          class="right-trans"
          style="
            width: 50%;
            background-color: white;
            border-radius: 10px;
            float: right;
          "
        >
          <div
            style="
              height: 60px;
              width: 100%;
              display: block;
              line-height: 60px;
              text-align: left;
              padding-left: 5%;
            "
          >
            {{ $t("transactionTransfer.to") }}
          </div>
          <div
            class="colorTable"
            v-for="(item, index) in this.tableData"
            :key="index"
          >
            <div
              class="table-list-item padding"
              v-if="item.to !== null"
              style="
                height: 80px;
                text-align: left;
                padding-top: 20px;
                padding-left: 5%;
              "
            >
              <span class="text-muted" v-if="item.to === null">
                {{ $t("nullAddress") }}</span
              >
              <router-link
                v-else
                class="mb-0 table-list-item-blue padding-size"
                style="cursor: pointer; color: #1fa2ff"
                :to="'/accountprofile/' + item['to']"
              >
                {{ scriptHashToAddress(item["to"]) }}
              </router-link>
              <router-link
                class="table-list-item mt-2"
                style="text-align: center; cursor: pointer; color: #00b42a"
                :to="'/contractinfo/' + item['contract']"
              >
                [{{ convertToken(item.value, item.decimals) }}
                <span v-if="item.symbol === 'NEO'" style="color: #00b42a"
                  >NEO</span
                >
                <span v-else-if="item.symbol === 'GAS'" style="color: #00b42a"
                  >GAS</span
                >
                <span v-else>{{ item.symbol }}</span
                >]
              </router-link>
            </div>
            <div
              class="table-list-item padding"
              v-else
              style="
                height: 80px;
                text-align: center;
                padding-top: 20px;
                padding-left: 10%;
                padding-right: 10%;
              "
            ></div>
          </div>
        </div>
      </div>
      <!-- small screen -->
      <div
        class="devicesm"
        style="background-color: #f7f8fa; width: 100%; display: none"
      >
        <div
          style="
            width: 50%;
            background-color: white;
            border-radius: 10px;
            float: left;
          "
        >
          <div
            style="
              height: 60px;
              width: 100%;
              display: block;
              line-height: 60px;
              text-align: center;
            "
          >
            {{ $t("transactionTransfer.from") }}
          </div>
          <div
            class="colorTable"
            v-for="(item, index) in this.tableData"
            :key="index"
            style="width: 100%"
          >
            <div
              class="table-list-item"
              v-if="item.from !== null"
              style="
                height: 170px;
                text-align: center;
                padding-top: 26px;
                padding-left: 10%;
                padding-right: 10%;
              "
            >
              <span class="text-muted" v-if="item.from === null">
                {{ $t("nullAddress") }}</span
              >
              <router-link
                class="mb-0 table-list-item-blue padding-size"
                v-else
                style="cursor: pointer; color: #1fa2ff"
                :to="'/accountprofile/' + item.from"
                >{{ scriptHashToAddress(item.from) }}</router-link
              >
              <div
                class="table-list-item mt-2"
                style="text-align: center; color: #f53f3f"
              >
                [{{ convertToken(item.value, item.decimals) }}]
              </div>
              <router-link
                v-if="item.symbol === 'NEO'"
                style="color: #f53f3f; cursor: pointer"
                :to="'/contractinfo/' + item['contract']"
                >NEO</router-link
              >
              <router-link
                v-else-if="item.symbol === 'GAS'"
                style="color: #f53f3f; cursor: pointer"
                :to="'/contractinfo/' + item['contract']"
                >GAS</router-link
              >
              <router-link
                v-else
                style="cursor: pointer"
                :to="'/contractinfo/' + item['contract']"
                >{{ item.symbol }}</router-link
              >
            </div>
            <div
              v-else
              style="
                height: 170px;
                text-align: center;
                padding-left: 10%;
                padding-right: 10%;
                padding-top: 26px;
              "
            ></div>
          </div>
        </div>
        <div
          style="
            width: 50%;
            background-color: white;
            border-radius: 10px;
            float: right;
          "
        >
          <div
            style="
              height: 60px;
              width: 100%;
              display: block;
              line-height: 60px;
              text-align: center;
            "
          >
            {{ $t("transactionTransfer.to") }}
          </div>
          <div
            class="colorTable"
            v-for="(item, index) in this.tableData"
            :key="index"
          >
            <div
              class="table-list-item"
              v-if="item.to !== null"
              style="
                height: 170px;
                text-align: center;
                padding-left: 10%;
                padding-right: 10%;
                padding-top: 26px;
              "
            >
              <span class="text-muted" v-if="item.to === null">
                {{ $t("nullAddress") }}</span
              >
              <router-link
                v-else
                class="mb-0 table-list-item-blue padding-size"
                style="cursor: pointer; color: #1fa2ff"
                :to="'/accountprofile/' + item['to']"
              >
                {{ scriptHashToAddress(item["to"]) }}
              </router-link>
              <router-link
                class="table-list-item mt-2"
                style="
                  display: block;
                  text-align: center;
                  cursor: pointer;
                  color: #00b42a;
                "
                :to="'/contractinfo/' + item['contract']"
              >
                [{{ convertToken(item.value, item.decimals) }}]
              </router-link>
              <router-link
                v-if="item.symbol === 'NEO'"
                style="color: #00b42a; cursor: pointer"
                :to="'/contractinfo/' + item['contract']"
                >NEO</router-link
              >
              <router-link
                v-else-if="item.symbol === 'GAS'"
                style="color: #00b42a; cursor: pointer"
                :to="'/contractinfo/' + item['contract']"
                >GAS</router-link
              >
              <router-link
                v-else
                style="cursor: pointer"
                :to="'/contractinfo/' + item['contract']"
                >{{ item.symbol }}</router-link
              >
            </div>
            <div
              v-else
              style="
                height: 170px;
                text-align: center;
                padding-left: 10%;
                padding-right: 10%;
                padding-top: 26px;
              "
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <card shadow v-else class="text-center">
    {{ $t("transactionTransfer.nep17null") }}
  </card>
</template>
<script>
import axios from "axios";
import {
  changeFormat,
  convertToken,
  addressToScriptHash,
  scriptHashToAddress,
} from "../../store/util";
import net from "../../store/store";

export default {
  name: "transfers-list",
  props: {
    type: {
      type: String,
    },
    title: String,
    txhash: String,
  },
  data() {
    return {
      network: net.url,
      tableData: [],
      length,
      fromButton: { state: true, buttonName: "Hash" },
      toButton: { state: true, buttonName: "Hash" },
    };
  },
  created() {
    this.getNep17TransferByTransactionHash(this.txhash);
    // this.hasContent(this.length)
  },
  watch: {
    txhash: "watchtxhash",
  },
  methods: {
    changeFormat,
    convertToken,
    addressToScriptHash,
    scriptHashToAddress,
    watchtxhash() {
      //如果路由有变化，执行的对应的动作
      this.getNep17TransferByTransactionHash(this.txhash);
    },
    getContract(ctrHash) {
      this.$router.push({
        path: `/contractinfo/${ctrHash}`,
      });
    },
    getAccount(accHash) {
      this.$router.push({
        path: `/accountprofile/${accHash}`,
      });
    },
    getNep17TransferByTransactionHash(txhash) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { TransactionHash: txhash },
          method: "GetNep17TransferByTransactionHash",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.tableData = res["data"]["result"]["result"];
        // console.log(this.tableData)
        this.length = this.tableData["length"];
      });
    },
  },
};
</script>
<style>
.contract {
  width: 150px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.from {
  width: 150px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.to {
  width: 150px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.colorTable:nth-child(2n) {
  background-color: #f6f9fc;
}
@media screen and (max-width: 980px) {
  .padding {
    padding-top: 30px !important;
    height: 110px !important;
  }
  .padding-size {
    font-size: 13px;
  }
  .paddingArrow {
    height: 110px !important;
  }
}

@media screen and (max-width: 1300px) {
  .left-trans {
    width: 50% !important;
    border: none;
  }
  .right-trans {
    width: 50% !important;
    border: none;
  }
}
@media screen and (max-width: 650px) {
  .devicelg {
    display: none;
  }
  .devicesm {
    display: initial !important;
  }
}
</style>
