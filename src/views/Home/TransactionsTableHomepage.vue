<template>
  <div>
    <div
      class="card-header border-0"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <div class="row align-items-center">
        <div class="col">
          <h3
            class="mb-0 hometxtitle"
            :class="type === 'dark' ? 'text-white' : ''"
          >
            {{ title }}
          </h3>
        </div>
        <div class="col text-right">
          <span class="seeMoreButton" @click="toTransactionsTable()"
            >{{ $t("homePage.more") }}
          </span>
        </div>
      </div>
    </div>
    <div class="card border-0" :class="type === 'dark' ? 'bg-default' : ''">
      <div class="table-responsive">
        <base-table
          class="table table-sm align-items-center table-hover hometablelist"
          :class="type === 'dark' ? 'table-dark' : ''"
          :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
          tbody-classes="list"
          :data="tableData"
        >
          <template v-slot:columns>
            <th class="hometabletx">{{ $t("homePage.txTable.txID") }}</th>
            <th class="hometabletx">{{ $t("homePage.txTable.gas") }}</th>
            <th class="hometabletx hometableright">
              {{ $t("homePage.txTable.size") }}
            </th>
            <th class="hometabletx hometableright">
              {{ $t("homePage.txTable.time") }}
            </th>
          </template>
          <template v-slot:default="row">
            <td class="hometxcontent">
              <div class="txidhomepage">
                <router-link
                  class="name mb-0"
                  style="cursor: pointer"
                  :to="'/transactionInfo/' + row.item.hash"
                  >{{ row.item.hash }}</router-link
                >
              </div>
            </td>
            <td class="hometxcontent">
              <div class="">
                {{ this.convertGas(row.item.netfee + row.item.sysfee) }} gas
              </div>
            </td>
            <td class="hometxcontent hometxcontentright">
              <div>{{ row.item.size }} {{ $t("bytes") }}</div>
            </td>
            <td class="hometxcontent hometxcontentright">
              <div>{{ convertTime(row.item.timestamp, $i18n.locale) }}</div>
            </td>
          </template>
        </base-table>
      </div>
    </div>
  </div>
</template>
<script>
import { convertGas, convertTime } from "../../store/util";
import net from "../../store/store";

export default {
  name: "transactions-table-homepage",
  props: {
    type: {
      type: String,
    },
    title: String,
    tableData: Object,
  },
  data() {
    return {
      network: net.url,
      totalCount: 0,
      resultsPerPage: 10,
      placeHolder: 0,
      isLoading: true,
    };
  },
  methods: {
    convertGas,
    convertTime,
    toTransactionsTable() {
      this.$router.push({
        path: `/Transactions/1`,
      });
    },
  },
};
</script>
<style>
.hometabletx {
  background-color: #ffffff !important;
  font-family: Inter !important;
  font-style: normal !important;
  font-weight: normal !important;
  font-size: 12px !important;
  line-height: 18px !important;
  text-transform: none !important;
  border-top: none !important;
  padding-top: 1.5em !important;
  padding-bottom: 1.5em !important;
  padding-right: 0.5em !important;
  padding-left: 0.5em !important;
  color: #86909c;
}
.hometableright {
  text-align: right;
}
.hometxtitle {
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  margin-right: 1%;
  margin-left: 1%;
  /* identical to box height, or 133% */

  /* grey900 */

  color: #1d2129;
}
.hometxcontent {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 30px;
  padding-top: 1.5em !important;
  padding-bottom: 1.5em !important;
  padding-right: 0.5em !important;
  padding-left: 0.5em !important;
  /* identical to box height, or 129% */

  /* grey900 */

  color: #1d2129;
}
.hometxcontentright {
  text-align: right;
}

@media screen and (max-width: 2000px) {
  .txidhomepage {
    width: 250px !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px !important;
  }
}
@media screen and (max-width: 1200px) {
  .txidhomepage {
    width: 150px !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px !important;
  }
}
</style>
