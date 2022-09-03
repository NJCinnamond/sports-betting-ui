import FixtureStore from '../stores/fixtureStore';
import { Fixture } from '../types/Fixture';

// need a .env for this. design a YAML?
const apiURL = 'http://127.0.0.1:5000/';
const fixturePath = 'premier-league/fixtures';


const fixtureStore: FixtureStore = FixtureStore.getInstance();

async function fetchFixtures() {
    let fixtureURL = apiURL + fixturePath;
    const response = await fetch(fixtureURL);
    const fixtures = await response.json();

    fixtureStore.addFixturesFromOracle(fixtures);
};

export { fetchFixtures }