export const NET_ENV = {
  Mainnet: "Mainnet",
  TestT5: "TestT5",
};

export const APP_URL = {
  [NET_ENV.Mainnet]: "explorer.onegate.space",
  [NET_ENV.TestT5]: "testmagnet.explorer.onegate.space",
};

export const inProduction = process.env.NODE_ENV === "production";

export const getCurrentEnv = () => {
  const hostname = inProduction
    ? location.hostname
    : APP_URL[process.env.VUE_APP_DEV_ENV];

  const env = {
    [APP_URL[NET_ENV.Mainnet]]: NET_ENV.Mainnet,
    [APP_URL[NET_ENV.TestT5]]: NET_ENV.TestT5,
  }[hostname];

  return env || NET_ENV.Mainnet;
};
