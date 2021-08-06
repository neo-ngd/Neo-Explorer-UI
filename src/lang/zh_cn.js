module.exports = {
    na: "不适用",
    blockReward: "区块奖励",
    transferReward: "转账奖励",
    mint: "铸币交易",
    burn: "销币交易",
    transfer: "转账",
    nullAddress: "空地址",
    hash: "哈希",
    wif: "地址",
    bytes: "字节",
    authLayout:{
        home:"主页",
        blocks:"区块",
        txs:"交易",
        tokens:"通证",
        contracts:"合约",
        address:"帐户",
        committee:"候选"
    },
    homePage:{
        totalBLocks:"区块总数",
        totalTxs:"交易总数",
        totalTokens:"通证总数",
        totalCntrts:"合约总数",
        totalAddrs:"帐户总数",
        totalCndidtes:"候选人",
        recentBlocks:"区块",
        recentTxs:"交易",
        seeAll:"更多",
        txTable:{
            txID:"交易哈希",
            size:"大小",
            time:"时间",
            gas:"Gas"
        },
    },
    blockinfo: {
        title:"区块列表",
        time: "创建时间",
        bytes:"字节",
        size: "区块大小",
        height: "区块高度",
        version: "版本号",
        hash: "区块哈希",
        preHash: "父区块哈希",
        txns: "交易数",
        transfers: "转账数",
        totalSysFee: "系统燃料费",
        totalNetFee: "网络燃料费",
        txnsList: "交易列表",
        nullPrompt: "该区块未包含交易。",
        txTable: {
            txID: "交易哈希",
            height: "区块高度",
            size: "区块大小",
            time: "出块时间",
            gas: "Gas"
        }
    },
    contract:{
        search:"通过合约名称搜索",
        hash:"合约哈希",
        name:"合约名",
        creator:"合约创建者",
        index:"合约序号",
        creatTime:"创建时间",
        available:"不适用",
        update:"更新次数",
        compiler:"编译器",
        txns:"交易数",
        scCall:"近期调用",
        event:{
            title:"近期事件",
            txID:"合约哈希",
            eventName:"事件名称",
            vmState:"虚拟机状态",
            index:"序号",
            time:"创建时间"
        },
        conInfo:"合约信息"
    },
    transactionList:{
        title: "交易列表",
        transactionId:"交易哈希",
        blockHeight:"区块高度",
        size:"大小",
        time:"时间",
        gasConsumed:"Gas",
        page:"页数"

    },
    transactionInfo:{
        txId:"交易哈希",
        time:"时间",
        blockHeight:"区块高度",
        size:"大小",
        version:"版本",
        blockHash:"区块哈希",
        sender:"发件人",
        netFee:"网络费",
        sysFee:"系统费",
        signers:"签名人",
        account:"账户",
        scopes:"范围",
        witness:"证人",
        invocation:"调用脚本",
        verification:"验证脚本",
        script:"运行脚本",
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
        events: "近期事件",
        methods: "合约方法",
        description: "描述信息",
        email: "邮箱",
        author: "合约作者"
    },
    tokenTx: {
        txid: "交易哈希",
        type: "交易类型",
        from: "转出账户",
        to: "转入账户",
        amount: "转账数额",
        time: "时间",
        tokenID: "通证ID",
        nullPrompt: "该通证暂无交易记录。"
    },
    tokenHolder: {
        ranking: "资产排名",
        address: "地址",
        balance: "余额",
        percentage: "资产占比",
        nullPrompt: "该通证暂无持有人。"
    },
    addressPage: {
        number: "序号",
        address: "地址",
        neoBalance: "Neo余额",
        gasBalance: "Gas余额",
        createdTime: "创建时间",
        hash: "哈希形式",
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
        }
    }


}
