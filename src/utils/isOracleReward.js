import { getCurrentEnv, NET_ENV } from "./env";

const validateAddressConfig = {
  [NET_ENV.Mainnet]: [
    "0x196b66dd7f8f46a86aa8ef1e845fa10dcecfcbcc",
    "0xcb4426a0592481b6133a0a95ff49846e9b9bb431",
    "0x653d7796269ebfa14b632f9a7f09560868d9f646",
    "0x4362251333904b780d5301477f911cea22e477b5",
  ],
  [NET_ENV.Testmagnet]: [
    "0x196b66dd7f8f46a86aa8ef1e845fa10dcecfcbcc",
    "0xcb4426a0592481b6133a0a95ff49846e9b9bb431",
    "0x4362251333904b780d5301477f911cea22e477b5",
    "0x3a82e6e0a196e5dd6138820aa87c8be5495d7f88",
  ],
};

const isOracleReward = (item) => {
  const currentEnv = getCurrentEnv();
  const validateList = validateAddressConfig[currentEnv];
  if (!validateList) {
    return false;
  } else {
    return (
      item.txid ===
        "0x0000000000000000000000000000000000000000000000000000000000000000" &&
      item.from === null &&
      item.value === "10000000" &&
      validateList.includes(item.to)
    );
  }
};

export default isOracleReward;
