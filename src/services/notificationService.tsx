const getStakingTransactionName = (fixtureID: string) => "staking-" + fixtureID;

const getOpeningFixtureTransactionName = (fixtureID: string) => "opening-" + fixtureID;

const getAwaitingFixtureTransactionName = (fixtureID: string) => "awaiting-" + fixtureID;

const getFulfillingTransactionName = (fixtureID: string) => "fulfilling-" + fixtureID;

export { getStakingTransactionName, getOpeningFixtureTransactionName, getAwaitingFixtureTransactionName, getFulfillingTransactionName }