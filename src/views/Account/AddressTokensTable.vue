<template>
  <div v-if="this.totalCount != 0">
    <div
      v-if="this.totalCount != 0"
      class="card shadow"
      :class="type === 'dark' ? 'bg-default' : ''"
    >
      <div class="table-responsive">
        <base-table
          class="table align-items-center table-hover"
          :class="type === 'dark' ? 'table-dark' : ''"
          :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
          tbody-classes="list"
          :data="tokenList"
        >
          <template v-slot:columns>
            <th class="tableHeader tableHeader-AddressToken">#</th>
            <th class="tableHeader tableHeader-AddressToken">
              {{ $t("tokensTable.name") }}
            </th>
            <th class="tableHeader tableHeader-AddressToken">
              {{ $t("hash") }}
            </th>
            <th class="tableHeader tableHeader-AddressToken">
              {{ $t("tokensTable.tokenId") }}
            </th>
            <th class="tableHeader tableHeader-AddressToken">
              {{ $t("tokensTable.nftName") }}
            </th>
            <th class="tableHeader tableHeader-AddressToken">
              {{ $t("tokensTable.symbol") }}
            </th>
            <th class="tableHeader tableHeader-AddressToken">
              {{ $t("tokensTable.standard") }}
            </th>
            <th
              class="tableHeader tableHeader-AddressToken tableHeader-AddressToken-right"
              style="text-align: right"
            >
              {{ $t("tokenHolder.balance") }}
            </th>
          </template>

          <template v-slot:default="row">
            <td class="tableContent-AddressToken">
              <el-image
                fit="contain"
                class="address-token-img"
                :src="getImage(row.item)"
                :preview-src-list="row.item.imageList"
                :hide-on-click-modal="true"
              >
                <template #error>
                  <div class="image-slot">
                    <!-- <i class="ni ni-image"> </i> -->
                    <el-image
                      :src="getImage(row.item)"
                      :hide-on-click-modal="true"
                    ></el-image>
                  </div>
                </template>
              </el-image>
            </td>
            <td class="table-list-item tableContent-AddressToken">
              {{ row.item.tokenname }}
            </td>
            <th
              scope="row"
              class="tableContent-AddressToken"
              style="text-align: left"
            >
              <div style="text-align: left">
                <div
                  v-if="row.item.standard === 'NEP11'"
                  class="media-body short"
                >
                  <router-link
                    class="mb-0 table-list-item-blue"
                    style="cursor: pointer"
                    :to="'/NFTtokeninfo/' + row.item.asset"
                    >{{ row.item.asset }}</router-link
                  >
                </div>
                <div v-else class="media-body short">
                  <router-link
                    class="mb-0 table-list-item-blue"
                    style="cursor: pointer"
                    :to="'/NEP17tokeninfo/' + row.item.asset"
                    >{{ row.item.asset }}</router-link
                  >
                </div>
              </div>
            </th>
            <td
              v-if="row.item.tokenid === ''"
              class="table-list-item tableContent-AddressToken"
            ></td>
            <td v-else class="table-list-item tableContent-AddressToken">
              <div class="short" style="text-align: left">
                <router-link
                  class="mb-0 table-list-item-blue"
                  style="cursor: pointer; text-align: left"
                  :to="
                    '/NFTinfo/' +
                    row.item.asset +
                    '/' +
                    this.account_address +
                    '/' +
                    base64ToHash(row.item.tokenid)
                  "
                  >{{ row.item.tokenid }}</router-link
                >
              </div>
            </td>
            <td class="table-list-item tableContent-AddressToken">
              {{ row.item.nftName }}
            </td>
            <td class="table-list-item tableContent-AddressToken">
              {{ row.item.symbol }}
            </td>
            <td>
              <el-tag v-if="row.item.standard === 'NEP17'">
                <span class="">{{ row.item.standard }}</span>
              </el-tag>
              <el-tag v-else class="badge-dot mr-4" type="success">
                <span class="">{{ row.item.standard }}</span>
              </el-tag>
            </td>
            <td
              class="table-list-item tableContent-AddressToken tableContent-AddressToken-right"
            >
              {{ convertToken(row.item.balance, row.item.decimals) }}
            </td>
          </template>
        </base-table>
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
    </div>
  </div>
  <card shadow v-else class="text-center">
    {{ $t("addressPage.tokennullPrompt") }}</card
  >
</template>
<script>
import axios from "axios";
import { convertToken } from "../../store/util";
import net from "../../store/store";
import Neon from "@cityofzion/neon-js";
import defaultNep11TokenImg from "@/assets/gui/defaultNep11.png";
import defaultNep17TokenImg from "@/assets/gui/defaultNep17.png";

export default {
  name: "address-tokens-table",
  props: {
    type: {
      type: String,
    },
    account_address: String,
  },
  data() {
    return {
      network: net.url,
      tokenList: [],
      totalCount: 0,
      resultsPerPage: 10,
      pagination: 1,
      address_list: [],
      windowWidth: window.innerWidth,
    };
  },
  created() {
    this.getTokenListWithBalance(0);
  },

  watch: {
    account_address: "watchaddress",
  },
  methods: {
    getImage(item) {
      if (item) {
        const asset = item.asset;
        const isNep11 = item.tokenid;
        const nftImg = item.image;
        const defaultIcon = isNep11
          ? defaultNep11TokenImg
          : defaultNep17TokenImg;
        try {
          if (isNep11) {
            return nftImg || require("@/assets/gui/" + asset + ".png");
          } else {
            return `https://neo.org/images/gui/${asset}.png`;
          }
        } catch (e) {
          return defaultIcon;
        }
      }
    },
    convertToken,
    watchaddress() {
      this.getTokenListWithBalance(0);
    },
    handleCurrentChange(val) {
      this.isLoading = true;
      this.pagination = val;
      const skip = (val - 1) * this.resultsPerPage;
      this.getTokenListWithBalance(skip);
    },
    base64ToHash(base) {
      var res = Neon.u.base642hex(base);

      return res;
    },
    getToken(hash) {
      this.$router.push(`/tokeninfo/${hash}`);
    },
    getTokenListWithBalance(skip) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: {
            Address: this.account_address,
            Limit: this.resultsPerPage,
            Skip: skip,
          },
          // TODO: 上线后改成GetAssetsHeldByAddress
          method: "GetAssetsHeldByAddress",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        let temp = res["data"]["result"]["result"];
        this.totalCount = res["data"]["result"]["totalCount"];
        this.countPage =
          this.totalCount === 0
            ? 1
            : Math.ceil(this.totalCount / this.resultsPerPage);
        let address_list = [];
        for (let j = 0; j < temp.length; j++) {
          address_list.push(temp[j]["asset"]);
        }
        this.tokenList = temp;
        for (let k = 0; k < temp.length; k++) {
          if (this.tokenList[k]["tokenid"] === "") {
            continue;
          }
          axios({
            method: "post",
            url: "/api",
            data: {
              jsonrpc: "2.0",
              id: 1,
              params: {
                ContractHash: this.tokenList[k]["asset"],
                tokenIds: [this.tokenList[k]["tokenid"]],
              },
              method: "GetNep11PropertiesByContractHashTokenId",
            },
            headers: {
              "Content-Type": "application/json",
              withCredentials: " true",
              crossDomain: "true",
            },
          }).then((res) => {
            this.isLoading = false;
            var value = res["data"]["result"]["result"][0];
            this.tokenList[k]["nftName"] = value["name"];
            this.tokenList[k]["image"] = value["image"].startsWith("ipfs")
              ? value["image"].replace(
                  /^(ipfs:\/\/)|^(ipfs-video:\/\/)/,
                  "https://ipfs.infura.io/ipfs/"
                )
              : value["image"];
            console.log(this.tokenList[k]["image"]);
            this.tokenList[k]["imageList"] = [this.tokenList[k]["image"]];
          });
        }
        this.getTokenInfo(address_list);
      });
    },
    getTokenInfo(address_list) {
      for (let k = 0; k < address_list.length; k++) {
        axios({
          method: "post",
          url: "/api",
          data: {
            jsonrpc: "2.0",
            id: 1,
            params: {
              ContractHash: address_list[k],
              Limit: this.resultsPerPage,
            },
            method: "GetAssetInfoByContractHash",
          },
          headers: {
            "Content-Type": "application/json",
            withCredentials: " true",
            crossDomain: "true",
          },
        }).then((res) => {
          this.tokenList[k]["tokenname"] = res["data"]["result"]["tokenname"];
          this.tokenList[k]["symbol"] = res["data"]["result"]["symbol"];
          this.tokenList[k]["standard"] = res["data"]["result"]["type"];
          this.tokenList[k]["decimals"] = res["data"]["result"]["decimals"];
        });
      }
    },
  },
};
</script>
<style>
.tableHeader-AddressToken,
.tableContent-AddressToken {
  text-align: left;
  padding-left: 0.5rem !important;
  padding-right: 0.5rem !important;
}
.tableHeader-AddressToken-right,
.tableContent-AddressToken-right {
  text-align: right;
  padding-left: 0.5rem !important;
  padding-right: 0.5rem !important;
}
.address-token-img {
  width: 60px;
  height: 60px;
}
</style>
