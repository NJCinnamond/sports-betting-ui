// When a new fixture is added, middleware calls contract functions directly to enrich store with on-chain user info
const fixturesMiddleware = (store: any) => (next: any) => (action: any) => {
    if (action.type === 'fixtures/new') {
        console.log("Middleware triggered:", action);
        // TODO: call ctx funcs to get user chain info
    }
    next(action);
}

export {
    fixturesMiddleware
};