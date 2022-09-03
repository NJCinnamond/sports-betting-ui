import { Fixture } from '../types/Fixture';

// need a .env for this. design a YAML?
const apiURL = 'http://127.0.0.1:5000/';
const fixturePath = 'premier-league/fixtures';

async function fetchFixturesJSON() {
    let fixtureURL = apiURL + fixturePath;
    const response = await fetch(fixtureURL);
    return response.json();
}

export { fetchFixturesJSON };