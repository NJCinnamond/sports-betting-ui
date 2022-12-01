import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useMediaQuery } from 'react-responsive';
import { Fixture } from "../../$types/fixture";
import { BetTypeSelectorComponent } from "../betTypeSelectorComponent/betTypeSelectorComponent";
import { useEffect, useState } from "react";
import { Team } from "../../$types/team";
import { OpenStakeComponent } from "../openStakeComponent/openStakeComponent";
import TeamService from "../../services/teamService";
import { useSelectedBetType } from "../../hooks/view";
import { FixtureEnrichment } from "../../$types/fixtureEnrichment";
import { OpenBetInsightComponent } from "../openBetInsightComponent.tsx/openBetInsightComponent";

const PREFIX = 'UserStakePanelComponent';

const classes = {
    rowContainer: `${PREFIX}-rowContainer`,
    columnContainer: `${PREFIX}-columnContainer`,
    columnItem: `${PREFIX}-columnItem`,
    selector: `${PREFIX}-selector`,
    stakeForm: `${PREFIX}-stakeForm`,
    betSlip: `${PREFIX}-betSlip`
};

const StyledBox = styled(Box)((
    {
        theme: any
    }
) => ({
    [`&.${classes.rowContainer}`]: {
        display: "flex",
        marginTop: "1em",
    },

    [`&.${classes.columnContainer}`]: {
        display: "flex",
        flexDirection: "column",
        marginTop: "1em",
    },

    [`& .${classes.columnItem}`]: {
        width: "100%",
        margin: "1.2em auto",
        justifyContent: "center",
        textAlign: 'center',
    },

    [`& .${classes.selector}`]: {
        flexBasis: "30%",
        justifyContent: 'space-between'
    },

    [`& .${classes.stakeForm}`]: {
        flexBasis: "40%",
        margin: "0 auto",
        justifyContent: 'space-between'
    },

    [`& .${classes.betSlip}`]: {
        flexBasis: "30%",
        margin: "0 auto",
        justifyContent: 'space-between'
    }
}));

export interface UserStakePanelComponentProps {
    fixture: Fixture,
    homeTeam: Team,
    awayTeam: Team,
    enrichment: FixtureEnrichment
}

export const UserStakePanelComponent = (props: UserStakePanelComponentProps) => {


    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 650px)' });

    const teamService = new TeamService();

    const { selectedBetType } = useSelectedBetType(props.fixture?.fixture_id);

    // Human readable string for selected bet type
    const [selectedBetTypeStr, setSelectedBetTypeStr] = useState<string>('');
    useEffect(() => {
        const betTypeStr = teamService.formatBetHelperString(props.homeTeam, props.awayTeam, selectedBetType);
        setSelectedBetTypeStr(betTypeStr);
    }, [selectedBetType, props.homeTeam, props.awayTeam]);

    return (
        <StyledBox className={isTabletOrMobile ? classes.columnContainer : classes.rowContainer}>
            <div className={isTabletOrMobile ? classes.columnItem :  classes.selector}>
                <BetTypeSelectorComponent fixtureID={props.fixture?.fixture_id} homeTeam={props.homeTeam} awayTeam={props.awayTeam} />
            </div>
            <div className={isTabletOrMobile ? classes.columnItem :  classes.stakeForm}>
                <OpenStakeComponent selectedBetTypeStr={selectedBetTypeStr} fixture={props.fixture} selectedBetType={selectedBetType} />
            </div>
            <div className={isTabletOrMobile ? classes.columnItem :  classes.betSlip}>
                <OpenBetInsightComponent fixtureID={props.fixture?.fixture_id} />
            </div>
        </StyledBox>
    );
}