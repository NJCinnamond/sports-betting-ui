import FixtureStore from '../stores/fixtureStore';
import TeamStore from '../stores/teamStore';
import { Fixture } from '../types/Fixture';

// need a .env for this. design a YAML?
const apiURL = 'http://127.0.0.1:5000/';
const fixturePath = 'premier-league/fixtures';
const teamsPath = 'premier-league/teams';

const fixtureStore: FixtureStore = FixtureStore.getInstance();
const teamStore: TeamStore = TeamStore.getInstance();

async function fetchFixtures() {
    let fixtureURL = apiURL + fixturePath;
    const response = await fetch(fixtureURL);
    const fixtures = await response.json();

    fixtureStore.addFixturesFromOracle(fixtures);
};

async function fetchTeams() {
    let teamURL = apiURL + teamsPath;
    const response = await fetch(teamURL);
    const teams = await response.json();

    teamStore.addTeamsFromOracle(teams);
}

export { fetchFixtures, fetchTeams }