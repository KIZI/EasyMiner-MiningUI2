const minerId = import.meta.env.PROD ? window.minerId : import.meta.env.VITE_MINER_ID as number

export const appConfig = {
  minerId,
  truncateLength: {
    miner: 80,
    attribute: 30,
    ruleSet: 50,
  },
}
