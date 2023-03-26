import FixtureService from './fixtureService';
import TeamService from './teamService';

// need a .env for this. design a YAML?
const apiURL = 'https://1vyuff64d9.execute-api.us-east-1.amazonaws.com/dev/';
const fixturePath = 'premier-league/fixtures/';
const teamsPath = 'premier-league/teams/';

const fixturesPathForGameweek = (gameweek: number) => apiURL + fixturePath + "gameweek/" + gameweek.toString();

const fixtureService: FixtureService = new FixtureService();
const teamService: TeamService = new TeamService();

async function fetchFixturesForGameweek(gameweek: number) {
    let fixtureURL = fixturesPathForGameweek(gameweek);
    const response = await fetch(fixtureURL);
    const fixtures = await response.json();
    fixtureService.addFixturesFromOracle(fixtures);
};

async function fetchFixtures() {
    let fixtureURL = apiURL + fixturePath;
    const response = await fetch(fixtureURL);
    const fixtures = await response.json();

    fixtureService.addFixturesFromOracle(fixtures);
};

async function fetchTeams() {
    let teamURL = apiURL + teamsPath;
    const response = await fetch(teamURL);
    const teams = await response.json();

    teamService.addTeamsFromOracle(teams);
}

export { fetchFixtures, fetchTeams, fetchFixturesForGameweek }