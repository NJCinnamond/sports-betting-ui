import { BetType } from "../$types/betType";
import { Team } from "../$types/team";
import { teamsActions } from "../redux/reducers/teams";
import { store } from "../redux/store";

export default class TeamService {
    addTeamsFromOracle = (data: any[]) => {
        data.forEach((team: Team) => {
            store.dispatch(teamsActions.new(team));
        });
    };

    getTeamByID = (teams: Team[], id: string) => teams.filter((team) => team.team_id == id);

    // Bet helper string used to annotate stake entry form or stake data
    formatBetHelperString = (homeTeam: Team, awayTeam: Team, betType: BetType) => {
        switch (betType) {
            case BetType.HOME:
                return homeTeam.short_name + " WIN";
            case BetType.DRAW:
                return "DRAW";
            case BetType.AWAY:
                return awayTeam.short_name + " WIN";
        };
        return "";
    }
}



