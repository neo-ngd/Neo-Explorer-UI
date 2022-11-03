export const NET_ENV = {
  Mainnet: "Mainnet",
  Testnet: "Testnet",
  Testmagnet: "Testmagnet",
};

export const APP_URL = {
  [NET_ENV.Mainnet]: "explorer.onegate.space",
  [NET_ENV.Testnet]: "testnet.explorer.onegate.space",
  [NET_ENV.Testmagnet]: "testmagnet.explorer.onegate.space",
};

export const inProduction = process.env.NODE_ENV === "production";

export const getCurrentEnv = () => {
  const hostname = inProduction
    ? location.hostname
    : APP_URL[process.env.VUE_APP_DEV_ENV];

  const env = {
    [APP_URL[NET_ENV.Mainnet]]: NET_ENV.Mainnet,
    [APP_URL[NET_ENV.Testnet]]: NET_ENV.Testnet,
    [APP_URL[NET_ENV.Testmagnet]]: NET_ENV.Testmagnet,
  }[hostname];

  return env || NET_ENV.Mainnet;
};
