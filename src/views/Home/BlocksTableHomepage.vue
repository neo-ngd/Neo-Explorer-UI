<template>
  <div>
    <div
      class="card-header border-0"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <div class="row align-items-center">
        <div class="col">
          <h3
            class="mb-0 homeblocktitle"
            :class="type === 'dark' ? 'text-white' : ''"
          >
            {{ title }}
          </h3>
        </div>
        <div class="col text-right">
          <span class="seeMoreButton" @click="toBlocksTable()"
            >{{ $t("homePage.more") }}
          </span>
        </div>
      </div>
    </div>
    <div class="card border-0" :class="type === 'dark' ? 'bg-default' : ''">
      <div class="table-responsive">
        <base-table
          class="table table-sm table-hover hometablelist"
          :class="type === 'dark' ? 'table-dark' : ''"
          :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
          tbody-classes="list"
          :data="tableData"
        >
          <template v-slot:columns>
            <th class="hometable">{{ $t("blockinfo.height") }}</th>
            <th class="hometable">{{ $t("blockinfo.txns") }}</th>
            <th class="hometable hometableRight">{{ $t("blockinfo.size") }}</th>
            <th class="hometable hometableRight">{{ $t("blockinfo.time") }}</th>
          </template>
          <template v-slot:default="row">
            <td class="homeblockcontent">
              <div class="homeblockcontent-word">
                <router-link
                  class="name mb-0"
                  style="cursor: pointer"
                  :to="'/blockinfo/' + row.item.hash"
                  >{{ row.item.index }}</router-link
                >
              </div>
            </td>
            <td class="homeblockcontent">
              <div class="homeblockcontent-word">
                {{ row.item.transactioncount }} txns
              </div>
            </td>
            <td class="homeblockcontent">
              <div class="hometableRight">
                {{ row.item.size }} {{ $t("bytes") }}
              </div>
            </td>
            <td class="homeblockcontent hometableRight">
              <div
                class="timeago "
                :datetime="convertISOTime(row.item.timestamp).toString()"
              ></div>
            </td>
          </template>
        </base-table>
      </div>
    </div>
  </div>
</template>
<script>
import { convertTime, convertISOTime } from "../../store/util";
import net from "../../store/store";

export default {
  name: "blocks-table-homepage",
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
      blockList: [],
      totalCount: 0,
      resultsPerPage: 10,
      pagination: 1,
      isLoading: true,
      placeHolder: 0,
    };
  },
  created() {},

  mounted() {},

  methods: {
    convertTime,
    convertISOTime,
    toBlocksTable() {
      this.$router.push({
        path: `/blocks/1`,
      });
    },
  },
};
</script>
<style>
.homeblocktitle {
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  /* identical to box height, or 133% */
  /* grey900 */
  color: #1d2129;
}

.hometable {
  background-color: #ffffff !important;
  max-width: 10px;
  font-family: Inter !important;
  font-style: normal !important;
  font-weight: normal !important;
  font-size: 12px !important;
  line-height: 18px !important;
  text-transform: none !important;
  border-top: none !important;
  color: #86909c !important;
  padding-top: 1.5em !important;
  padding-bottom: 1.5em !important;
  padding-right: 0.5em !important;
  padding-left: 0.5em !important;
}
.hometableRight {
  text-align: right;
}
.homeblockcontent {
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
.homeblockcontent-word {
  text-align: left;
}
.homeblockcontentright {
  text-align: right;
}
</style>
