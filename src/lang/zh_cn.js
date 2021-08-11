module.exports = {
  home: "欢迎使用NeoExplorer",
  na: "不适用",
  blockReward: "区块奖励",
  networkFeeReward: "网络费奖励",
  feeBurn: "手续费燃烧",
  transferReward: "转账奖励",
  mint: "铸币交易",
  burn: "销币交易",
  transfer: "转账",
  nullAddress: "空地址",
  nullBalance: "不适用",
  hash: "哈希",
  wif: "地址",
  page: "页",
  bytes: "字节",
  authLayout: {
    home: "主页",
    blocks: "区块",
    txs: "交易",
    tokens: "通证",
    contracts: "合约",
    address: "地址",
    committee: "候选人",
  },
  homePage: {
    totalBLocks: "区块总数",
    totalTxs: "交易总数",
    totalTokens: "通证总数",
    totalCntrts: "合约总数",
    totalAddrs: "地址总数",
    totalCndidtes: "候选人",
    recentBlocks: "区块",
    recentTxs: "交易",
    seeAll: "更多",
    txTable: {
      txID: "交易哈希",
      size: "大小",
      time: "时间",
      gas: "Gas",
    },
  },
  blockinfo: {
    title: "区块列表",
    time: "创建时间",
    bytes: "字节",
    size: "区块大小",
    height: "区块高度",
    version: "版本号",
    hash: "区块哈希",
    preHash: "父区块哈希",
    txns: "交易数",
    transfers: "总转账数",
    totalSysFee: "系统燃料费",
    totalNetFee: "网络燃料费",
    txnsList: "交易列表",
    trfsList: "区块转账列表",
    nullPrompt: "该区块未包含交易。",
    speaker: "议长节点",
    blockReward: "出块奖励",
    txTable: {
      txID: "交易哈希",
      height: "区块高度",
      size: "区块大小",
      time: "出块时间",
      gas: "Gas",
    },
  },
  contract: {
    title: "合约列表",
    search: "通过合约名称搜索",
    hash: "合约哈希",
    name: "合约名",
    creator: "合约创建者",
    index: "合约序号",
    creatTime: "创建时间",
    time: "创建时间",
    available: "不适用",
    update: "更新次数",
    compiler: "编译器",
    txns: "交易数",
    scCallTitle: "近期调用",
    txID: "交易哈希",
    sender: "创建地址",
    method: "方法",
    callFlags: "调用标志",
    eventTitle: "近期事件",
    eventName: "事件名称",
    vmState: "虚拟机状态",
    conInfo: "合约信息",
    noScCall: "该合约暂无调用",
    noEvent: "该合约暂无事件",
  },
  transactionList: {
    title: "交易列表",
    transactionId: "交易哈希",
    blockHeight: "区块高度",
    size: "大小",
    time: "时间",
    gasConsumed: "Gas",
    page: "页数",
  },
  transactionInfo: {
    txId: "交易哈希",
    time: "时间",
    blockHeight: "区块高度",
    size: "大小",
    version: "版本",
    blockHash: "区块哈希",
    sender: "发件人",
    netFee: "网络费",
    sysFee: "系统费",
    signers: "签名人",
    account: "账户",
    scopes: "范围",
    witness: "证人",
    invocation: "调用脚本",
    verification: "验证脚本",
    script: "运行脚本",
    vmState:"虚拟机执行结果",
    exception:"异常",
    trigger:"执行",
    eventName:"事件名称",
    contract:"合约",
    State:"结果",
    remind:" 这个交易中不包含事件",
    nep11: "Nep11转账",
    nep17: "Nep17转账",
  },
  transactionTransfer: {
    contract: "合约",
    token: "通证",
    type: "交易类型",
    from: "转出账户",
    fromBalance: "转出账户余额",
    to: "转入账户",
    toBalance: "转入账户余额",
    amount: "金额",
    tokenID: "通证ID",
  },
  transferList: {
    title: "Nep17 交易",
    contract: "合约",
    token: "通证",
    type: "交易类型",
    from: "转出账户",
    fromBalance: "转出账户通证数量",
    to: "转入账户",
    toBalance: "转入账户通证数量",
    amount: "转账数额",
    reward: "转账奖励",
    burn: "销币交易",
    transfer: "转账",
    nullAccount: "不适用",
    nullBalance: "不适用",
  },
  tokensTable: {
    title: "通证列表",
    hash: "哈希",
    name: "名称",
    symbol: "符号",
    standard: "合约标准",
    holders: "持有人总数",
    prompt: "以通证名称搜索",
  },
  tokenInfo: {
    symbol: "通证符号",
    decimal: "小数位数",
    standard: "合约标准",
    transferred: "首次交易时间",
    supply: "总供给",
    holders: "持有人总数",
    recentTransfers: "近期转账",
    topHolders: "持有人地址",
    contractInfo: "合约信息",
    extra: "额外信息",
    events: "定义事件",
    methods: "合约方法",
    description: "描述信息",
    email: "邮箱",
    author: "合约作者",
  },
  tokenTx: {
    txid: "交易哈希",
    type: "交易类型",
    from: "转出地址",
    to: "转入地址",
    amount: "转账数额",
    time: "时间",
    tokenID: "通证ID",
    nullPrompt: "该通证暂无交易记录。",
  },
  tokenHolder: {
    ranking: "资产排名",
    address: "地址",
    balance: "余额",
    percentage: "资产占比",
    nullPrompt: "该通证暂无持有人。",
  },
  addressPage: {
    number: "序号",
    address: "地址",
    neoBalance: "Neo余额",
    gasBalance: "Gas余额",
    createdTime: "创建时间",
    accountsTable: "地址",
    hash: "哈希",
    txnullPrompt: "该账户不包含交易。",
    nep17nullPrompt: "该账户不包含NEP17转账。",
    nep11nullPrompt: "该账户不包含NEP11转账。",
    typeEnum: {
      normal: "普通账户",
      committee: "委员会",
      candidate: "候选人",
    },
    addressProfile: {
      title: "账户：",
      type: "类型",
      txNums: "交易数",
      nep17Transfers: "NEP17转账数",
      nep11Transfers: "NEP11转账数",
      tokenBalance: "通证余额",
      tx: "交易记录",
      nep17title: "NEP17转账记录",
      nep11title: "NEP11转账记录",
    },
  },
  candidate: {
    title: "候选人列表",
    address: "地址",
    rank: "排名    ",
    votes: "投票",
    percentage: "占比",
  },
  NftTable: {
    title: "NEP11 交易",
    contract: "合约",
    token: "通证",
    tokenId: "通证ID",
    type: "交易类型",
    from: "转出账户",
    fromBalance: "转出账户通证数量",
    to: "转入账户",
    toBalance: "转入账户通证数量",
    amount: "转账数额",
    mint: "铸币交易",
    burn: "销币交易",
    transfer: "转账",
    nullAccount: "空地址",
    nullBalance: "不适用",
  },
  search: {
    placeholder: "搜索区块，交易，账户，通证或者合约",
    information: "抱歉，您要查询的数据不在区块链上，请您核对查询信息.",
    dataSupport: "我们支持的数据格式如下:",
    block: "区块哈希 (UInt256), 区块高度 (Int)",
    transaction: "交易ID (UInt256)",
    account: "账户脚本哈希 (UInt160), 账户地址 (WIF)",
    token: "通证/合约脚本哈希 (UInt160)",
    button: "返回首页",
  },
  pageNotFound: {
    information_s: "抱歉!",
    information_t: "您访问的界面不存在",
    information_v: "请过几分钟后再试，或者检查输入路径",
  },
};
