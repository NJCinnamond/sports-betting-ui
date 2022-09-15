import { Team } from "../$types/team";
import { teamsActions } from "../redux/reducers/teams";
import { store } from "../redux/store";

export default class TeamService {
    addTeamsFromOracle = (data: any[]) => {
        data.forEach((team: Team) => {
            store.dispatch(teamsActions.new(team));
        });
    };
}



