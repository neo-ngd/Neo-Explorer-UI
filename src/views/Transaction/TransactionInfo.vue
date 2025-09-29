<template>
  <div>
    <div class="container-fluid mt--8" style="background-color: #f7f8fa">
      <div class="row">
        <div class="col">
          <div class="top">
            <loading
              :is-full-page="false"
              :opacity="0.9"
              :active="isLoading"
            ></loading>
            <div class="bat">
              <div
                class="row mt-3 mb-5 title1 shortTitle"
                style="font-size: 36px; height: 100px; align-items: end"
              >
                {{ $t("transactionInfo.txId") }}
              </div>
              <div class="row mt-3 mb-3 title2 shortTitle">
                {{ $t("overview") }}
              </div>
            </div>
            <card shadow class="card-style list">
              <div class="row info mt-3 mb-1">
                <div class="col-md-3 lable-title">
                  {{ $t("transactionInfo.txId") }}
                </div>
                <div class="col-md-9 context-black">
                  <span id="tx">{{ this.tabledata["hash"] }}</span>
                  <span> </span>
                  <i
                    class="ni ni-single-copy-04"
                    id="txButton"
                    title="Copy to Clipboard"
                    style="padding-left: 5px; color: grey; cursor: pointer"
                    @click="copyItem('tx', 'txButton', 'txSpan')"
                  ></i>
                  <span style="color: #42b983" id="txSpan"></span>
                </div>
              </div>

              <div class="row info mt-3 mb-1">
                <div class="col-md-3 lable-title">
                  {{ $t("transactionInfo.time") }}
                </div>
                <div class="col-md-9 context-black">
                  {{ convertPreciseTime(this.blocktime) }}
                </div>
              </div>

              <div class="row info mt-3 mb-1">
                <div class="col-md-3 lable-title">
                  {{ $t("transactionInfo.blockHeight") }}
                </div>
                <div class="col-md-9 context-black">
                  <router-link
                    class="name mb-0"
                    style="cursor: pointer"
                    :to="'/blockinfo/' + this.blockhash"
                  >
                    {{ this.tabledata["blockIndex"] }}
                  </router-link>
                </div>
              </div>

              <div class="row info mt-3 mb-1">
                <div class="col-md-3 lable-title">
                  {{ $t("transactionInfo.size") }}
                </div>
                <div class="col-md-9 context-black">
                  {{ this.tabledata["size"] }} {{ $t("bytes") }}
                </div>
              </div>

              <div class="row info mt-3 mb-1">
                <div class="col-md-3 lable-title">
                  {{ $t("transactionInfo.version") }}
                </div>
                <div class="col-md-9 context-black">
                  {{ this.tabledata["version"] }}
                </div>
              </div>

              <div class="row info mt-3 mb-1">
                <div class="col-md-3 lable-title">
                  {{ $t("transactionInfo.blockHash") }}
                </div>
                <div class="col-md-9 context-black">
                  <span id="block">{{ this.blockhash }}</span>
                  <i
                    class="ni ni-single-copy-04"
                    id="blockButton"
                    title="Copy to Clipboard"
                    style="padding-left: 5px; color: grey; cursor: pointer"
                    @click="copyItem('block', 'blockButton', 'blockSpan')"
                  ></i>
                  <span style="color: #42b983" id="blockSpan"></span>
                </div>
              </div>

              <div class="row info mt-3 mb-1">
                <div class="col-md-3 lable-title">
                  {{ $t("transactionInfo.sender") }}
                  <el-button
                    type="info"
                    :plain="true"
                    size="small"
                    style="height: 21px; margin-left: 6px"
                    @click="changeFormat(button)"
                  >
                    {{ this.button.buttonName }}</el-button
                  >
                </div>

                <div class="col-md-9 context-black">
                  <router-link
                    class="name mb-0"
                    id="sender"
                    style="cursor: pointer"
                    :to="'/accountprofile/' + addressToScriptHash(this.address)"
                  >
                    {{
                      this.button.state === true
                        ? this.address
                        : addressToScriptHash(this.address)
                    }}
                  </router-link>
                  <span
                    style="
                      display: -moz-inline-box;
                      display: inline-block;
                      width: 80px !important;
                      vertical-align: center;
                    "
                  >
                    <i
                      class="ni ni-single-copy-04"
                      id="senderButton"
                      title="Copy to Clipboard"
                      style="padding-left: 5px; color: grey; cursor: pointer"
                      @click="copyItem('sender', 'senderButton', 'senderSpan')"
                    ></i>
                    <span style="color: #42b983" id="senderSpan"></span>
                  </span>
                </div>
              </div>

              <div class="row info mt-3 mb-1">
                <div class="col-md-3 lable-title">
                  {{ $t("transactionInfo.netFee") }}
                </div>
                <div class="col-md-9 context-black">
                  {{ convertGas(this.tabledata["netfee"]) }} GAS
                </div>
              </div>

              <div class="row info mt-3 mb-1">
                <div class="col-md-3 lable-title">
                  {{ $t("transactionInfo.sysFee") }}
                </div>
                <div class="col-md-9 context-black">
                  {{ convertGas(this.tabledata["sysfee"]) }} GAS
                </div>
              </div>

              <div class="row info mt-3 mb-1">
                <div class="col-md-3 lable-title">
                  {{ $t("transactionInfo.vmState") }}
                  <el-tooltip :content="this.vmStateTooltip" placement="right">
                    <i class="el-icon-question" />
                  </el-tooltip>
                </div>
                <div class="col-md-9 context-black">
                  {{ this.vmstate }}
                </div>
              </div>

              <div class="row info mt-3 mb-1">
                <div class="col-md-3 lable-title">
                  {{ $t("transactionInfo.trigger") }}
                </div>
                <div class="col-md-9 context-black">
                  {{ this.trigger }}
                </div>
              </div>

              <div class="row info mt-3 mb-4">
                <div class="col-md-3 lable-title">
                  {{ $t("transactionInfo.exception") }}
                  <el-tooltip
                    :content="this.exceptionToolTip"
                    placement="right"
                  >
                    <i class="el-icon-question" />
                  </el-tooltip>
                </div>
                <div class="col-md-9 exception context-black">
                  <el-tag
                    color="#00B42A"
                    v-if="this.exception === null"
                    type="success"
                    size="small"
                  >
                    <span style="color: white">No exception</span>
                  </el-tag>
                  <div v-else style="max-width: 95%">
                    {{ this.exception }}
                  </div>
                </div>
              </div>
            </card>
            <div class="row mt-2 mb-2"></div>

            <div class="row mt-3 mb-3 title2 list">
              {{ $t("transactionInfo.nep17") }}
            </div>
            <div class="card-style list">
              <transfers-list
                :title="$t('transactionInfo.nep17')"
                :txhash="this.txhash"
              ></transfers-list>
            </div>

            <div class="row mt-3 mb-3 title2 list">
              {{ $t("transactionInfo.nep11") }}
            </div>
            <div class="card-style list">
              <nft-table
                :title="$t('transactionInfo.nep11')"
                :txhash="this.txhash"
              ></nft-table>
            </div>
            <div class="row mt-4 mb-3"></div>
            <el-tabs
              type="card"
              class="list"
              v-model="activeName"
              style="width: 80%; margin-left: 10%; background-color: #f7f8fa"
            >
              <!--              <el-tab-pane :label="$t('transactionInfo.nep17')" name="first">-->
              <!--                <transfers-list-->
              <!--                    :title="$t('transactionInfo.nep17')"-->
              <!--                    :txhash="this.txhash"-->
              <!--                ></transfers-list>-->
              <!--              </el-tab-pane>-->
              <!--              <el-tab-pane :label="$t('transactionInfo.nep11')" name="second">-->
              <!--                <nft-table-->
              <!--                    :title="$t('transactionInfo.nep11')"-->
              <!--                    :txhash="this.txhash"-->
              <!--                ></nft-table>-->
              <!--              </el-tab-pane>-->
              <el-tab-pane
                :label="$t('transactionInfo.notification')"
                name="first"
              >
                <div
                  class="notificationDiv"
                  v-if="
                    this.tabledataApp['notifications'] &&
                    this.tabledataApp['notifications'].length != 0
                  "
                >
                  <div v-if="this.countApp === 0">
                    <card
                      shadow
                      v-for="(item, index) in this.tabledataApp[
                        'notifications'
                      ]"
                      :key="index"
                    >
                      <div style="line-height: 28px">
                        <div>
                          <div class="text-muted-left">
                            {{ $t("transactionInfo.eventName") }}
                          </div>
                          <div class="text-muted-right">
                            {{ item["eventname"] }}
                          </div>
                        </div>
                        <div>
                          <div class="text-muted-left">
                            {{ $t("transactionInfo.vmState") }}
                          </div>
                          <div class="text-muted-right">
                            {{ item["Vmstate"] }}
                          </div>
                        </div>
                        <div>
                          <div class="text-muted-left">
                            {{ $t("transactionInfo.contract") }}
                          </div>
                          <div class="text-muted-right">
                            <router-link
                              class="name mb-0 text-sm"
                              style="cursor: pointer"
                              :to="'/contractinfo/' + item['contract']"
                            >
                              {{ item["contract"] }}
                            </router-link>
                          </div>
                        </div>
                        <div>
                          <div class="params">
                            <div class="text-muted-left">
                              {{ $t("transactionInfo.State") }}
                            </div>
                            <div
                              class="text-muted-right"
                              v-if="item['state'].length !== 0"
                            >
                              <span
                                style="line-height: 28px"
                                v-for="(param, ind) in item['state']['value']"
                                :key="ind"
                              >
                                <span
                                  v-if="
                                    this.mapTotalApp.get(item['contract']) &&
                                    this.mapTotalApp
                                      .get(item['contract'])
                                      .get(item['eventname']) &&
                                    this.mapTotalApp
                                      .get(item['contract'])
                                      .get(item['eventname'])[ind] === 'Hash160'
                                  "
                                >
                                  <span class="text-muted"
                                    >{{ param["type"] }}-</span
                                  >
                                  <span>
                                    {{
                                      param["value"] === null
                                        ? "Null"
                                        : base64ToHash(param["value"])
                                    }}
                                  </span>
                                  <br />
                                </span>
                                <span
                                  v-else-if="
                                    this.mapTotalApp.get(item['contract']) &&
                                    this.mapTotalApp
                                      .get(item['contract'])
                                      .get(item['eventname']) &&
                                    this.mapTotalApp
                                      .get(item['contract'])
                                      .get(item['eventname'])[ind] === 'String'
                                  "
                                >
                                  <span class="text-muted"
                                    >{{ param["type"] }}-</span
                                  >
                                  <span>
                                    {{
                                      param["value"] === null
                                        ? "Null"
                                        : base64ToString(param["value"])
                                    }}</span
                                  >
                                  <br />
                                </span>
                                <span
                                  v-else-if="
                                    this.mapTotalApp.get(item['contract']) &&
                                    this.mapTotalApp
                                      .get(item['contract'])
                                      .get(item['eventname']) &&
                                    this.mapTotalApp
                                      .get(item['contract'])
                                      .get(item['eventname'])[ind] === 'Array'
                                  "
                                >
                                  <span class="v-else-if">
                                    {{ param["type"] }} -
                                  </span>
                                  <span>
                                    {{
                                      param["value"] === null
                                        ? "Null"
                                        : base64ToByteArray(param["value"])
                                    }}
                                  </span>
                                  <br />
                                </span>
                                <span
                                  v-else-if="
                                    this.mapTotalApp.get(item['contract']) &&
                                    this.mapTotalApp
                                      .get(item['contract'])
                                      .get(item['eventname']) &&
                                    this.mapTotalApp
                                      .get(item['contract'])
                                      .get(item['eventname'])[ind] ===
                                      'ByteArray'
                                  "
                                >
                                  <span class="text-muted"
                                    >{{ param["type"] }}-</span
                                  >
                                  <span>
                                    {{
                                      param["value"] === null
                                        ? "Null"
                                        : base64ToByteArray(param["value"])
                                    }}</span
                                  >
                                  <br />
                                </span>
                                <span v-else>
                                  <span class="text-muted"
                                    >{{ param["type"] }}-</span
                                  >
                                  {{ param["value"] }}
                                  <br />
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </card>
                  </div>
                  <div v-else>
                    <span
                      >Some contract does not exist in the database(To do)</span
                    >
                  </div>
                </div>

                <card shadow v-else class="text-center">
                  {{ $t("transactionInfo.eventnull") }}
                </card>
              </el-tab-pane>
              <el-tab-pane
                :label="$t('transactionInfo.systemCall')"
                name="second"
              >
                <div
                  class="systemCallDiv"
                  v-if="this.tabledataCall && this.tabledataCall.length !== 0"
                >
                  <div v-if="this.countSys === 0">
                    <card
                      shadow
                      v-for="(item, index) in this.tabledataCall['result']"
                      :key="index"
                    >
                      <div style="line-height: 28px">
                        <div>
                          <div class="text-muted-left">
                            {{ $t("transactionInfo.method") }}
                          </div>
                          <div class="text-muted-right">
                            {{ item["method"] }}
                          </div>
                        </div>
                        <div>
                          <div class="text-muted-left">
                            {{ $t("transactionInfo.originSender") }}
                          </div>
                          <div class="text-muted-right">
                            <router-link
                              class="name mb-0 text-sm"
                              style="cursor: pointer"
                              :to="'/accountprofile/' + item['originSender']"
                            >
                              {{ item["originSender"] }}
                            </router-link>
                          </div>
                        </div>
                        <div>
                          <div class="text-muted-left">
                            {{ $t("transactionInfo.contract") }}
                          </div>
                          <div class="text-muted-right">
                            <router-link
                              class="name mb-0 text-sm"
                              style="cursor: pointer"
                              :to="'/contractinfo/' + item['contractHash']"
                            >
                              {{ item["contractHash"] }}
                            </router-link>
                          </div>
                        </div>
                        <div>
                          <div class="text-muted-left">
                            {{ $t("transactionInfo.callFlags") }}
                          </div>
                          <div class="text-muted-right">
                            {{ item["callFlags"] }}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div>
                          <div class="text-muted-left">
                            {{ $t("transactionInfo.params") }}
                          </div>
                          <div
                            class="text-muted-right"
                            v-if="List[index] && List[index]['key']"
                          >
                            <span
                              style="line-height: 28px"
                              v-for="(param, ind) in item['hexStringParams']"
                              :key="ind"
                            >
                              <span
                                v-if="
                                  List[index]['key'][ind] &&
                                  List[index]['key'][ind]['type'] === 'Hash160'
                                "
                              >
                                <span class="text-muted"
                                  >{{ List[index]["key"][ind]["name"] }}-</span
                                >
                                {{
                                  param === "" ? "null" : this.hexToHash(param)
                                }}
                                <br />
                              </span>
                              <span
                                v-else-if="
                                  List[index] &&
                                  List[index]['key'] &&
                                  List[index]['key'][ind] &&
                                  List[index]['key'][ind]['type'] === 'String'
                                "
                              >
                                <span class="text-muted"
                                  >{{ List[index]["key"][ind]["name"] }}-</span
                                >
                                {{
                                  param === ""
                                    ? "null"
                                    : this.hexToString(param)
                                }}
                                <br />
                              </span>
                              <span
                                v-else-if="
                                  List[index] &&
                                  List[index]['key'] &&
                                  List[index]['key'][ind] &&
                                  List[index]['key'][ind]['type'] === 'Integer'
                                "
                              >
                                <span class="text-muted"
                                  >{{ List[index]["key"][ind]["name"] }}-</span
                                >
                                {{
                                  param === ""
                                    ? "null"
                                    : this.hexToInteger(param)
                                }}
                                <br />
                              </span>
                              <span v-else>
                                <span
                                  class="text-muted"
                                  v-if="
                                    List[index] &&
                                    List[index]['key'] &&
                                    List[index]['key'][ind]
                                  "
                                  >{{ List[index]["key"][ind]["name"] }}-</span
                                >
                                {{ param === "" ? "null" : param }}
                                <br />
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </card>
                  </div>
                </div>
                <card shadow v-else class="text-center">
                  {{ $t("transactionInfo.syscallnull") }}
                </card>
              </el-tab-pane>
              <el-tab-pane :label="$t('transactionInfo.askAI')" name="third">
                <div v-if="askAILoading" class="text-center askAI-loading">
                  <loading
                    :is-full-page="false"
                    :opacity="0.9"
                    :active="askAILoading"
                    loader="spinner"
                    width="30"
                    height="30"
                  ></loading>
                </div>
                <card shadow v-else-if="tabledataAskAI">
                  <div
                    v-html="formatAIResponse(tabledataAskAI)"
                    class="askAI-result"
                  ></div>
                </card>
                <card shadow v-else class="text-center">
                  {{ $t("transactionInfo.askAInull") }}
                </card>
              </el-tab-pane>
            </el-tabs>

            <div class="row mt-5 mb-3 title2 list">
              {{ $t("transactionInfo.signers") }}
            </div>
            <card shadow class="card-style list" v-if="this.tabledata.signers">
              <el-collapse v-model="activeSignersNames" style="border: white">
                <el-collapse-item
                  :title="$t('transactionInfo.account')"
                  name="0"
                  class="text-title3"
                >
                  <div
                    class="ml-4"
                    v-for="(item, index) in this.tabledata['signers']"
                    :key="index"
                    style="margin-left: 5% !important"
                  >
                    {{ item["account"] }}
                  </div>
                </el-collapse-item>
                <el-collapse-item
                  :title="$t('transactionInfo.scopes')"
                  name="1"
                >
                  <div
                    class="ml-4"
                    v-for="(item, index) in this.tabledata['signers']"
                    :key="index"
                    style="margin-left: 5% !important"
                  >
                    {{ item["scopes"] }}
                  </div>
                </el-collapse-item>
              </el-collapse>
            </card>

            <div class="row mt-4 mb-3 title2 list">
              {{ $t("transactionInfo.witness") }}
            </div>
            <card shadow class="card-style list" v-if="tabledata.witnesses">
              <el-collapse v-model="activeWitnessesNames" style="border: white">
                <el-collapse-item
                  :title="$t('transactionInfo.invocation')"
                  name="0"
                  class="itemCollapse"
                >
                  <div
                    class="ml-4"
                    v-for="(item, index) in this.tabledata['witnesses']"
                    :key="index"
                    style="margin-left: 5% !important"
                  >
                    <span v-html="item['invocation']"> </span>
                  </div>
                </el-collapse-item>
                <el-collapse-item
                  :title="$t('transactionInfo.verification')"
                  name="1"
                >
                  <div
                    class="ml-4"
                    v-for="(item, index) in this.tabledata['witnesses']"
                    :key="index"
                    style="margin-left: 5% !important"
                  >
                    <span v-html="item['verification']"></span>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </card>
            <div class="row mt-4 mb-3 title2 list">
              {{ $t("transactionInfo.script") }}
            </div>
            <card shadow class="card-style list">
              <el-collapse v-model="activeScriptsNames" style="border: white">
                <el-collapse-item
                  :title="$t('transactionInfo.script')"
                  name="0"
                  class="item-collapse"
                >
                  <div
                    class="ml-4"
                    v-html="this.tabledata['script']"
                    style="margin-left: 5% !important"
                  ></div>
                </el-collapse-item>
              </el-collapse>
            </card>
          </div>

          <div style="margin-top: 30px; margin-bottom: 20px"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import TransfersList from "./TransfersList";
import NftTable from "./NftTable";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Neon from "@cityofzion/neon-js";
import toOpcode from "../../directives/typeConvertion";
import {
  convertPreciseTime,
  changeFormat,
  convertGas,
  addressToScriptHash,
  copyItem,
} from "../../store/util";
import { AI_API, getRpcUrl } from "../../utils/env";
const { marked } = require("marked");
import net from "../../store/store";

export default {
  components: {
    TransfersList,
    NftTable,
    Loading,
  },
  data() {
    return {
      network: net.url,
      tabledata: [],
      tabledataApp: [],
      tabledataCall: [],
      tabledataAskAI: null,
      askAIRequested: false,
      askAILoading: true,
      askAIRequesting: false,
      tableEvent: [],
      txhash: "",
      isLoading: true,
      blockhash: "",
      address: "",
      button: { state: true, buttonName: "Hash" },
      blocktime: 0,
      vmstate: "",
      trigger: "",
      exception: "",
      method: "",
      originSender: "",
      callFlags: "",
      contractHash: "",
      manifest: "",
      params: "",
      index: 0,
      array: [],
      mapTotalApp: new Map(),
      mapTotalSys: new Map(),
      countApp: 0,
      countSys: 0,
      List: [],
      activeIndex: "1",
      whichIndex: 1,
      activeSignersNames: ["0", "1"],
      activeWitnessesNames: ["0", "1"],
      activeScriptsNames: ["0"],
      activeName: "first",
    };
  },
  created() {
    window.scroll(0, 0);
    this.txhash = this.$route.params.txhash;
    this.getTransactionByTransactionHash(this.$route.params.txhash);
    this.getScCallByTransactionHash(this.$route.params.txhash);
    this.getApplicationLogByTransactionHash(this.$route.params.txhash);
  },
  computed: {
    vmStateTooltip: function () {
      if (this.$i18n.locale === "en") {
        return "HALT means this transaction has no error, FAULT means this transcation has errors.";
      } else if (this.$i18n.locale === "cn") {
        return "HALT 表示这笔交易没有错误，FAULT表示这笔交易有错误";
      } else {
        return "HALT signifie que cette transaction n'a pas d'erreur, FAULT signifie que cette transaction a des erreurs.";
      }
    },
    exceptionToolTip: function () {
      if (this.$i18n.locale === "en") {
        return "NeoVm throws an exception when this transcation has errors.";
      } else if (this.$i18n.locale === "cn") {
        return "当这笔交易出现出现错误时，NeoVm虚拟机会抛出异常";
      } else {
        return "NeoVm lève une exception en cas d'erreur";
      }
    },
  },
  watch: {
    $route: "watchrouter",
    activeName: function (newVal) {
      if (newVal === "third" && !this.askAIRequested && !this.askAIRequesting) {
        this.getAskAIByTransactionHash(this.txhash);
      }
    },
  },
  methods: {
    addressToScriptHash,
    convertGas,
    convertPreciseTime,
    changeFormat,
    copyItem,
    handleSelect(key) {
      this.whichIndex = parseInt(key);
    },

    watchrouter() {
      //如果路由有变化，执行的对应的动作
      this.isLoading = true;
      if (this.$route.name === "transactionInfo") {
        // this.txhash = this.$route.params.txhash;
        //
        // this.getApplicationLogByTransactionHash(this.$route.params.txhash);
        // this.getTransactionByTransactionHash(this.$route.params.txhash);
        // this.getScCallByTransactionHash(this.$route.params.txhash);
        location.reload();
      }
    },
    convertTime(time) {
      var date = new Date(time);
      var y = date.getFullYear();
      var m =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var mi =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return (
        m + "-" + d + "-" + y + " " + h + ":" + mi + ":" + s + " +" + "UTC"
      );
      // var res = moment(parseInt(temp)).format('YYYY/MM/DD hh:mm:ss')
      // return res
    },

    base64ToHash(base) {
      var tmp = Neon.u.base642hex(base);
      var res = Neon.u.reverseHex(tmp);

      return "0x" + res;
    },
    base64ToString(base) {
      var tmp = Neon.u.base642hex(base);
      var res = Neon.u.hexstring2str(tmp);

      return res;
    },
    base64ToByteArray(base) {
      var tmp = Neon.u.base642hex(base);
      return tmp;
    },
    hexToByteArray(base) {
      var tmp = Neon.u.hexstring2ab(base);
      return tmp;
    },

    hexToString(base) {
      var tmp = Neon.u.hexstring2str(base);
      return tmp;
    },
    hexToHash(base) {
      var tmp = Neon.u.reverseHex(base);
      return "0x" + tmp;
    },
    hexToInteger(base) {
      var temp = Neon.u.reverseHex(base);
      var res = parseInt("0x" + temp, 16);
      return res;
    },

    goToBlockInfo(hash) {
      this.$router.push({
        path: `/blockinfo/${hash}`,
      });
    },
    goToContractInfo(ctr_hash) {
      this.$router.push({
        path: `/contractinfo/${ctr_hash}`,
      });
    },
    goToAddressInfo(addr) {
      this.$router.push({
        path: `/accountprofile/${addr}`,
      });
    },
    getApplicationLogByTransactionHash(tx_id) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { TransactionHash: tx_id },
          method: "GetApplicationLogByTransactionHash",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.isLoading = false;
        this.tabledataApp = res["data"]["result"];
        this.exception = this.tabledataApp["exception"];
        this.trigger = this.tabledataApp["trigger"];
        this.vmstate = this.tabledataApp["vmstate"];
        // console.log(this.tabledataApp)
        // console.log(this.tabledataApp["notifications"].length)
        for (var i = 0; i < this.tabledataApp["notifications"].length; i++) {
          this.getContractsApp(
            this.tabledataApp["notifications"][i]["contract"]
          );
        }
      });
    },
    getContractsApp(ctr_hash) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { ContractHash: ctr_hash },
          method: "GetContractByContractHash",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.isLoading = false;
        const raw = res["data"]["result"];
        if (raw == null) {
          this.countApp++;
        } else {
          var temp = JSON.parse(raw["manifest"]);
          // console.log(temp)
          var map = new Map();
          for (var i = 0; i < temp["abi"]["events"].length; i++) {
            var table = [];
            // console.log(temp["abi"]["events"].length)
            for (
              var j = 0;
              j < temp["abi"]["events"][i]["parameters"].length;
              j++
            ) {
              table[j] = temp["abi"]["events"][i]["parameters"][j]["type"];
            }
            map.set(temp["abi"]["events"][i]["name"], table);
          }
          this.mapTotalApp.set(raw["hash"], map);
          // console.log(this.mapTotalApp)
        }
      });
    },

    getTransactionByTransactionHash(tx_id) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { TransactionHash: tx_id },
          method: "GetRawTransactionByTransactionHash",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.tabledata = res["data"]["result"];

        this.blockhash = this.tabledata["blockhash"];
        this.address = this.tabledata["sender"];
        this.blocktime = this.tabledata["blocktime"];
        this.isLoading = false;
        // console.log(this.tabledata)

        this.convertScriptToOpcode();
      });
    },

    convertScriptToOpcode() {
      var script = toOpcode(this.tabledata["script"]);
      //this.tabledata["script"] = this.toOpcode(script)
      this.tabledata["script"] = script;
      var verification;
      var invocation;
      for (var i = 0; i < this.tabledata["witnesses"].length; i++) {
        verification = toOpcode(this.tabledata["witnesses"][i]["verification"]);
        this.tabledata["witnesses"][i]["verification"] = verification;
        invocation = toOpcode(this.tabledata["witnesses"][i]["invocation"]);
        this.tabledata["witnesses"][i]["invocation"] = invocation;
      }
    },
    getScCallByTransactionHash(tx_id) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { TransactionHash: tx_id },
          method: "GetScCallByTransactionHash",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.isLoading = false;
        if (res["data"]["result"]["totalCount"] !== 0) {
          this.tabledataCall = res["data"]["result"];
          for (var i = 0; i < this.tabledataCall["totalCount"]; i++) {
            this.getContractsSys(
              this.tabledataCall["result"][i]["contractHash"],
              this.tabledataCall["result"][i]["method"]
            );
          }
        }
      });
    },
    getContractsSys(ctr_hash, method) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { ContractHash: ctr_hash },
          method: "GetContractByContractHash",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.isLoading = false;
        const raw = res["data"]["result"];

        if (raw === null) {
          this.countSys++;
        } else {
          var temp = JSON.parse(raw["manifest"]);
          let json = {};
          for (var i = 0; i < temp["abi"]["methods"].length; i++) {
            if (temp["abi"]["methods"][i]["name"] === method) {
              json["contractHash"] = ctr_hash;
              json["method"] = method;
              json["key"] = temp["abi"]["methods"][i]["parameters"];
            }
          }
          this.List.push(json);
        }
        // console.log(this.List);
      });
    },
    getAskAIByTransactionHash(tx_id) {
      this.askAILoading = true;
      this.askAIRequesting = true; // Set requesting flag to prevent concurrent requests

      axios({
        method: "post",
        url: AI_API.BASE_URL,
        data: {
          method: AI_API.METHOD,
          params: [tx_id, getRpcUrl()],
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          this.askAILoading = false;
          this.askAIRequesting = false;
          this.askAIRequested = true; // Only set to true on success
          this.tabledataAskAI = res.data.data.explanation;
        })
        .catch((error) => {
          this.askAILoading = false;
          this.askAIRequesting = false; // Reset requesting flag on failure
          // Don't set askAIRequested to true on failure, allowing retry
          console.error("AI analysis request failed:", error);
          this.tabledataAskAI = null;
        });
    },
    formatAIResponse(text) {
      if (!text) return "";
      // Use marked to parse Markdown and convert to HTML
      return marked(text);
    },
  },
};
</script>

<style>
.exception {
  word-break: break-all;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 10;
}
.text-muted-left {
  display: inline-block;
  width: 50%;
  color: #86909c;
  vertical-align: top;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
}
.text-muted-right {
  width: 50%;
  display: inline-block;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
}
.text-muted {
  color: #86909c;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
}
.askAI-result {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #86909c;
}

.askAI-result h1,
.askAI-result h2,
.askAI-result h3,
.askAI-result h4,
.askAI-result h5,
.askAI-result h6 {
  color: #86909c;
  font-size: 14px !important;
  font-family: "Inter" !important;
  font-weight: 400 !important;
  line-height: 18px !important;
}

.askAI-result p {
  color: #86909c;
  font-size: 14px !important;
  font-family: "Inter" !important;
  font-weight: 400 !important;
  line-height: 18px !important;
}

.askAI-result ul,
.askAI-result ol,
.askAI-result li {
  font-size: 14px !important;
  font-family: "Inter" !important;
  font-weight: 400 !important;
  line-height: 18px !important;
  color: #86909c;
}

.askAI-result code {
  color: #e83e8c;
  background-color: #f8f9fa;
  padding: 2px 4px;
  border-radius: 3px;
  font-family: "Courier New", monospace;
}

.askAI-loading {
  padding: 20px 50px !important;
  min-height: 100px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

@media screen and (max-width: 790px) {
  .info {
    margin-top: 1.5rem !important;
    margin-bottom: 1.5rem !important;
  }
}
</style>
