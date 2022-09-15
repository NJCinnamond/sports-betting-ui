import { Team } from "../$types/team";

export default class TeamStore {
    static myInstance: TeamStore | null = null;
    static getInstance(): TeamStore {
        if (TeamStore.myInstance == null) {
            TeamStore.myInstance = new TeamStore();
        }
        return this.myInstance as TeamStore;
    };

    teamsByID: { [key: string]: Team } = {};

    addTeamsFromOracle = (data: any[]) => {
        data.forEach((team: Team) => {
            this.teamsByID[team.team_id] = team;
        });
    };

    getTeams = (): Team[] => {
        let teams: Team[] = [];
        for (const [key, value] of Object.entries(this.teamsByID)) {
            teams.push(value);
        }
        return teams;
    };

    getTeamByID = (id: number | undefined) => id !== undefined ? this.teamsByID[id] : null;
}



